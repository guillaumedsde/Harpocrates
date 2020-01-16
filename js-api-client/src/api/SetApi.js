/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 5.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import DocumentSet from '../model/DocumentSet';
import DocumentSets from '../model/DocumentSets';
import Documents from '../model/Documents';
import HttpStatus from '../model/HttpStatus';

/**
* Set service.
* @module api/SetApi
* @version 5.0.0
*/
export default class SetApi {

    /**
    * Constructs a new SetApi. 
    * @alias module:api/SetApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * Add a new document set set to the engine
     * @param {module:model/DocumentSet} documentSet documentSet descriptor that needs to be added to the engine
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/DocumentSet} and HTTP response
     */
    createSetWithHttpInfo(documentSet) {
      let postBody = documentSet;
      // verify the required parameter 'documentSet' is set
      if (documentSet === undefined || documentSet === null) {
        throw new Error("Missing the required parameter 'documentSet' when calling createSet");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = DocumentSet;
      return this.apiClient.callApi(
        '/documentSet', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Add a new document set set to the engine
     * @param {module:model/DocumentSet} documentSet documentSet descriptor that needs to be added to the engine
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/DocumentSet}
     */
    createSet(documentSet) {
      return this.createSetWithHttpInfo(documentSet)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * delete the set
     * @param {String} setId ID of a set
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/DocumentSet} and HTTP response
     */
    deleteSetWithHttpInfo(setId) {
      let postBody = null;
      // verify the required parameter 'setId' is set
      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling deleteSet");
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
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = DocumentSet;
      return this.apiClient.callApi(
        '/documentSet/{setId}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * delete the set
     * @param {String} setId ID of a set
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/DocumentSet}
     */
    deleteSet(setId) {
      return this.deleteSetWithHttpInfo(setId)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * lists all documents in the set
     * @param {String} setId ID of a set
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/Documents} and HTTP response
     */
    getSetWithHttpInfo(setId) {
      let postBody = null;
      // verify the required parameter 'setId' is set
      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling getSet");
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
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = Documents;
      return this.apiClient.callApi(
        '/documentSet/{setId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * lists all documents in the set
     * @param {String} setId ID of a set
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/Documents}
     */
    getSet(setId) {
      return this.getSetWithHttpInfo(setId)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * List all document sets known by the engine
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/DocumentSets} and HTTP response
     */
    getSetsWithHttpInfo() {
      let postBody = null;

      let pathParams = {
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
      let returnType = DocumentSets;
      return this.apiClient.callApi(
        '/documentSet', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * List all document sets known by the engine
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/DocumentSets}
     */
    getSets() {
      return this.getSetsWithHttpInfo()
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
