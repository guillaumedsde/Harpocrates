# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from harpocrates_server.models.base_model_ import Model
from harpocrates_server.models.predicted_classification import PredictedClassification
from harpocrates_server.models.sensitive_sections import SensitiveSections
from harpocrates_server import util

from harpocrates_server.models.predicted_classification import (
    PredictedClassification,
)  # noqa: E501
from harpocrates_server.models.sensitive_sections import SensitiveSections  # noqa: E501

from harpocrates_server.models.paragraph import Paragraph


class Document(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, name=None, document_id=None, paragraphs=None):  # noqa: E501
        """Document - a model defined in OpenAPI

        :param name: The name of this Document.  # noqa: E501
        :type name: str
        :param document_id: The document_id of this Document.  # noqa: E501
        :type document_id: str
        :param paragraphs: The paragraphs of this Document.  # noqa: E501
        :type paragraphs: List[Paragraph]
        """
        self.openapi_types = {
            "name": str,
            "document_id": str,
            "paragraphs": List[Paragraph],
        }

        self.attribute_map = {
            "name": "name",
            "document_id": "documentId",
            "paragraphs": "paragraphs",
        }

        self._name = name
        self._document_id = document_id
        self._paragraphs = paragraphs

    @classmethod
    def from_dict(cls, dikt) -> "Document":
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The document of this Document.  # noqa: E501
        :rtype: Document
        """
        return util.deserialize_model(dikt, cls)

    @property
    def name(self):
        """Gets the name of this Document.


        :return: The name of this Document.
        :rtype: str
        """
        return self._name

    @name.setter
    def name(self, name):
        """Sets the name of this Document.


        :param name: The name of this Document.
        :type name: str
        """

        self._name = name

    @property
    def document_id(self):
        """Gets the document_id of this Document.


        :return: The document_id of this Document.
        :rtype: str
        """
        return self._document_id

    @document_id.setter
    def document_id(self, document_id):
        """Sets the document_id of this Document.


        :param document_id: The document_id of this Document.
        :type document_id: str
        """
        if document_id is None:
            raise ValueError(
                "Invalid value for `document_id`, must not be `None`"
            )  # noqa: E501

        self._document_id = document_id

    @property
    def paragraphs(self):
        """Gets the paragraphs of this Document.

        list of paragraph object representing the content of the document  # noqa: E501

        :return: The paragraphs of this Document.
        :rtype: List[Paragraph]
        """
        return self._paragraphs

    @paragraphs.setter
    def paragraphs(self, paragraphs):
        """Sets the paragraphs of this Document.

        list of paragraph object representing the content of the document  # noqa: E501

        :param paragraphs: The paragraphs of this Document.
        :type paragraphs: List[Paragraph]
        """
        if paragraphs is None:
            raise ValueError(
                "Invalid value for `paragraphs`, must not be `None`"
            )  # noqa: E501

        self._paragraphs = paragraphs
