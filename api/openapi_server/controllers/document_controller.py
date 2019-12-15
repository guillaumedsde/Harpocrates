import connexion
import six
from http import HTTPStatus
import json
import re

import numpy as np
from bson.objectid import ObjectId

from openapi_server.models.document import Document  # noqa: E501
from openapi_server.models.http_status import HttpStatus  # noqa: E501
from openapi_server.models.predicted_classification import PredictedClassification
from openapi_server.models.predicted_classification_with_explanation import (
    PredictedClassificationWithExplanation,
)
from openapi_server.models.feature import Feature
from openapi_server.models.sensitive_section import SensitiveSection
from openapi_server.models.sensitive_sections import SensitiveSections

from openapi_server import util, db

from openapi_server import create_db_client

from openapi_server.service import CLASS_NAMES
from openapi_server.service.classification import get_model
from openapi_server.service.explanation import lime_explanation

# from openapi_server.service.classify import classify_and_explain


def add_sensitive_section(set_id, doc_id, body):  # noqa: E501
    """add a sensitive section to the document

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str
    :param sensitive_section: 
    :type sensitive_section: dict | bytes

    :rtype: SensitiveSection
    """
    if not connexion.request.is_json:
        return HTTPStatus.BAD_REQUEST
    sensitive_section = SensitiveSection.from_dict(
        connexion.request.get_json()
    )  # noqa: E501

    db[set_id].update_one(
        {"_id": ObjectId(doc_id)},
        {"$push": {"sensitiveSections": sensitive_section.to_dict()}},
    )

    # return sensitive sections with HTTPStatus
    return sensitive_section, HTTPStatus.CREATED


def add_sensitive_sections(set_id, doc_id, body):  # noqa: E501
    """add multiple sensitive sections to the document

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str
    :param sensitive_sections: 
    :type sensitive_sections: dict | bytes

    :rtype: SensitiveSections
    """
    if not connexion.request.is_json:
        return HTTPStatus.BAD_REQUEST
    sensitive_sections = SensitiveSections.from_dict(
        connexion.request.get_json()
    )  # noqa: E501

    db[set_id].update_one(
        {"_id": ObjectId(doc_id)},
        {
            "$set": {
                "sensitiveSections": sensitive_sections.to_dict()["sensitive_sections"]
            }
        },
    )

    # return sensitive sections with HTTPStatus
    return sensitive_sections, HTTPStatus.CREATED


def get_sensitive_sections(set_id, doc_id):
    """get document sensitive sections

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str

    :rtype: SensitiveSections
    """

    sensitive_sections_query = db[set_id].find_one(
        {"_id": ObjectId(doc_id)}, {"sensitiveSections": 1}
    )

    sensitive_section_list = []

    for section in sensitive_sections_query["sensitiveSections"]:
        sensitive_section_list.append(SensitiveSection(**section))

    sensitive_sections = SensitiveSections(sensitive_sections=sensitive_section_list)

    return sensitive_sections


def create_document(set_id, body):  # noqa: E501
    """Add a new document to the document set

    Contents of the document in the body of the request. This should be in plain text. The Content-Type header should be appropriately set to text/plain. # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param body: 
    :type body: str

    :rtype: Document
    """

    doc = {"body": body.decode(), "sensitiveSections": []}
    operation_result = db[set_id].insert_one(doc)

    doc_id = operation_result.inserted_id

    print(doc_id)

    classify_and_explain(set_id, doc_id)

    return HTTPStatus.CREATED


def delete_document(set_id, doc_id):  # noqa: E501
    """delete the set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str

    :rtype: Document
    """

    result = db[set_id].delete_one({"_id": ObjectId(doc_id)})
    return HTTPStatus.OK


def get_document(set_id, doc_id):  # noqa: E501
    """get document from set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str

    :rtype: Document
    """

    doc = db[set_id].find_one({"_id": ObjectId(doc_id)})
    document = Document(document_id=str(doc["_id"]), content=doc["body"])

    return document


