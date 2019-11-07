# coding: utf-8

from __future__ import absolute_import

import unittest

from flask import json

from openapi_server.test import BaseTestCase


class TestSetController(BaseTestCase):
    """SetController integration test stubs"""

    def test_create_set(self):
        """Test case for create_set

        Add a new documentset set to the engine
        """
        new_set = {}
        headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        response = self.client.open(
            '/0.1.0/documentSet',
            method='POST',
            headers=headers,
            data=json.dumps(new_set),
            content_type='application/json')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_delete_set(self):
        """Test case for delete_set

        delete the set
        """
        headers = {
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/0.1.0/documentSet/{set_id}'.format(set_id='set_id_example'),
            method='DELETE',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_set(self):
        """Test case for get_set

        lists all documents in the set
        """
        headers = {
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/0.1.0/documentSet/{set_id}'.format(set_id='set_id_example'),
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_get_sets(self):
        """Test case for get_sets

        List all documentsets known by the engine
        """
        headers = {
            'Accept': 'application/json',
        }
        response = self.client.open(
            '/0.1.0/documentSet',
            method='GET',
            headers=headers)
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    unittest.main()
