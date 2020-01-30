# coding: utf-8

from __future__ import absolute_import
from datetime import date, datetime  # noqa: F401

from typing import List, Dict  # noqa: F401

from harpocrates_server.models.base_model_ import Model
from harpocrates_server.models.predicted_classification import PredictedClassification
from harpocrates_server.models.sensitive_sections import SensitiveSections
from harpocrates_server import util

from harpocrates_server.models.predicted_classification import PredictedClassification  # noqa: E501
from harpocrates_server.models.sensitive_sections import SensitiveSections  # noqa: E501

class TextContent(Model):
    """NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).

    Do not edit the class manually.
    """

    def __init__(self, predicted_classification=None, sensitive_sections=None, content=None):  # noqa: E501
        """TextContent - a model defined in OpenAPI

        :param predicted_classification: The predicted_classification of this TextContent.  # noqa: E501
        :type predicted_classification: PredictedClassification
        :param sensitive_sections: The sensitive_sections of this TextContent.  # noqa: E501
        :type sensitive_sections: SensitiveSections
        :param content: The content of this TextContent.  # noqa: E501
        :type content: str
        """
        self.openapi_types = {
            'predicted_classification': PredictedClassification,
            'sensitive_sections': SensitiveSections,
            'content': str
        }

        self.attribute_map = {
            'predicted_classification': 'predictedClassification',
            'sensitive_sections': 'sensitiveSections',
            'content': 'content'
        }

        self._predicted_classification = predicted_classification
        self._sensitive_sections = sensitive_sections
        self._content = content

    @classmethod
    def from_dict(cls, dikt) -> 'TextContent':
        """Returns the dict as a model

        :param dikt: A dict.
        :type: dict
        :return: The textContent of this TextContent.  # noqa: E501
        :rtype: TextContent
        """
        return util.deserialize_model(dikt, cls)

    @property
    def predicted_classification(self):
        """Gets the predicted_classification of this TextContent.


        :return: The predicted_classification of this TextContent.
        :rtype: PredictedClassification
        """
        return self._predicted_classification

    @predicted_classification.setter
    def predicted_classification(self, predicted_classification):
        """Sets the predicted_classification of this TextContent.


        :param predicted_classification: The predicted_classification of this TextContent.
        :type predicted_classification: PredictedClassification
        """

        self._predicted_classification = predicted_classification

    @property
    def sensitive_sections(self):
        """Gets the sensitive_sections of this TextContent.


        :return: The sensitive_sections of this TextContent.
        :rtype: SensitiveSections
        """
        return self._sensitive_sections

    @sensitive_sections.setter
    def sensitive_sections(self, sensitive_sections):
        """Sets the sensitive_sections of this TextContent.


        :param sensitive_sections: The sensitive_sections of this TextContent.
        :type sensitive_sections: SensitiveSections
        """

        self._sensitive_sections = sensitive_sections

    @property
    def content(self):
        """Gets the content of this TextContent.

        content of the textContent  # noqa: E501

        :return: The content of this TextContent.
        :rtype: str
        """
        return self._content

    @content.setter
    def content(self, content):
        """Sets the content of this TextContent.

        content of the textContent  # noqa: E501

        :param content: The content of this TextContent.
        :type content: str
        """
        if content is None:
            raise ValueError("Invalid value for `content`, must not be `None`")  # noqa: E501

        self._content = content
