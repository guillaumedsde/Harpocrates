import connexion
import six
from http import HTTPStatus


import numpy as np

from openapi_server.models.document import Document  # noqa: E501
from openapi_server.models.http_status import HttpStatus  # noqa: E501
from openapi_server.models.predicted_classification import PredictedClassification
from openapi_server.models.predicted_classification_with_explanation import (
    PredictedClassificationWithExplanation,
)
from openapi_server.models.feature import Feature

from openapi_server import util, es

from openapi_server.service import CLASS_NAMES
from openapi_server.service.classification import get_model
from openapi_server.service.explanation import lime_explanation


def create_document(set_id, body):  # noqa: E501
    """Add a new document to the document set

    Contents of the document in the body of the request. This should be in plain text. The Content-Type header should be appropriately set to text/plain. # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param body: 
    :type body: str

    :rtype: Document
    """

    es_doc = {"body": body.decode()}
    es.index(index=set_id, body=es_doc)
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
    return HTTPStatus.NOT_IMPLEMENTED


def get_document(set_id, doc_id):  # noqa: E501
    """get document from set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str

    :rtype: Document
    """
    res = es.get(index=set_id, doc_type="_doc", id=doc_id)

    document = Document(document_id=res["_id"], content=res["_source"]["body"])

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

    # TODO this is a long blocking call when first training the classifier, needs to return 202 "created" with some URL to the processed element
    trained_model = get_model()
    explanation = lime_explanation(trained_model, document.content)
    # document is sensitive if probability of "non sensitive" classification is lower than "sensitive" classification
    sensitive = explanation.predict_proba[0] < explanation.predict_proba[1]
    # sensitivity of document is the probability of "sensitive" classification
    sensitivity = explanation.predict_proba[1]

    # sort into sensitive/non sensitive feature based on classification
    sensitive_features = []
    non_sensitive_features = []
    for feature_info in explanation.as_list():
        feature = Feature(feature=feature_info[0], weight=feature_info[1])
        if (sensitive and feature.weight > 0) or (not sensitive and feature.weight < 0):
            sensitive_features.append(feature)
        else:
            non_sensitive_features.append(feature)

    # build and return final classification with explanation object
    classification_with_explanation = PredictedClassificationWithExplanation(
        sensitive=sensitive,
        sensitivity=sensitivity,
        non_sensitive_features=non_sensitive_features,
        sensitive_features=sensitive_features,
    )

    return classification_with_explanation
