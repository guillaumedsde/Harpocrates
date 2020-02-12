import connexion
import six
from http import HTTPStatus
from typing import Tuple, Union

from harpocrates_server.models.http_status import (
    HttpStatus as ApiHttpStatus,
)  # noqa: E501
from harpocrates_server.models.sensitive_section import SensitiveSection  # noqa: E501
from harpocrates_server.models.sensitive_sections import SensitiveSections  # noqa: E501
from harpocrates_server.service.errors import create_api_http_status
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
                "textContents.{}.sensitiveSections".format(
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

    sensitive_sections_dict = sensitive_sections.to_dict()

    db[set_id].update_one(
        {"_id": ObjectId(doc_id)},
        {
            "$set": {
                "textContents.{}.sensitiveSections".format(
                    text_content_index
                ): sensitive_sections_dict
            }
        },
        # {"$set": {"sensitiveSections": sensitive_sections_dict}},
    )

    # return sensitive sections with HTTPStatus
    return sensitive_sections, HTTPStatus.OK.value


def get_sensitive_sections(
    set_id, doc_id, text_content_index
) -> Tuple[Union[ApiHttpStatus, SensitiveSections], int]:  # noqa: E501
    """get sensitive sections of a TextContent object

    get sensitive sections of a TextContent object # noqa: E501

    :param set_id: ID of a set
    :type set_id: str
    :param doc_id: ID of a document
    :type doc_id: str
    :param text_content_index: Index of the position of a TextContent object in the list of TextContent objects making up the document
    :type text_content_index: int

    :rtype: SensitiveSections
    """
    return "do some magic!"

    sensitive_sections_query = db[set_id].find_one(
        {"_id": ObjectId(doc_id)},
        {"textContents.{}.sensitiveSections".format(text_content_index): 1},
    )

    if not sensitive_sections_query:
        error = HTTPStatus.NOT_FOUND
        return create_api_http_status(error), error.value

    sensitive_section_list = []
    for section in sensitive_sections_query.get("sensitiveSections") or []:
        sensitive_section_list.append(SensitiveSection(**section))

    sensitive_sections = SensitiveSections(sensitive_section_list)

    return sensitive_sections, HTTPStatus.OK.value
