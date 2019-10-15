# coding: utf-8

from __future__ import absolute_import

from openapi_server import util
from openapi_server.models.base_model_ import Model


class DocumentSetAllOf(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, uid=None):  # noqa: E501
        """DocumentSetAllOf - a model defined in OpenAPI

        :param uid: The uid of this DocumentSetAllOf.  # noqa: E501
        :type uid: str
        """
        self.openapi_types = {
            'uid': str
        }

        self.attribute_map = {
            'uid': 'uid'
        }

        self._uid = uid

    @classmethod
    def from_dict(cls, dikt) -> 'DocumentSetAllOf':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The documentSet_allOf of this DocumentSetAllOf.  # noqa: E501
        :rtype: DocumentSetAllOf
        """
        return util.deserialize_model(dikt, cls)

    @property
    def uid(self):
        """Gets the uid of this DocumentSetAllOf.

        Unique ID of the document Set  # noqa: E501

        :return: The uid of this DocumentSetAllOf.
        :rtype: str
        """
        return self._uid

    @uid.setter
    def uid(self, uid):
        """Sets the uid of this DocumentSetAllOf.

        Unique ID of the document Set  # noqa: E501

        :param uid: The uid of this DocumentSetAllOf.
        :type uid: str
        """
        if uid is None:
            raise ValueError("Invalid value for `uid`, must not be `None`")  # noqa: E501

        self._uid = uid
