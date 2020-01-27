/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 8.2.0-textContentClassifications.3
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import HttpStatus from '../model/HttpStatus';
import SensitiveSection from '../model/SensitiveSection';
import SensitiveSections from '../model/SensitiveSections';

/**
* TextContent service.
* @module api/TextContentApi
* @version 8.2.0-textContentClassifications.3
*/
export default class TextContentApi {

    /**
    * Constructs a new TextContentApi. 
    * @alias module:api/TextContentApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * add a sensitive section to the document
     * add a sensitive section to the document
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @param {Number} textContentIndex Index of the position of a TextContent object in the list of TextContent objects making up the document
     * @param {Object} opts Optional parameters
     * @param {module:model/SensitiveSection} opts.sensitiveSection 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/SensitiveSection} and HTTP response
     */
    addSensitiveSectionWithHttpInfo(setId, docId, textContentIndex, opts) {
      opts = opts || {};
      let postBody = opts['sensitiveSection'];
      // verify the required parameter 'setId' is set
      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling addSensitiveSection");
      }
      // verify the required parameter 'docId' is set
      if (docId === undefined || docId === null) {
        throw new Error("Missing the required parameter 'docId' when calling addSensitiveSection");
      }
      // verify the required parameter 'textContentIndex' is set
      if (textContentIndex === undefined || textContentIndex === null) {
        throw new Error("Missing the required parameter 'textContentIndex' when calling addSensitiveSection");
      }

      let pathParams = {
        'setId': setId,
        'docId': docId,
        'textContentIndex': textContentIndex
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
      let returnType = SensitiveSection;
      return this.apiClient.callApi(
        '/documentSet/{setId}/{docId}/{textContentIndex}/sensitiveSections', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * add a sensitive section to the document
     * add a sensitive section to the document
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @param {Number} textContentIndex Index of the position of a TextContent object in the list of TextContent objects making up the document
     * @param {Object} opts Optional parameters
     * @param {module:model/SensitiveSection} opts.sensitiveSection 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/SensitiveSection}
     */
    addSensitiveSection(setId, docId, textContentIndex, opts) {
      return this.addSensitiveSectionWithHttpInfo(setId, docId, textContentIndex, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * Overwrite the sensitive sections of a TextContent object
     * Overwrite the sensitive sections of a TextContent object
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @param {Number} textContentIndex Index of the position of a TextContent object in the list of TextContent objects making up the document
     * @param {Object} opts Optional parameters
     * @param {module:model/SensitiveSections} opts.sensitiveSections 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/SensitiveSections} and HTTP response
     */
    addSensitiveSectionsWithHttpInfo(setId, docId, textContentIndex, opts) {
      opts = opts || {};
      let postBody = opts['sensitiveSections'];
      // verify the required parameter 'setId' is set
      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling addSensitiveSections");
      }
      // verify the required parameter 'docId' is set
      if (docId === undefined || docId === null) {
        throw new Error("Missing the required parameter 'docId' when calling addSensitiveSections");
      }
      // verify the required parameter 'textContentIndex' is set
      if (textContentIndex === undefined || textContentIndex === null) {
        throw new Error("Missing the required parameter 'textContentIndex' when calling addSensitiveSections");
      }

      let pathParams = {
        'setId': setId,
        'docId': docId,
        'textContentIndex': textContentIndex
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
      let returnType = SensitiveSections;
      return this.apiClient.callApi(
        '/documentSet/{setId}/{docId}/{textContentIndex}/sensitiveSections', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * Overwrite the sensitive sections of a TextContent object
     * Overwrite the sensitive sections of a TextContent object
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @param {Number} textContentIndex Index of the position of a TextContent object in the list of TextContent objects making up the document
     * @param {Object} opts Optional parameters
     * @param {module:model/SensitiveSections} opts.sensitiveSections 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/SensitiveSections}
     */
    addSensitiveSections(setId, docId, textContentIndex, opts) {
      return this.addSensitiveSectionsWithHttpInfo(setId, docId, textContentIndex, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * get sensitive sections of a TextContent object
     * get sensitive sections of a TextContent object
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @param {Number} textContentIndex Index of the position of a TextContent object in the list of TextContent objects making up the document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/SensitiveSections} and HTTP response
     */
    getSensitiveSectionsWithHttpInfo(setId, docId, textContentIndex) {
      let postBody = null;
      // verify the required parameter 'setId' is set
      if (setId === undefined || setId === null) {
        throw new Error("Missing the required parameter 'setId' when calling getSensitiveSections");
      }
      // verify the required parameter 'docId' is set
      if (docId === undefined || docId === null) {
        throw new Error("Missing the required parameter 'docId' when calling getSensitiveSections");
      }
      // verify the required parameter 'textContentIndex' is set
      if (textContentIndex === undefined || textContentIndex === null) {
        throw new Error("Missing the required parameter 'textContentIndex' when calling getSensitiveSections");
      }

      let pathParams = {
        'setId': setId,
        'docId': docId,
        'textContentIndex': textContentIndex
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
      let returnType = SensitiveSections;
      return this.apiClient.callApi(
        '/documentSet/{setId}/{docId}/{textContentIndex}/sensitiveSections', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null
      );
    }

    /**
     * get sensitive sections of a TextContent object
     * get sensitive sections of a TextContent object
     * @param {String} setId ID of a set
     * @param {String} docId ID of a document
     * @param {Number} textContentIndex Index of the position of a TextContent object in the list of TextContent objects making up the document
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/SensitiveSections}
     */
    getSensitiveSections(setId, docId, textContentIndex) {
      return this.getSensitiveSectionsWithHttpInfo(setId, docId, textContentIndex)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
