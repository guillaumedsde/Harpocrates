import connexion
import six
from http import HTTPStatus

from openapi_server.models.document_set import DocumentSet  # noqa: E501
from openapi_server.models.document_sets import DocumentSets  # noqa: E501
from openapi_server.models.documents import Documents  # noqa: E501
from openapi_server.models.document import Document
from openapi_server.models.http_status import HttpStatus  # noqa: E501
from openapi_server.models.elastic_document_set import BODY
from openapi_server import util, es


def create_set(body):  # noqa: E501
    """Add a new documentset set to the engine

     # noqa: E501

    :param document_set: documentSet descriptor that needs to be added to the engine
    :type document_set: dict | bytes

    :rtype: DocumentSet
    """
    if not connexion.request.is_json:
        return HTTPStatus.BAD_REQUEST

    document_set = DocumentSet.from_dict(connexion.request.get_json())  # noqa: E501

    # TODO error handling
    es.indices.create(index=document_set.name, body=BODY)

    return HTTPStatus.CREATED


def delete_set(set_id):  # noqa: E501
    """delete the set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str

    :rtype: DocumentSet
    """
    return "do some magic!"


def get_set(set_id):  # noqa: E501
    """lists all documents in the set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str

    :rtype: Documents
    """
    res = es.search(index=set_id, body={"query": {"match_all": {}}})

    document_list = []
    for hit in res["hits"]["hits"]:
        document = Document(id=hit["_id"], content=hit["_source"]["body"])
        document_list.append(document)
    documents = Documents(documents=document_list)
    return documents


def get_sets():  # noqa: E501
    """List all documentsets known by the engine

     # noqa: E501


    :rtype: DocumentSets
    """

    doc_set_list = []
    for index in es.indices.get("*"):
        if index.startswith("."):
            continue
        doc_set = DocumentSet(name=index)
        doc_set_list.append(doc_set)
    doc_sets = DocumentSets(document_sets=doc_set_list)
    return doc_sets
