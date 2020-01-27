# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from harpocrates_server.models.base_model import Model
from harpocrates_server.models.feature_all_of import FeatureAllOf
from harpocrates_server.models.section import Section
from harpocrates_server import util

from harpocrates_server.models.feature_all_of import FeatureAllOf  # noqa: E501
from harpocrates_server.models.section import Section  # noqa: E501

class Feature(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, start_offset=None, end_offset=None, text=None, weight=None):  # noqa: E501
        """Feature - a model defined in OpenAPI

        :param start_offset: The start_offset of this Feature.  # noqa: E501
        :type start_offset: int
        :param end_offset: The end_offset of this Feature.  # noqa: E501
        :type end_offset: int
        :param text: The text of this Feature.  # noqa: E501
        :type text: str
        :param weight: The weight of this Feature.  # noqa: E501
        :type weight: float
        """
        self.openapi_types = {
            'start_offset': int,
            'end_offset': int,
            'text': str,
            'weight': float
        }

        self.attribute_map = {
            'start_offset': 'startOffset',
            'end_offset': 'endOffset',
            'text': 'text',
            'weight': 'weight'
        }

        self._start_offset = start_offset
        self._end_offset = end_offset
        self._text = text
        self._weight = weight

    @classmethod
    def from_dict(cls, dikt) -> 'Feature':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The feature of this Feature.  # noqa: E501
        :rtype: Feature
        """
        return util.deserialize_model(dikt, cls)

    @property
    def start_offset(self):
        """Gets the start_offset of this Feature.

        start offset of a section in characters from the beginning of the text  # noqa: E501

        :return: The start_offset of this Feature.
        :rtype: int
        """
        return self._start_offset

    @start_offset.setter
    def start_offset(self, start_offset):
        """Sets the start_offset of this Feature.

        start offset of a section in characters from the beginning of the text  # noqa: E501

        :param start_offset: The start_offset of this Feature.
        :type start_offset: int
        """
        if start_offset is None:
            raise ValueError("Invalid value for `start_offset`, must not be `None`")  # noqa: E501
        if start_offset is not None and start_offset < 0:  # noqa: E501
            raise ValueError("Invalid value for `start_offset`, must be a value greater than or equal to `0`")  # noqa: E501

        self._start_offset = start_offset

    @property
    def end_offset(self):
        """Gets the end_offset of this Feature.

        end offset of a section in characters from the beginning of the text  # noqa: E501

        :return: The end_offset of this Feature.
        :rtype: int
        """
        return self._end_offset

    @end_offset.setter
    def end_offset(self, end_offset):
        """Sets the end_offset of this Feature.

        end offset of a section in characters from the beginning of the text  # noqa: E501

        :param end_offset: The end_offset of this Feature.
        :type end_offset: int
        """
        if end_offset is None:
            raise ValueError("Invalid value for `end_offset`, must not be `None`")  # noqa: E501
        if end_offset is not None and end_offset < 0:  # noqa: E501
            raise ValueError("Invalid value for `end_offset`, must be a value greater than or equal to `0`")  # noqa: E501

        self._end_offset = end_offset

    @property
    def text(self):
        """Gets the text of this Feature.

        textual representation of the section  # noqa: E501

        :return: The text of this Feature.
        :rtype: str
        """
        return self._text

    @text.setter
    def text(self, text):
        """Sets the text of this Feature.

        textual representation of the section  # noqa: E501

        :param text: The text of this Feature.
        :type text: str
        """

        self._text = text

    @property
    def weight(self):
        """Gets the weight of this Feature.

        The contribution of that feature to the classification, if positive weight, this feature contributes to a document's sensitivity and conversely  # noqa: E501

        :return: The weight of this Feature.
        :rtype: float
        """
        return self._weight

    @weight.setter
    def weight(self, weight):
        """Sets the weight of this Feature.

        The contribution of that feature to the classification, if positive weight, this feature contributes to a document's sensitivity and conversely  # noqa: E501

        :param weight: The weight of this Feature.
        :type weight: float
        """

        self._weight = weight
