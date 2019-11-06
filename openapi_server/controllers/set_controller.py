import connexion
import six
from http import HTTPStatus

from openapi_server.models.document_set import DocumentSet  # noqa: E501
from openapi_server.models.document_sets import DocumentSets  # noqa: E501
from openapi_server.models.documents import Documents  # noqa: E501
from openapi_server.models.document import Document
from openapi_server.models.http_status import HttpStatus  # noqa: E501
from openapi_server import util, es, cat


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
    # FIXME block until index is actually created
    es.indices.create(index=document_set.name)

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
        document = Document(document_id=hit["_id"], content=hit["_source"]["body"])
        document_list.append(document)
    documents = Documents(documents=document_list)
    return documents


def get_sets():  # noqa: E501
    """List all documentsets known by the engine

     # noqa: E501


    :rtype: DocumentSets
    """
    # {'health': 'yellow', 'status': 'open', 'index': 'ttt', 'uuid': 'iybwGuC2S0OY8zhdjFLq9w', 'pri': '1', 'rep': '1', 'docs.count': '0', 'docs.deleted': '0', 'store.size': '283b', 'pri.store.size': '283b'}

    doc_set_list = []
    for index in cat.indices("*", format="json"):
        if index["index"].startswith("."):
            continue
        doc_set = DocumentSet(
            name=index["index"],
            set_id=index["uuid"],
            document_count=index["docs.count"],
            size=index["store.size"],
        )
        doc_set_list.append(doc_set)
    doc_sets = DocumentSets(document_sets=doc_set_list)
    return doc_sets
