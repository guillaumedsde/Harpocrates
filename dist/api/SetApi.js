"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _DocumentSet = _interopRequireDefault(require("../model/DocumentSet"));

var _DocumentSets = _interopRequireDefault(require("../model/DocumentSets"));

var _Documents = _interopRequireDefault(require("../model/Documents"));

var _HttpStatus = _interopRequireDefault(require("../model/HttpStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Set service.
* @module api/SetApi
* @version 0.1.0
*/
var SetApi =
/*#__PURE__*/
function () {
  /**
  * Constructs a new SetApi. 
  * @alias module:api/SetApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function SetApi(apiClient) {
    _classCallCheck(this, SetApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * Add a new documentset set to the engine
   * @param {module:model/DocumentSet} documentSet documentSet descriptor that needs to be added to the engine
   * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/DocumentSet} and HTTP response
   */


  _createClass(SetApi, [{
    key: "createSetWithHttpInfo",
    value: function createSetWithHttpInfo(documentSet) {
      var postBody = documentSet; // verify the required parameter 'documentSet' is set

      if (documentSet === undefined || documentSet === null) {
        throw new Error("Missing the required parameter 'documentSet' when calling createSet");
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _DocumentSet["default"];
      return this.apiClient.callApi('/documentSet', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * Add a new documentset set to the engine
     * @param {module:model/DocumentSet} documentSet documentSet descriptor that needs to be added to the engine
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/DocumentSet}
     */

  }, {
    key: "createSet",
    value: function createSet(documentSet) {
      return this.createSetWithHttpInfo(documentSet).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * delete the set
     * @param {String} setId ID of a set
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/DocumentSet} and HTTP response
     */

  }, {
    key: "deleteSetWithHttpInfo",
    value: function deleteSetWithHttpInfo(setId) {
      var postBody = null; // verify the required parameter 'setId' is set

      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling deleteSet");
      }

      var pathParams = {
        'setId': setId
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _DocumentSet["default"];
      return this.apiClient.callApi('/documentSet/{setId}', 'DELETE', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * delete the set
     * @param {String} setId ID of a set
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/DocumentSet}
     */

  }, {
    key: "deleteSet",
    value: function deleteSet(setId) {
      return this.deleteSetWithHttpInfo(setId).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * lists all documents in the set
     * @param {String} setId ID of a set
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Documents} and HTTP response
     */

  }, {
    key: "getSetWithHttpInfo",
    value: function getSetWithHttpInfo(setId) {
      var postBody = null; // verify the required parameter 'setId' is set

      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling getSet");
      }

      var pathParams = {
        'setId': setId
      };
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _Documents["default"];
      return this.apiClient.callApi('/documentSet/{setId}', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * lists all documents in the set
     * @param {String} setId ID of a set
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Documents}
     */

  }, {
    key: "getSet",
    value: function getSet(setId) {
      return this.getSetWithHttpInfo(setId).then(function (response_and_data) {
        return response_and_data.data;
      });
    }
    /**
     * List all documentsets known by the engine
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/DocumentSets} and HTTP response
     */

  }, {
    key: "getSetsWithHttpInfo",
    value: function getSetsWithHttpInfo() {
      var postBody = null;
      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = [];
      var accepts = ['application/json'];
      var returnType = _DocumentSets["default"];
      return this.apiClient.callApi('/documentSet', 'GET', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null);
    }
    /**
     * List all documentsets known by the engine
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/DocumentSets}
     */

  }, {
    key: "getSets",
    value: function getSets() {
      return this.getSetsWithHttpInfo().then(function (response_and_data) {
        return response_and_data.data;
      });
    }
  }]);

  return SetApi;
}();

exports["default"] = SetApi;