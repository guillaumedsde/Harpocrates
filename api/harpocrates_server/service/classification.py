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

# from sklearn.svm import SVC, LinearSVC
from thundersvm import SVC
from sklearn.tree import DecisionTreeClassifier
# from xgboost import XGBClassifier

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

# create a dummy current_app for logging outside of flask context
try:

    from flask import current_app
    current_app.logger.info()
except RuntimeError:
    from harpocrates_server.models.dummy_flask_app import DummyFlaskApp
    logger = logging.getLogger(__name__)
    handler = logging.StreamHandler()
    handler.setLevel(logging.DEBUG)
    logger.addHandler(handler)
    current_app = DummyFlaskApp(logger)


# instantiate classifier objects
CLASSIFIERS = [
    # MultinomialNB(),
    # DecisionTreeClassifier(),
    # KNeighborsClassifier(3),
    # DecisionTreeClassifier(),
    # SVC(probability=True, kernel="linear", cache_size=1000),
    # XGBClassifier(n_jobs=PROCESSES, objective="binary:logistic"),
    SVC(
        kernel="linear",
        C=0.01,
        probability=True,
        decision_function_shape="ovo"
    )
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
        max_df=0.9,
        min_df=1,
        lowercase=True,
        use_idf=True,
        smooth_idf=False,
        sublinear_tf=True,
    )


def train(classifier, train_data=None, train_labels=None, skip_training=False ):
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
        if (train_data is None) and (train_labels is None):
            train_labels = extract_labels()
            file_paths = extract_file_paths()
            train_data = extract_data(file_paths)

        # train classifier
        pipeline.fit(train_data, train_labels)

    # Train
    return pipeline


def train_and_store_classifier(classifier, path, train_data=None, train_labels=None):
    classifier_type = type(classifier).__name__
    current_app.logger.info("training model for %s", classifier_type)
    trained_classifier = train(classifier, train_data, train_labels)

    path.mkdir(parents=True, exist_ok=True)

    current_app.logger.info("storing trained classifier in %s", path)
    trained_classifier.named_steps.clf.save_to_file(str(path.joinpath("clf")))

    current_app.logger.info("storing fitted vectorizer in %s", path)
    dump(trained_classifier.named_steps.vect, str(path.joinpath("vect")))
    
    return trained_classifier


def get_model(classifier=None, train_data=None, train_labels=None):
    global MODEL
    # if no classifier passed, used first one
    if not classifier:
        classifier = CLASSIFIERS[0]

    classifier_type = type(classifier).__name__
    model_path = MODELS_DIRECTORY.joinpath(classifier_type)
    try:
        global_model_name = type(MODEL[-1]).__name__
    except NameError:
        global_model_name = None

    if train_data is not None and train_labels is not None :
        MODELS_DIRECTORY.mkdir(parents=True, exist_ok=True)
        trained_classifier = train_and_store_classifier(classifier, model_path, train_data, train_labels)
        MODEL = trained_classifier
    elif global_model_name == classifier_type:
        trained_classifier = MODEL
    else:
        current_app.logger.info("loading found model for %s from %s", classifier_type, model_path)
        # trained_classifier = load(model_path)


        clf = SVC()
        clf.load_from_file(str(model_path.joinpath("clf")))
        
        vect = load(str(model_path.joinpath("vect")))

        trained_classifier = Pipeline(
            steps=[("vect", vect), ("clf", clf),], verbose=True,
        )
        MODEL = trained_classifier
    return trained_classifier, classifier_type
