/**
 * REST API for predictive analtyics
 * This is an API for predictive analytics engines
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import DocumentSet from './DocumentSet';

/**
 * The DocumentSets model module.
 * @module model/DocumentSets
 * @version 0.1.0
 */
class DocumentSets {
    /**
     * Constructs a new <code>DocumentSets</code>.
     * an object representing multiple document sets
     * @alias module:model/DocumentSets
     * @param documentSets {Array.<module:model/DocumentSet>} array of document sets
     */
    constructor(documentSets) { 
        
        DocumentSets.initialize(this, documentSets);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, documentSets) { 
        obj['documentSets'] = documentSets;
    }

    /**
     * Constructs a <code>DocumentSets</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DocumentSets} obj Optional instance to populate.
     * @return {module:model/DocumentSets} The populated <code>DocumentSets</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DocumentSets();

            if (data.hasOwnProperty('documentSets')) {
                obj['documentSets'] = ApiClient.convertToType(data['documentSets'], [DocumentSet]);
            }
        }
        return obj;
    }


}

/**
 * array of document sets
 * @member {Array.<module:model/DocumentSet>} documentSets
 */
DocumentSets.prototype['documentSets'] = undefined;






export default DocumentSets;

