import connexion
import six
from http import HTTPStatus
import time
from copy import deepcopy

from harpocrates_server.models.document_set import DocumentSet  # noqa: E501
from harpocrates_server.models.document_sets import DocumentSets  # noqa: E501
from harpocrates_server.models.documents import Documents  # noqa: E501
from harpocrates_server.models.document import Document
from harpocrates_server.models.http_status import HttpStatus  # noqa: E501
from harpocrates_server import util, db

from harpocrates_server.service.errors import create_api_http_status


def create_set(body) -> Tuple[Union[ApiHttpStatus, DocumentSet], int]:  # noqa: E501
    """Add a new documentset set to the engine

     # noqa: E501

    :param document_set: documentSet descriptor that needs to be added to the engine
    :type document_set: dict | bytes

    :rtype: DocumentSet
    """
    if not connexion.request.is_json:
        error = HTTPStatus.BAD_REQUEST
        return create_api_http_status(error), error.value

    document_set = DocumentSet.from_dict(connexion.request.get_json())  # noqa: E501

    db.create_collection(document_set.name)

    return document_set, HTTPStatus.CREATED.value


def delete_set(set_id) -> int:  # noqa: E501
    """delete the set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str

    :rtype: DocumentSet
    """

    db[set_id].drop()
    return HTTPStatus.OK.value


def get_set(set_id) -> Tuple[Union[ApiHttpStatus, Documents], int]:  # noqa: E501
    """lists all documents in the set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str

    :rtype: Documents
    """

    document_list = []
    for entry in db[set_id].find(
        {}, {"_id": 1, "name": 1, "predicted_classification": 1}
    ):
        document_dict = deepcopy(entry)
        document_dict["document_id"] = str(entry["_id"])
        del document_dict["_id"]
        document = Document(**document_dict)
        document_list.append(document)

    document_set = DocumentSet()
    return Documents(documents=document_list), HTTPStatus.OK.value


def get_sets() -> Tuple[Union[ApiHttpStatus, DocumentSets], int]:  # noqa: E501
    """List all documentsets known by the engine

     # noqa: E501


    :rtype: DocumentSets
    """

    doc_set_list = []
    for collection in db.list_collection_names():
        doc_set_list.append(
            DocumentSet(
                name=collection,
                set_id=collection,
                document_count=db[collection].count(),
            )
        )
    doc_sets = DocumentSets(document_sets=doc_set_list)
    return doc_sets, HTTPStatus.OK.value