def get_predicted_classification(set_id, doc_id):  # noqa: E501
    """Get the predicted classification for the document

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str

    :rtype: PredictedClassification
    """
    document = get_document(set_id, doc_id)
    # TODO this is a long blocking call when first training the classifier, needs to return 202 "created" with some URL to the processed element
    trained_model = get_model()
    classification_probas = trained_model.predict_proba([document.content])[0]
    best_classification_index = np.argmax(classification_probas)
    sensitive = CLASS_NAMES[best_classification_index] == "sensitive"
    sensitivity = round(classification_probas[1] * 100)

    predicted = PredictedClassification(sensitive=sensitive, sensitivity=sensitivity)
    return predicted


def calculate_classification_with_explanation(set_id, doc_id):
    """Calculate the classification of a document with the explanation for the predicted classification

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str

    :rtype: PredictedClassificationWithExplanation
    """
    document = get_document(set_id, doc_id)

    # TODO this is a long blocking call when first training the classifier, needs to return 202 "created" with some URL to the processed element
    trained_model = get_model()
    explanation = lime_explanation(trained_model, document.content)
    # document is sensitive if probability of "non sensitive" classification is lower than "sensitive" classification
    sensitive = explanation.predict_proba[0] < explanation.predict_proba[1]
    # sensitivity of document is the probability of "sensitive" classification
    sensitivity = round(explanation.predict_proba[1] * 100)

    # sort into sensitive/non sensitive feature based on classification
    sensitive_features = []
    non_sensitive_features = []

    # iterate over all features
    for feature_info in explanation.as_list():
        pattern = "\\b({feature})+\\b".format(feature=feature_info[0])

        # match all features in content
        matches = re.finditer(pattern, document.content, flags=re.MULTILINE)

        # iterate over all matches and sort accordingly
        for match in matches:
            feature = Feature(
                start_offset=match.span()[0],
                end_offset=match.span()[1],
                weight=feature_info[1],
                text=match[0],
            )
            if (
                sensitive
                and (feature_info[1] > 0)
                or (not sensitive)
                and (feature_info[1] < 0)
            ):
                sensitive_features.append(feature)
            else:
                non_sensitive_features.append(feature)

    # build and return final classification with explanation object
    classification_with_explanation = PredictedClassificationWithExplanation(
        # for some reason python boolean can't be casted to JSON
        sensitive=int(sensitive),
        sensitivity=sensitivity,
        non_sensitive_features=non_sensitive_features,
        sensitive_features=sensitive_features,
    )

    return classification_with_explanation


def get_predicted_classification_with_explanation(set_id, doc_id):  # noqa: E501
    """Get the explanation for the predicted classification of a document with
    the classification

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str

    :rtype: PredictedClassificationWithExplanation
    """
    document = get_document(set_id, doc_id)

    predicted_classification_query = db[set_id].find_one(
        {"_id": ObjectId(doc_id)}, {"predictedClassification": 1}
    )

    predicted_classification = predicted_classification_query["predictedClassification"]

    # build and return final classification with explanation object
    classification_with_explanation = PredictedClassificationWithExplanation.from_dict(
        predicted_classification
    )

    sensitive_features = []
    for feature in predicted_classification["sensitive_features"]:
        sensitive_features.append(Feature(**feature))

    non_sensitive_features = []
    for feature in predicted_classification["non_sensitive_features"]:
        non_sensitive_features.append(Feature(**feature))

    classification_with_explanation.sensitive_features = sensitive_features
    classification_with_explanation.non_sensitive_features = non_sensitive_features

    # print(classification_with_explanation)

    return classification_with_explanation


def classify_and_explain(set_id, doc_id):
    """calculates document classification and accompanying explanation

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str
    """

    # global db
    # db = create_db_client()

    classification = calculate_classification_with_explanation(set_id, doc_id)

    doc_id = db[set_id].update(
        {"_id": ObjectId(doc_id)},
        {"$set": {"predictedClassification": classification.to_dict()}},
    )
