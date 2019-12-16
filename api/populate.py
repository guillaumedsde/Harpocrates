import logging
import pathlib
import re
from math import floor
from multiprocessing import Pool, cpu_count

from sklearn.model_selection import train_test_split
from joblib import dump
from sklearn.pipeline import Pipeline

from openapi_server.db import create_db_client

from openapi_server.service.data_parsing import (
    extract_data,
    extract_file_paths,
    extract_labels,
)
from openapi_server.service.classification import get_model, CLASSIFIERS, get_vectorizer

from openapi_server.controllers.document_controller import (
    classify_and_explain,
    calculate_classification_with_explanation,
    get_document,
)

from openapi_server.models.document import Document

MODEL_DIRECTORY = pathlib.Path("instance", "models")

print("MODEL_DIRECTORY", MODEL_DIRECTORY)


def process_document(path, data):

    db = create_db_client()
    classify_and_explain.__globals__["db"] = db

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

    pool = Pool(floor(cpu_count() / 2))
    # create, classify and store documents
    for path, data in zip(test_paths, test_data):
        pool.apply_async(
            func=process_document, args=[path, data], error_callback=logging.exception
        )
    pool.close()
    pool.join()
