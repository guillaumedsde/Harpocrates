import logging
import pathlib
import re
from math import floor
from multiprocessing import Pool, cpu_count

from progress.bar import Bar
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.model_selection import StratifiedShuffleSplit
from joblib import dump
from sklearn.pipeline import Pipeline

from harpocrates_server.db import create_db_client

from harpocrates_server.service.data_parsing import (
    extract_data,
    extract_file_paths,
    extract_labels,
)
from harpocrates_server.service.classification import (
    get_model,
    CLASSIFIERS,
    get_vectorizer,
)

from harpocrates_server.service.document import text_contents_from_document_body
from harpocrates_server.controllers.document_controller import (
    classify,
    classify_text,
    get_document,
)

from harpocrates_server.models.document import Document

MODEL_DIRECTORY = pathlib.Path("instance", "models")

print("MODEL_DIRECTORY", MODEL_DIRECTORY)


def process_document(path, data):

    db = create_db_client()
    classify.__globals__["db"] = db

    collection = pathlib.Path(path).parts[-3]
    name = pathlib.Path(path).parts[-1]
    text_contents = text_contents_from_document_body(data, granularity="document")

    document = Document(name=name, text_contents=text_contents, text_split_granularity="document")
    operation_result = db[collection].insert_one(document.to_dict())
    doc_id = operation_result.inserted_id
    # disable parallel SVC for population script since already parallelizing below
    classify(collection, doc_id)


if __name__ == "__main__":

    labels = extract_labels()
    file_paths = np.array(extract_file_paths())

    splitter = StratifiedShuffleSplit(n_splits=1, test_size=0.05, random_state=42)
    for train_index, test_index in splitter.split(file_paths, labels):
        train_paths = file_paths[train_index]
        test_paths = file_paths[test_index]
        train_labels = labels[train_index]
        test_labels = labels[test_index]
    # train_paths, test_paths, train_labels, test_labels = train_test_split(
    #     file_paths, labels, test_size=0.1, random_state=42
    # )

    classifier = CLASSIFIERS[-1]

    classifier_type = type(classifier).__name__
    train_data = extract_data(train_paths)

    # train classifier
    get_model(classifier,train_data, train_labels)

    # extract test data
    test_data = extract_data(test_paths)

    # check that all test data was read correctly
    assert len(test_data) == len(test_paths)

    # pool = Pool(cpu_count())

    bar = Bar('Processing test documents', max=len(test_paths))
    # create, classify and store documents
    for doc_path, doc_data in zip(test_paths, test_data):
        process_document(doc_path, doc_data)
        bar.next()
    #     pool.apply_async(
    #         func=process_document,
    #         args=[doc_path, doc_data],
    #         error_callback=logging.exception,
    #         # callback=bar.next
    #     )
    # pool.close()
    # pool.join()
