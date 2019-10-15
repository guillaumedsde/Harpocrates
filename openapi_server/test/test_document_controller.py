# coding: utf-8

from __future__ import absolute_import

import unittest

from flask import json

from openapi_server.test import BaseTestCase


class TestDocumentController(BaseTestCase):
    """DocumentController integration test stubs"""

    @unittest.skip("text/plain not supported by Connexion")
    def test_create_document(self):
        """Test case for create_document

        Add a new document to the document set
        """
        new_document = 'new_document_example'
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
        }
        response = self.client.open(
            '/0.1.0/documentSet/{set_id}'.format(set_id='set_id_example'),
            method='POST',
            headers=headers,
            data=json.dumps(new_document),
            content_type='text/plain')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_document(self):
        """Test case for delete_document

        delete the set
        """
        headers = {
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/0.1.0/documentSet/{set_id}/{document_id}'.format(set_id='set_id_example',
                                                               document_id='document_id_example'),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_document(self):
        """Test case for get_document

        get document from set
        """
        headers = {
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/0.1.0/documentSet/{set_id}/{document_id}'.format(set_id='set_id_example',
                                                               document_id='document_id_example'),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
