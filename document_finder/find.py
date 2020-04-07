from multiprocessing import cpu_count, Pool
import json
from pathlib import Path
from collections import OrderedDict
from functools import reduce
import random
from csv import DictWriter

import numpy as np
from bs4 import BeautifulSoup
from pandas import DataFrame
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer

# from sklearn.pipeline import Pipeline
from imblearn.pipeline import Pipeline

# from sklearn.svm import SVC
from thundersvm import SVC

from imblearn.combine import SMOTEENN
from sklearn.model_selection import StratifiedShuffleSplit
from sklearn.metrics import classification_report, balanced_accuracy_score


PROCESSES = cpu_count()
CLASS_NAMES = ["not sensitive", "sensitive"]
SEED = 1968

BASE_DIR = "/home/architect/git_repositories/dissertation/data"

TRAIN_DATA_DIR = BASE_DIR + "/collection/cab_html_noboiler/"

TRAIN_LABELS = BASE_DIR + "/full.collection.cables.path.gold"

ANNOTATIONS_PATH = Path(
    "/home/architect/git_repositories/dissertation/data", "annotations.json"
)


def intersect(*arrays):
    return reduce(np.intersect1d, arrays)


def extract_annotations():
    path_annotations = OrderedDict()
    train_data_dir = Path(TRAIN_DATA_DIR)
    with open(ANNOTATIONS_PATH, "r") as annotations_file:
        for line in annotations_file:
            relative_path, annotations = line.split(":", 1)
            relative_path += ".html"
            full_path = train_data_dir.joinpath(*Path(relative_path).parts[-3:])
            annotations = json.loads(annotations)
            path_annotations[str(full_path)] = annotations
    return path_annotations


def extract_paths_and_labels():
    file_paths = []
    labels = []
    print("extracting file paths from {}".format(TRAIN_LABELS))
    with open(TRAIN_LABELS) as ground_truth_file:
        for line in ground_truth_file.read().splitlines():
            path, classification = line.split(" ")
            # build full file path (path prefix and file extension)
            file_paths.append(TRAIN_DATA_DIR + path + ".html")
            labels.append(int(classification))
    return np.array(file_paths), np.array(labels)


def read_file(file_path):
    with open(file_path) as file:
        raw_html = file.read()

        bs = BeautifulSoup(raw_html, "lxml")
        # get the contents of the last <pre> tags
        pre = bs.find_all("pre")[-1]

        text = pre.get_text()
    return text


def extract_data(file_paths):
    texts = []
    print(
        "extracting data from {n_files} files with {n_processes} processes".format(
            n_files=len(file_paths), n_processes=PROCESSES
        )
    )
    pool = Pool(processes=PROCESSES)
    texts = pool.map(func=read_file, iterable=file_paths)
    pool.close()
    pool.join()
    return np.array(texts)


