/**
 * Harpocrates API
 * This is the Rest API specification for the harpocrates application
 *
 * The version of the OpenAPI document: 0.2.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from './ApiClient';
import Document from './model/Document';
import DocumentSet from './model/DocumentSet';
import DocumentSets from './model/DocumentSets';
import Documents from './model/Documents';
import HttpStatus from './model/HttpStatus';
import InlineResponse200 from './model/InlineResponse200';
import PredictedClassification from './model/PredictedClassification';
import DocumentApi from './api/DocumentApi';
import SetApi from './api/SetApi';


/**
* This_is_the_Rest_API_specification_for_the_harpocrates_application.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var @HarpocratesApiClient = require('index'); // See note below*.
* var xxxSvc = new @HarpocratesApiClient.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new @HarpocratesApiClient.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new @HarpocratesApiClient.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new @HarpocratesApiClient.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 0.2.1
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The Document model constructor.
     * @property {module:model/Document}
     */
    Document,

    /**
     * The DocumentSet model constructor.
     * @property {module:model/DocumentSet}
     */
    DocumentSet,

    /**
     * The DocumentSets model constructor.
     * @property {module:model/DocumentSets}
     */
    DocumentSets,

    /**
     * The Documents model constructor.
     * @property {module:model/Documents}
     */
    Documents,

    /**
     * The HttpStatus model constructor.
     * @property {module:model/HttpStatus}
     */
    HttpStatus,

    /**
     * The InlineResponse200 model constructor.
     * @property {module:model/InlineResponse200}
     */
    InlineResponse200,

    /**
     * The PredictedClassification model constructor.
     * @property {module:model/PredictedClassification}
     */
    PredictedClassification,

    /**
    * The DocumentApi service constructor.
    * @property {module:api/DocumentApi}
    */
    DocumentApi,

    /**
    * The SetApi service constructor.
    * @property {module:api/SetApi}
    */
    SetApi
};
