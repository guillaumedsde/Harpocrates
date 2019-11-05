# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from openapi_server.models.base_model_ import Model
from openapi_server import util


class PredictedClassification(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, sensitive=None, sensitivity=None):  # noqa: E501
        """PredictedClassification - a model defined in OpenAPI

        :param sensitive: The sensitive of this PredictedClassification.  # noqa: E501
        :type sensitive: bool
        :param sensitivity: The sensitivity of this PredictedClassification.  # noqa: E501
        :type sensitivity: int
        """
        self.openapi_types = {
            'sensitive': bool,
            'sensitivity': int
        }

        self.attribute_map = {
            'sensitive': 'sensitive',
            'sensitivity': 'sensitivity'
        }

        self._sensitive = sensitive
        self._sensitivity = sensitivity

    @classmethod
    def from_dict(cls, dikt) -> 'PredictedClassification':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The predictedClassification of this PredictedClassification.  # noqa: E501
        :rtype: PredictedClassification
        """
        return util.deserialize_model(dikt, cls)

    @property
    def sensitive(self):
        """Gets the sensitive of this PredictedClassification.

        true if the document is predicted to be sensitive, false otherwise  # noqa: E501

        :return: The sensitive of this PredictedClassification.
        :rtype: bool
        """
        return self._sensitive

    @sensitive.setter
    def sensitive(self, sensitive):
        """Sets the sensitive of this PredictedClassification.

        true if the document is predicted to be sensitive, false otherwise  # noqa: E501

        :param sensitive: The sensitive of this PredictedClassification.
        :type sensitive: bool
        """
        if sensitive is None:
            raise ValueError("Invalid value for `sensitive`, must not be `None`")  # noqa: E501

        self._sensitive = sensitive

    @property
    def sensitivity(self):
        """Gets the sensitivity of this PredictedClassification.

        Document sensitivity percentage  # noqa: E501

        :return: The sensitivity of this PredictedClassification.
        :rtype: int
        """
        return self._sensitivity

    @sensitivity.setter
    def sensitivity(self, sensitivity):
        """Sets the sensitivity of this PredictedClassification.

        Document sensitivity percentage  # noqa: E501

        :param sensitivity: The sensitivity of this PredictedClassification.
        :type sensitivity: int
        """

        self._sensitivity = sensitivity