if __name__ == "__main__":
    file_paths, train_labels = extract_paths_and_labels()
    train_data = extract_data(file_paths)

    # verify order of text and labels
    with open(TRAIN_LABELS) as ground_truth_file:
        for i, line in enumerate(ground_truth_file.read().splitlines()):
            path, classification = line.split(" ")
            assert path in file_paths[i]
            assert int(classification) == train_labels[i]
            assert read_file(file_paths[i]) == train_data[i]

    annotations = extract_annotations()

    train_data_df = DataFrame([train_data, train_labels]).transpose()

    train_data_df.columns = ["content", "sensitive"]

    train_data_df["S40"] = False

    train_data_df["S27"] = False

    for path, annotation in annotations.items():
        tags = annotation.get("tags")
        if tags:
            index = np.searchsorted(file_paths, path)
            S40 = False
            S27 = False
            for tag in tags:
                if "S40" in tag:
                    train_data_df.at[index, "S40"] = True
                if "S27" in tag:
                    train_data_df.at[index, "S27"] = True

    SEED = 0

    true_negatives = []
    false_negatives = []
    false_positives = []
    true_positives = []

    while True:
        SEED += 1

        np.random.seed(SEED)

        random.seed(SEED)

        # vect = CountVectorizer(binary=True, max_df=0.5, min_df=2, ngram_range=(1,1), stop_words="english")
        vect = TfidfVectorizer(
            norm="l2",
            analyzer="word",
            stop_words="english",
            strip_accents="unicode",
            binary=False,
            max_df=0.75,
            min_df=1,
            lowercase=True,
            use_idf=False,
            smooth_idf=True,
            sublinear_tf=True,
        )

        sampler = SMOTEENN(random_state=SEED)
        clf = SVC(
            kernel="linear",
            C=0.1,
            probability=True,
            decision_function_shape="ovo",
            random_state=SEED,
        )

        # Create the Pipeline
        pipeline = Pipeline(
            steps=[("vect", vect), ("sample", sampler), ("clf", clf),], verbose=10,
        )

        # Split and Train
        splitter = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=SEED)

        full_set_S27 = np.where(np.array(train_data_df["S27"]) == True)
        full_set_S40 = np.where(np.array(train_data_df["S40"]) == True)

        train_data = train_data_df["content"]
        train_labels = train_data_df["S40"]

        for train_index, test_index in splitter.split(train_data, train_labels):
            X_train = train_data[train_index]
            X_test = train_data[test_index]
            y_train = train_labels[train_index]
            y_test = train_labels[test_index]

        pipeline.fit(X_train, y_train)

        # Predict
        predictions = pipeline.predict(X_test)

        print(classification_report(y_test, predictions))

        bac = balanced_accuracy_score(y_test, predictions)

        print("Balanced accuracy", bac)

        # filters
        length = np.vectorize(len)
        document_lengths = length(X_test)

        correct = np.where(y_test == predictions)
        misclassified = np.where(y_test != predictions)

        S27 = np.where(np.array(train_data_df["S27"])[test_index] == True)
        S40 = np.where(np.array(train_data_df["S40"])[test_index] == True)

        train_S27 = np.where(np.array(train_data_df["S27"])[train_index] == True)
        train_S40 = np.where(np.array(train_data_df["S40"])[train_index] == True)

        actually_sensitive = np.where(y_test == 1)
        actually_insensitive = np.where(y_test == 0)

        classified_sensitive = np.where(predictions == 1)
        classified_insensitive = np.where(predictions == 0)
        small = np.where(document_lengths < 2000)

        print("Test set small S40 count:", len(intersect(S40, small)))
        print("Train set small S40 count:", len(intersect(train_S40, small)))

        true_negatives = intersect(classified_insensitive, actually_insensitive, small)
        false_negatives = intersect(classified_insensitive, actually_sensitive, small)
        false_positives = intersect(classified_sensitive, actually_insensitive, small)
        true_positives = intersect(classified_sensitive, actually_sensitive, small)

        results = """
        {seed}\t\tSensitive\t\tNot Sensitive
        Sensitive\t\t{true_positives}\t\t{false_positives}
        Not Sensitive\t\t{false_negatives}\t\t{true_negatives}
        """.format(
            true_positives=len(true_positives),
            false_negatives=len(false_negatives),
            false_positives=len(false_positives),
            true_negatives=len(true_negatives),
            seed=SEED,
        )

        results_dict = {
            "seed": SEED,
            "true_negatives": len(true_negatives),
            "false_negatives": len(false_negatives),
            "false_positives": len(false_positives),
            "true_positives": len(true_positives),
            "balanced_accuracy": bac,
        }

        print(results)
        if not (
            len(true_negatives) < 1
            or len(false_negatives) < 1
            or len(false_positives) < 1
            or len(true_positives) < 3
        ):
            with open("results.csv", "a+") as results_file:
                DictWriter(results_file, list(results_dict.keys())).writerow(
                    results_dict
                )

    # for index in false_positives:
    #     print("###############################################")
    #     print(X_test.iloc[index])

    # for index in false_negatives:
    #     print("###############################################")
    #     print(X_test.iloc[index])

