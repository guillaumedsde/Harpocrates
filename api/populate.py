import logging
import pathlib
import re
from math import floor
from multiprocessing import Pool, cpu_count

from sklearn.model_selection import train_test_split
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

from harpocrates_server.service.document import paragraphs_from_content
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

    paragraphs = paragraphs_from_content(data)

    document = Document(name=name, paragraphs=paragraphs)
    operation_result = db[collection].insert_one(document.to_dict())
    doc_id = operation_result.inserted_id
    classify(collection, doc_id)


if __name__ == "__main__":

    labels = extract_labels()
    file_paths = extract_file_paths()

    train_paths, test_paths, train_labels, test_labels = train_test_split(
        file_paths, labels, test_size=0.1, random_state=42
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

    classifier_type = type(classifier).__name__
    model_path = MODEL_DIRECTORY.joinpath(classifier_type + ".joblib")

    # only retrain the model if it does not exist
    if not model_path.exists():
        train_data = extract_data(train_paths)

        # train classifier
        pipeline.fit(train_data, train_labels)

        # store classifier
        dump(pipeline, model_path)

    # extract test data
    test_data = extract_data(test_paths)

    # check that all test data was read correctly
    assert len(test_data) == len(test_paths)

    pool = Pool(cpu_count())
    # create, classify and store documents
    for doc_path, doc_data in zip(test_paths, test_data):
        pool.apply_async(
            func=process_document,
            args=[doc_path, doc_data],
            error_callback=logging.exception,
        )
    pool.close()
    pool.join()
