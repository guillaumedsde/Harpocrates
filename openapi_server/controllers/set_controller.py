from http import HTTPStatus

import connexion

from openapi_server import db
from openapi_server.models.document_sets import DocumentSets  # noqa: E501
from openapi_server.models.documents import Documents  # noqa: E501
from openapi_server.models.http_status import HttpStatus  # noqa: E501
from openapi_server.models.models import DocumentSet
from openapi_server.models.new_document_set import NewDocumentSet  # noqa: E501


def create_set(body):  # noqa: E501
    """Add a new documentset set to the engine

     # noqa: E501

    :param body: documentSet descriptor that needs to be added to the engine
    :type body: dict | bytes

    :rtype: HttpStatus
    """
    if not connexion.request.is_json:
        return HTTPStatus.BAD_REQUEST

    new_set = NewDocumentSet.from_dict(connexion.request.get_json())  # noqa: E501

    # check for conflicting Database entries
    existing_document_set = db.session.query(DocumentSet).filter_by(name=new_set.name).one_or_none()
    if existing_document_set:
        return HTTPStatus.CONFLICT

    # Add the document set to the database
    db.session.add(new_set)
    db.session.commit()

    return new_set


def delete_set(set_id):  # noqa: E501
    """delete the set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str

    :rtype: HttpStatus
    """
    return 'do some magic!'


def get_set(set_id):  # noqa: E501
    """lists all documents in the set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str

    :rtype: Documents
    """
    return 'do some magic!'


def get_sets():  # noqa: E501
    """List all documentsets known by the engine

     # noqa: E501


    :rtype: DocumentSets
    """
    return 'do some magic!'
