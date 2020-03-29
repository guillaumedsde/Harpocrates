/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 9.2.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import Document from '../model/Document';
import HttpStatus from '../model/HttpStatus';
import PredictedClassification from '../model/PredictedClassification';

/**
* Document service.
* @module api/DocumentApi
* @version 9.2.1
*/
export default class DocumentApi {

    /**
    * Constructs a new DocumentApi. 
    * @alias module:api/DocumentApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * Add a new document to the set
     * Contents of the document in the body of the request. This should be in plain text. The Content-Type header should be appropriately set to text/plain.
     * @param {String} setId ID of a set
     * @param {String} body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Document} and HTTP response
     */
    createDocumentWithHttpInfo(setId, body) {
      let postBody = body;
      // verify the required parameter 'setId' is set
      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling createDocument");
      }
      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createDocument");
      }

      let pathParams = {
        'setId': setId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['text/plain'];
      let accepts = ['application/json'];
      let returnType = Document;
      return this.apiClient.callApi(
        '/documentSet/{setId}', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Add a new document to the set
     * Contents of the document in the body of the request. This should be in plain text. The Content-Type header should be appropriately set to text/plain.
     * @param {String} setId ID of a set
     * @param {String} body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Document}
     */
    createDocument(setId, body) {
      return this.createDocumentWithHttpInfo(setId, body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * delete document from set
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Document} and HTTP response
     */
    deleteDocumentWithHttpInfo(setId, docId) {
      let postBody = null;
      // verify the required parameter 'setId' is set
      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling deleteDocument");
      }
      // verify the required parameter 'docId' is set
      if (docId === undefined || docId === null) {
        throw new Error("Missing the required parameter 'docId' when calling deleteDocument");
      }

      let pathParams = {
        'setId': setId,
        'docId': docId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Document;
      return this.apiClient.callApi(
        '/documentSet/{setId}/{docId}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * delete document from set
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Document}
     */
    deleteDocument(setId, docId) {
      return this.deleteDocumentWithHttpInfo(setId, docId)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get document from set
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Document} and HTTP response
     */
    getDocumentWithHttpInfo(setId, docId) {
      let postBody = null;
      // verify the required parameter 'setId' is set
      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling getDocument");
      }
      // verify the required parameter 'docId' is set
      if (docId === undefined || docId === null) {
        throw new Error("Missing the required parameter 'docId' when calling getDocument");
      }

      let pathParams = {
        'setId': setId,
        'docId': docId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Document;
      return this.apiClient.callApi(
        '/documentSet/{setId}/{docId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * get document from set
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Document}
     */
    getDocument(setId, docId) {
      return this.getDocumentWithHttpInfo(setId, docId)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get original document content as plain text
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link String} and HTTP response
     */
    getOriginalContentWithHttpInfo(setId, docId) {
      let postBody = null;
      // verify the required parameter 'setId' is set
      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling getOriginalContent");
      }
      // verify the required parameter 'docId' is set
      if (docId === undefined || docId === null) {
        throw new Error("Missing the required parameter 'docId' when calling getOriginalContent");
      }

      let pathParams = {
        'setId': setId,
        'docId': docId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json'];
      let returnType = 'String';
      return this.apiClient.callApi(
        '/documentSet/{setId}/{docId}/original', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * get original document content as plain text
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link String}
     */
    getOriginalContent(setId, docId) {
      return this.getOriginalContentWithHttpInfo(setId, docId)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Get the predicted classification for the document
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/PredictedClassification} and HTTP response
     */
    getPredictedClassificationWithHttpInfo(setId, docId) {
      let postBody = null;
      // verify the required parameter 'setId' is set
      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling getPredictedClassification");
      }
      // verify the required parameter 'docId' is set
      if (docId === undefined || docId === null) {
        throw new Error("Missing the required parameter 'docId' when calling getPredictedClassification");
      }

      let pathParams = {
        'setId': setId,
        'docId': docId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = PredictedClassification;
      return this.apiClient.callApi(
        '/documentSet/{setId}/{docId}/predictedClassification', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Get the predicted classification for the document
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/PredictedClassification}
     */
    getPredictedClassification(setId, docId) {
      return this.getPredictedClassificationWithHttpInfo(setId, docId)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get redacted document content as plain text
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link String} and HTTP response
     */
    getRedactedContentWithHttpInfo(setId, docId) {
      let postBody = null;
      // verify the required parameter 'setId' is set
      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling getRedactedContent");
      }
      // verify the required parameter 'docId' is set
      if (docId === undefined || docId === null) {
        throw new Error("Missing the required parameter 'docId' when calling getRedactedContent");
      }

      let pathParams = {
        'setId': setId,
        'docId': docId
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['text/plain', 'application/json'];
      let returnType = 'String';
      return this.apiClient.callApi(
        '/documentSet/{setId}/{docId}/redacted', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * get redacted document content as plain text
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link String}
     */
    getRedactedContent(setId, docId) {
      return this.getRedactedContentWithHttpInfo(setId, docId)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
