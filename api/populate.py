import logging
import pathlib
import re

import copy
import types
import functools
from bson import ObjectId
from multiprocessing import Pool, cpu_count

from sklearn.model_selection import train_test_split
from joblib import dump
from sklearn.pipeline import Pipeline

from openapi_server.db import create_db_client


from openapi_server.models.document import Document
from openapi_server.models.feature import Feature
from openapi_server.models.predicted_classification_with_explanation import (
    PredictedClassificationWithExplanation,
)

from openapi_server.service.data_parsing import (
    extract_data,
    extract_file_paths,
    extract_labels,
)
from openapi_server.service.classification import get_model, CLASSIFIERS, get_vectorizer
from openapi_server.service.explanation import lime_explanation


MODEL_DIRECTORY = pathlib.Path("instance", "models")

print("MODEL_DIRECTORY", MODEL_DIRECTORY)


db = None


def copy_func(f, globals=None, module=None):
    """Based on https://stackoverflow.com/a/13503277/2988730 (@unutbu)"""
    if globals is None:
        globals = f.__globals__
    g = types.FunctionType(
        f.__code__,
        globals,
        name=f.__name__,
        argdefs=f.__defaults__,
        closure=f.__closure__,
    )
    g = functools.update_wrapper(g, f)
    if module is not None:
        g.__module__ = module
    g.__kwdefaults__ = copy.copy(f.__kwdefaults__)
    return g


def process_document(path, data):
    from openapi_server.controllers.document_controller import (
        classify_and_explain,
        calculate_classification_with_explanation,
        get_document,
    )

    global db
    db = process_db = create_db_client()

    global get_document
    get_document = copy_func(get_document, globals(), __name__)

    global calculate_classification_with_explanation
    calculate_classification_with_explanation = copy_func(
        calculate_classification_with_explanation, globals(), __name__
    )
    global classify_and_explain
    classify_and_explain = copy_func(classify_and_explain, globals(), __name__)

    collection = pathlib.Path(path).parts[-3]
    name = pathlib.Path(path).parts[-1]
    document = Document(name=name, content=data)
    operation_result = db[collection].insert_one(document.to_dict())
    doc_id = operation_result.inserted_id
    classify_and_explain(collection, doc_id)


if __name__ == "__main__":

    labels = extract_labels()
    file_paths = extract_file_paths()

    train_paths, test_paths, train_labels, test_labels = train_test_split(
        file_paths, labels, test_size=0.25, random_state=42
    )

    classifier = CLASSIFIERS[-1]

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

    train_data = extract_data(train_paths)

    # train classifier
    pipeline.fit(train_data, train_labels)

    # store classifier
    classifier_type = type(classifier).__name__
    model_path = MODEL_DIRECTORY.joinpath(classifier_type + ".joblib")
    dump(pipeline, model_path)

    test_data = extract_data(test_paths)

    assert len(test_data) == len(test_paths)

    pool = Pool(cpu_count())
    # create, classify and store documents
    for path, data in zip(test_paths, test_data):
        pool.apply_async(
            func=process_document, args=[path, data], error_callback=logging.exception
        )
    pool.close()
    pool.join()
