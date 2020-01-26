# coding: utf-8

from __future__ import absolute_import
import unittest

from flask import json
from six import BytesIO

from harpocrates_server.models.http_status import HttpStatus  # noqa: E501
from harpocrates_server.models.sensitive_section import SensitiveSection  # noqa: E501
from harpocrates_server.models.sensitive_sections import SensitiveSections  # noqa: E501
from harpocrates_server.test import BaseTestCase


class TestTextContentController(BaseTestCase):
    """TextContentController integration test stubs"""

    def test_add_sensitive_section(self):
        """Test case for add_sensitive_section

        add a sensitive section to the document
        """
        sensitive_section = {}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/documentSet/{set_id}/{doc_id}/{text_content_index}'.format(set_id=9_11, doc_id=document1, text_content_index=2),
            method='POST',
            headers=headers,
            data=json.dumps(sensitive_section),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_add_sensitive_sections(self):
        """Test case for add_sensitive_sections

        Overwrite the sensitive sections of a TextContent object
        """
        sensitive_sections = {}
        headers = { 
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/documentSet/{set_id}/{doc_id}/{text_content_index}'.format(set_id=9_11, doc_id=document1, text_content_index=2),
            method='PUT',
            headers=headers,
            data=json.dumps(sensitive_sections),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
