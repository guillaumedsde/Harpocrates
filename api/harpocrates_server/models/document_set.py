# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from harpocrates_server.models.base_model_ import Model
from harpocrates_server import util


class DocumentSet(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, name=None, set_id=None, document_count=None):  # noqa: E501
        """DocumentSet - a model defined in OpenAPI

        :param name: The name of this DocumentSet.  # noqa: E501
        :type name: str
        :param set_id: The set_id of this DocumentSet.  # noqa: E501
        :type set_id: str
        :param document_count: The document_count of this DocumentSet.  # noqa: E501
        :type document_count: int
        """
        self.openapi_types = {
            'name': str,
            'set_id': str,
            'document_count': int
        }

        self.attribute_map = {
            'name': 'name',
            'set_id': 'setId',
            'document_count': 'documentCount'
        }

        self._name = name
        self._set_id = set_id
        self._document_count = document_count

    @classmethod
    def from_dict(cls, dikt) -> 'DocumentSet':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The documentSet of this DocumentSet.  # noqa: E501
        :rtype: DocumentSet
        """
        return util.deserialize_model(dikt, cls)

    @property
    def name(self):
        """Gets the name of this DocumentSet.


        :return: The name of this DocumentSet.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name):
        """Sets the name of this DocumentSet.


        :param name: The name of this DocumentSet.
        :type name: str
        """
        if name is None:
            raise ValueError("Invalid value for `name`, must not be `None`")  # noqa: E501

        self._name = name

    @property
    def set_id(self):
        """Gets the set_id of this DocumentSet.


        :return: The set_id of this DocumentSet.
        :rtype: str
        """
        return self._set_id

    @set_id.setter
    def set_id(self, set_id):
        """Sets the set_id of this DocumentSet.


        :param set_id: The set_id of this DocumentSet.
        :type set_id: str
        """

        self._set_id = set_id

    @property
    def document_count(self):
        """Gets the document_count of this DocumentSet.

        number of documents in set  # noqa: E501

        :return: The document_count of this DocumentSet.
        :rtype: int
        """
        return self._document_count

    @document_count.setter
    def document_count(self, document_count):
        """Sets the document_count of this DocumentSet.

        number of documents in set  # noqa: E501

        :param document_count: The document_count of this DocumentSet.
        :type document_count: int
        """

        self._document_count = document_count
