# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from harpocrates_server.models.base_model import Model
from harpocrates_server.models.document_set import DocumentSet
from harpocrates_server import util

from harpocrates_server.models.document_set import DocumentSet  # noqa: E501

class DocumentSets(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, document_sets=None):  # noqa: E501
        """DocumentSets - a model defined in OpenAPI

        :param document_sets: The document_sets of this DocumentSets.  # noqa: E501
        :type document_sets: List[DocumentSet]
        """
        self.openapi_types = {
            'document_sets': List[DocumentSet]
        }

        self.attribute_map = {
            'document_sets': 'documentSets'
        }

        self._document_sets = document_sets

    @classmethod
    def from_dict(cls, dikt) -> 'DocumentSets':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The documentSets of this DocumentSets.  # noqa: E501
        :rtype: DocumentSets
        """
        return util.deserialize_model(dikt, cls)

    @property
    def document_sets(self):
        """Gets the document_sets of this DocumentSets.

        array of document sets  # noqa: E501

        :return: The document_sets of this DocumentSets.
        :rtype: List[DocumentSet]
        """
        return self._document_sets

    @document_sets.setter
    def document_sets(self, document_sets):
        """Sets the document_sets of this DocumentSets.

        array of document sets  # noqa: E501

        :param document_sets: The document_sets of this DocumentSets.
        :type document_sets: List[DocumentSet]
        """
        if document_sets is None:
            raise ValueError("Invalid value for `document_sets`, must not be `None`")  # noqa: E501

        self._document_sets = document_sets
