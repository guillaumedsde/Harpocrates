import logging
import os
from multiprocessing import Pool

import numpy as np
from joblib import dump, load

from sklearn.metrics import classification_report


# Import classifiers
from sklearn.ensemble import RandomForestClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import KFold
from sklearn.naive_bayes import MultinomialNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import Pipeline
from sklearn.svm import SVC, LinearSVC
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier

from harpocrates_server.service import (
    PROCESSES,
    CLASS_NAMES,
    SEED,
    MODELS_DIRECTORY,
    TRAIN_LABELS,
)
from harpocrates_server.service.data_parsing import (
    extract_data,
    extract_labels,
    extract_file_paths,
)


# instantiate classifier objects
CLASSIFIERS = [
    # MultinomialNB(),
    # DecisionTreeClassifier(),
    # KNeighborsClassifier(3),
    # DecisionTreeClassifier(),
    # SVC(probability=True, kernel="linear", cache_size=1000),
    # XGBClassifier(n_jobs=PROCESSES, objective="binary:logistic"),
    SVC(kernel="linear", probability=True, decision_function_shape="ovo", cache_size=1000)
]


VECTORIZER = None


def get_vectorizer():
    global VECTORIZER
    if not VECTORIZER:
        VECTORIZER = build_vectorizer()
    return VECTORIZER


def build_vectorizer():
    return TfidfVectorizer(
        norm="l1",
        analyzer="word",
        stop_words="english",
        strip_accents="unicode",
        lowercase=True,
        use_idf=True,
        smooth_idf=True,
        sublinear_tf=True,
    )


def train(classifier, skip_training=False):
    # build ML pipeline
    pipeline = Pipeline(
        steps=[
            ("vect", get_vectorizer()),
            # HashingVectorizer(
            #     norm='l2',
            #     stop_words="english",
            #     strip_accents="unicode",
            #     lowercase=True,
            # ),
            ("clf", classifier),
        ],
        verbose=True,
    )

    if not skip_training:
        train_labels = extract_labels()
        file_paths = extract_file_paths()
        train_data = extract_data(file_paths)

        # train classifier
        pipeline.fit(train_data, train_labels)

    # Train
    return pipeline


def train_and_store_classifier(classifier, path):
    classifier_type = type(classifier).__name__
    print("training model for %s, and storing it at %s" % (classifier_type, path))
    trained_classifier = train(classifier)
    dump(trained_classifier, path)
    return trained_classifier


def get_model(classifier=None, retrain=False):
    global MODEL
    # if no classifier passed, used first one
    if not classifier:
        classifier = CLASSIFIERS[0]

    classifier_type = type(classifier).__name__
    model_path = MODELS_DIRECTORY.joinpath(classifier_type + ".joblib")
    try:
        global_model_name = type(MODEL[-1]).__name__
    except NameError:
        global_model_name = None

    if retrain or not os.path.exists(model_path):
        if not os.path.exists(MODELS_DIRECTORY):
            os.makedirs(MODELS_DIRECTORY)
        trained_classifier = train_and_store_classifier(classifier, model_path)
        MODEL = trained_classifier
    elif global_model_name == classifier_type:
        trained_classifier = MODEL
    else:
        print("loading found model for %s from %s" % (classifier_type, model_path))
        trained_classifier = load(model_path)
        MODEL = trained_classifier
    return trained_classifier, classifier_type
