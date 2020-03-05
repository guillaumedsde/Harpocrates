import logging
import json
from pathlib import Path
from collections import OrderedDict
from functools import reduce
import re
from math import floor
from multiprocessing import Pool, cpu_count
from random import shuffle, seed

from joblib import dump
from progress.bar import Bar
import numpy as np
from pandas import DataFrame
from sklearn.model_selection import train_test_split
from sklearn.model_selection import StratifiedShuffleSplit
from joblib import dump
from imblearn.pipeline import Pipeline
from imblearn.combine import SMOTEENN
from thundersvm import SVC
from sklearn.feature_extraction.text import TfidfVectorizer


from harpocrates_server.db import create_db_client

from harpocrates_server.service import TRAIN_DATA_DIR, MODELS_DIRECTORY, TRAIN_LABELS

from harpocrates_server.service.data_parsing import (
    extract_data,
    extract_paths_and_labels,
    read_file,
)
from harpocrates_server.service.classification import (
    get_model,
    CLASSIFIERS,
    get_vectorizer,
    train_and_store_classifier,
)

from harpocrates_server.service.document import text_contents_from_document_body
from harpocrates_server.controllers.document_controller import (
    calculate_text_content_classifications,
    classify,
    classify_text,
    get_document,
)

from harpocrates_server.models.document import Document
from bson.objectid import ObjectId

MODEL_DIRECTORY = Path("instance", "models")

ANNOTATIONS_PATH = Path(
    "/home/architect/git_repositories/dissertation/data", "annotations.json"
)

# Necessary for reproducing experimental setup
SEED = 32


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


def process_document(document, collection, trained_model):

    db = create_db_client()
    classify.__globals__["db"] = db

    text_contents = text_contents_from_document_body(
        document["content"], granularity="document"
    )

    document_object = Document(
        text_contents=text_contents, text_split_granularity="document"
    )
    operation_result = db[collection].insert_one(document_object.to_dict())
    doc_id = operation_result.inserted_id

    classification = classify_text(document["content"], trained_model=trained_model)

    classified_text_contents = calculate_text_content_classifications(
        document_object,
        explanations=classification.explanations,
        trained_model=trained_model,
    )

    doc_id = db[collection].update_one(
        {"_id": ObjectId(doc_id)},
        {
            "$set": {
                # Update document wide predicted classification
                "predictedClassification": classification.to_dict(),
                # Update paragrah classifications
                "textContents": [
                    text_content.to_dict() for text_content in classified_text_contents
                ],
            }
        },
    )


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

    # SEED=31
    # SEED = 60
    # SEED = 402
    # SEED =120

    # SEED = 144

    # SEEDS = [144]

    SEEDS = [19, 29]

    for i, SEED in enumerate(SEEDS):
        np.random.seed(SEED)

        seed(SEED)

        true_negatives = []
        false_negatives = []
        false_positives = []
        true_positives = []

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
            kernel="linear", C=0.1, probability=True, decision_function_shape="ovo"
        )

        # Create the Pipeline
        pipeline = Pipeline(
            steps=[("vect", vect), ("sample", sampler), ("clf", clf),], verbose=10,
        )

        # Split and Train
        splitter = StratifiedShuffleSplit(n_splits=1, test_size=0.1, random_state=SEED)

        for train_index, test_index in splitter.split(train_data, train_labels):
            X_train = train_data[train_index]
            X_test = train_data[test_index]
            y_train = train_labels[train_index]
            y_test = train_labels[test_index]
            test_data_df = train_data_df.iloc[test_index]

        pipeline.fit(X_train, y_train)

        # Predict
        predictions = pipeline.predict(X_test)

        # filters
        length = np.vectorize(len)
        document_lengths = length(X_test)

        correct = np.where(y_test == predictions)
        misclassified = np.where(y_test != predictions)

        S27 = np.where(np.array(test_data_df["S27"]) == True)
        S40 = np.where(np.array(test_data_df["S40"]) == True)

        train_S27 = np.where(np.array(train_data_df["S27"])[train_index] == True)
        train_S40 = np.where(np.array(train_data_df["S40"])[train_index] == True)

        actually_sensitive = np.where(y_test == 1)
        actually_insensitive = np.where(y_test == 0)

        classified_sensitive = np.where(predictions == 1)
        classified_insensitive = np.where(predictions == 0)
        small = np.where(document_lengths < 2000)

        print("Test set S27 count:", len(X_test[S27]))
        print("Train set S27 count:", len(X_train[train_S27]))

        true_negatives = intersect(
            classified_insensitive, actually_insensitive, S27, small
        )
        false_negatives = intersect(
            classified_insensitive, actually_sensitive, S27, small
        )
        false_positives = intersect(
            classified_sensitive, actually_insensitive, S27, small
        )
        true_positives = intersect(classified_sensitive, actually_sensitive, S27, small)

        all_true_negatives = intersect(
            classified_insensitive, actually_insensitive, small
        )

        smallest_true_negative = X_test[np.argmin(length(X_test[all_true_negatives]))]

        smallest_true_negative_index = np.where(X_test == smallest_true_negative)[0][0]

        print(
            """
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
        )

        # TODO add a small false negatives
        batch1_indices = (
            [false_negatives[0], false_positives[0]]
            + [true_positives[n] for n in range(3)]
            + [smallest_true_negative_index]
        )

        print(batch1_indices)

        shuffle(batch1_indices)

        batch_evaluation_setup_df = test_data_df.iloc[batch1_indices, :]

        bar = Bar("Processing test documents", max=batch_evaluation_setup_df.shape[0])

        # create, classify and store documents
        for document_index, document in batch_evaluation_setup_df.iterrows():
            bar.next()
            process_document(document, "collection_{}".format(i), pipeline)
