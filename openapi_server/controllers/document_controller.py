import connexion
import six
from http import HTTPStatus


import numpy as np

from openapi_server.models.document import Document  # noqa: E501
from openapi_server.models.http_status import HttpStatus  # noqa: E501
from openapi_server.models.predicted_classification import PredictedClassification
from openapi_server import util, es

from openapi_server.service import CLASS_NAMES
from openapi_server.service.classification import get_model


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
    return "do some magic!"


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
    # TODO this is a long blocking call, needs to return 202 "created" with some URL to the processed element
    trained_model = get_model()
    classification_probas = trained_model.predict_proba([document.content])[0]
    best_classification_index = np.argmax(classification_probas)
    sensitive = CLASS_NAMES[best_classification_index] == "sensitive"
    sensitivity = round(classification_probas[1] * 100)

    predicted = PredictedClassification(sensitive=sensitive, sensitivity=sensitivity)
    return predicted


def get_predicted_classification_explanation(set_id, doc_id):  # noqa: E501
    """Get the explanation for the predicted classification of a document

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str

    :rtype: InlineResponse200
    """
    return "do some magic!"
