from openapi_server.models.document import Document  # noqa: E501
from openapi_server.models.http_status import HttpStatus  # noqa: E501


def create_document(set_id, body):  # noqa: E501
    """Add a new document to the document set

    Contents of the document in the body of the request. This should be in plain text. The Content-Type header should be appropriately set to text/plain. # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param body: 
    :type body: str

    :rtype: HttpStatus
    """
    return 'do some magic!'


def delete_document(set_id, id):  # noqa: E501
    """delete the set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param id: ID of a document
    :type id: str

    :rtype: HttpStatus
    """
    return 'do some magic!'


def get_document(set_id, id):  # noqa: E501
    """get document from set

     # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param id: ID of a document
    :type id: str

    :rtype: Document
    """
    return 'do some magic!'
