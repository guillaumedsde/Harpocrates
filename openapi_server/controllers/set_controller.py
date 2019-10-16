from http import HTTPStatus
import connexion
import six


from openapi_server.models.document_set import DocumentSet  # noqa: E501
from openapi_server.models.document_sets import DocumentSets  # noqa: E501
from openapi_server.models.documents import Documents  # noqa: E501
from openapi_server.models.http_status import HttpStatus  # noqa: E501
from openapi_server import util, db

from openapi_server.models.sqlalchemy import DocumentSet as DocumentSetSql
from openapi_server.models.marshmallow import DocumentSetSchema


def create_set(body):  # noqa: E501
    """Add a new documentset set to the engine

     # noqa: E501

    :param document_set: documentSet descriptor that needs to be added to the engine
    :type document_set: dict | bytes

    :rtype: HttpStatus
    """

    if not connexion.request.is_json:
        return HTTPStatus.BAD_REQUEST

    document_set = DocumentSet.from_dict(connexion.request.get_json())  # noqa: E501

    print(document_set)

    # check for conflicting Database entries
    # existing_document_set = db.session.query(DocumentSet).filter_by(Docname=new_document_set.name).one_or_none()
    # existing_document_set = db.session.query(exists().where(SomeObject.field==value))
    existing_document_set = (
        db.session.query(DocumentSetSql.name).filter_by(name=document_set.name).scalar()
        is not None
    )
    if existing_document_set:
        return HTTPStatus.CONFLICT

    document_set_sql = DocumentSetSql(name=document_set.name)

    # Add the document set to the database
    db.session.add(document_set_sql)
    db.session.commit()

    return DocumentSetSchema().dump(document_set_sql)


def delete_set(set_id):  # noqa: E501
    """delete the set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str

    :rtype: HttpStatus
    """
    return "do some magic!"


def get_set(set_id):  # noqa: E501
    """lists all documents in the set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str

    :rtype: Documents
    """
    return "do some magic!"


def get_sets():  # noqa: E501
    """List all documentsets known by the engine

     # noqa: E501


    :rtype: DocumentSets
    """
    return "do some magic!"
