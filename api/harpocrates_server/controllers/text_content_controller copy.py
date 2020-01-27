import connexion
import six
from http import HTTPStatus

from harpocrates_server.models.http_status import HttpStatus  # noqa: E501
from harpocrates_server.models.sensitive_section import SensitiveSection  # noqa: E501
from harpocrates_server.models.sensitive_sections import SensitiveSections  # noqa: E501
from harpocrates_server import util, db

from bson.objectid import ObjectId


def add_sensitive_section(
    set_id, doc_id, text_content_index, sensitive_section=None
):  # noqa: E501
    """add a sensitive section to the document

    add a sensitive section to the document # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str
    :param text_content_index: Index of the position of a TextContent object in the list of TextContent objects making up the document
    :type text_content_index: int
    :param sensitive_section: 
    :type sensitive_section: dict | bytes

    :rtype: SensitiveSection
    """

    if not connexion.request.is_json:
        error = HTTPStatus.BAD_REQUEST
        return create_api_http_status(error), error.value
    sensitive_section = SensitiveSection.from_dict(
        connexion.request.get_json()
    )  # noqa: E501

    db[set_id].update_one(
        {"_id": ObjectId(doc_id)},
        {
            "$push": {
                "text_contents.{}.sensitive_sections".format(
                    text_content_index
                ): sensitive_section.to_dict()
            }
        },
    )

    # return sensitive sections with HTTPStatus
    return sensitive_section, HTTPStatus.CREATED.value


def add_sensitive_sections(
    set_id, doc_id, text_content_index, sensitive_sections=None
):  # noqa: E501
    """Overwrite the sensitive sections of a TextContent object

    Overwrite the sensitive sections of a TextContent object # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str
    :param text_content_index: Index of the position of a TextContent object in the list of TextContent objects making up the document
    :type text_content_index: int
    :param sensitive_sections: 
    :type sensitive_sections: dict | bytes

    :rtype: SensitiveSections
    """
    if not connexion.request.is_json:
        error = HTTPStatus.BAD_REQUEST
        return create_api_http_status(error), error.value
    sensitive_sections = SensitiveSections.from_dict(
        connexion.request.get_json()
    )  # noqa: E501

    sensitive_sections_dict = sensitive_sections.to_dict()["sensitive_sections"]

    db[set_id].update_one(
        {"_id": ObjectId(doc_id)},
        {
            "$set": {
                "text_contents.{}.sensitive_sections".format(
                    text_content_index
                ): sensitive_sections_dict
            }
        },
        # {"$set": {"sensitive_sections": sensitive_sections_dict}},
    )

    # return sensitive sections with HTTPStatus
    return sensitive_sections, HTTPStatus.OK.value
