# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from harpocrates_server.models.base_model_ import Model
from harpocrates_server import util


class SensitiveSectionAllOf(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, name=None, description=None):  # noqa: E501
        """SensitiveSectionAllOf - a model defined in OpenAPI

        :param name: The name of this SensitiveSectionAllOf.  # noqa: E501
        :type name: str
        :param description: The description of this SensitiveSectionAllOf.  # noqa: E501
        :type description: str
        """
        self.openapi_types = {
            'name': str,
            'description': str
        }

        self.attribute_map = {
            'name': 'name',
            'description': 'description'
        }

        self._name = name
        self._description = description

    @classmethod
    def from_dict(cls, dikt) -> 'SensitiveSectionAllOf':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The sensitiveSection_allOf of this SensitiveSectionAllOf.  # noqa: E501
        :rtype: SensitiveSectionAllOf
        """
        return util.deserialize_model(dikt, cls)

    @property
    def name(self):
        """Gets the name of this SensitiveSectionAllOf.

        what was the exemption that was found (mandatory)  # noqa: E501

        :return: The name of this SensitiveSectionAllOf.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name):
        """Sets the name of this SensitiveSectionAllOf.

        what was the exemption that was found (mandatory)  # noqa: E501

        :param name: The name of this SensitiveSectionAllOf.
        :type name: str
        """
        if name is None:
            raise ValueError("Invalid value for `name`, must not be `None`")  # noqa: E501

        self._name = name

    @property
    def description(self):
        """Gets the description of this SensitiveSectionAllOf.

        This is an optional textual description of what the predicted sensitivity is, suitable for presentation to the user  # noqa: E501

        :return: The description of this SensitiveSectionAllOf.
        :rtype: str
        """
        return self._description

    @description.setter
    def description(self, description):
        """Sets the description of this SensitiveSectionAllOf.

        This is an optional textual description of what the predicted sensitivity is, suitable for presentation to the user  # noqa: E501

        :param description: The description of this SensitiveSectionAllOf.
        :type description: str
        """

        self._description = description
