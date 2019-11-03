"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Document = _interopRequireDefault(require("../model/Document"));

var _HttpStatus = _interopRequireDefault(require("../model/HttpStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Document service.
* @module api/DocumentApi
* @version 0.1.0
*/
var DocumentApi =
/*#__PURE__*/
function () {
  /**
  * Constructs a new DocumentApi. 
  * @alias module:api/DocumentApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function DocumentApi(apiClient) {
    _classCallCheck(this, DocumentApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * Add a new document to the document set
   * Contents of the document in the body of the request. This should be in plain text. The Content-Type header should be appropriately set to text/plain.
   * @param {String} setId ID of a set
   * @param {String} body 
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Document} and HTTP response
   */


  _createClass(DocumentApi, [{
    key: "createDocumentWithHttpInfo",
    value: function createDocumentWithHttpInfo(setId, body) {
      var postBody = body; // verify the required parameter 'setId' is set

      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling createDocument");
      } // verify the required parameter 'body' is set


      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling createDocument");
      }

      var pathParams = {
        'setId': setId
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = ['text/plain'];
      var accepts = ['application/json'];
      var returnType = _Document["default"];
      return this.apiClient.callApi('/documentSet/{setId}', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * Add a new document to the document set
     * Contents of the document in the body of the request. This should be in plain text. The Content-Type header should be appropriately set to text/plain.
     * @param {String} setId ID of a set
     * @param {String} body 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Document}
     */

  }, {
    key: "createDocument",
    value: function createDocument(setId, body) {
      return this.createDocumentWithHttpInfo(setId, body).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * delete the set
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Document} and HTTP response
     */

  }, {
    key: "deleteDocumentWithHttpInfo",
    value: function deleteDocumentWithHttpInfo(setId, docId) {
      var postBody = null; // verify the required parameter 'setId' is set

      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling deleteDocument");
      } // verify the required parameter 'docId' is set


      if (docId === undefined || docId === null) {
        throw new Error("Missing the required parameter 'docId' when calling deleteDocument");
      }

      var pathParams = {
        'setId': setId,
        'docId': docId
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Document["default"];
      return this.apiClient.callApi('/documentSet/{setId}/{docId}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * delete the set
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Document}
     */

  }, {
    key: "deleteDocument",
    value: function deleteDocument(setId, docId) {
      return this.deleteDocumentWithHttpInfo(setId, docId).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * get document from set
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Document} and HTTP response
     */

  }, {
    key: "getDocumentWithHttpInfo",
    value: function getDocumentWithHttpInfo(setId, docId) {
      var postBody = null; // verify the required parameter 'setId' is set

      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling getDocument");
      } // verify the required parameter 'docId' is set


      if (docId === undefined || docId === null) {
        throw new Error("Missing the required parameter 'docId' when calling getDocument");
      }

      var pathParams = {
        'setId': setId,
        'docId': docId
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Document["default"];
      return this.apiClient.callApi('/documentSet/{setId}/{docId}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * get document from set
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Document}
     */

  }, {
    key: "getDocument",
    value: function getDocument(setId, docId) {
      return this.getDocumentWithHttpInfo(setId, docId).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
  }]);

  return DocumentApi;
}();

exports["default"] = DocumentApi;