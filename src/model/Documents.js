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

import ApiClient from '../ApiClient';
import Document from './Document';

/**
 * The Documents model module.
 * @module model/Documents
 * @version 0.2.1
 */
class Documents {
    /**
     * Constructs a new <code>Documents</code>.
     * an object representing multiple documents
     * @alias module:model/Documents
     * @param documents {Array.<module:model/Document>} array of documents
     */
    constructor(documents) { 
        
        Documents.initialize(this, documents);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, documents) { 
        obj['documents'] = documents;
    }

    /**
     * Constructs a <code>Documents</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Documents} obj Optional instance to populate.
     * @return {module:model/Documents} The populated <code>Documents</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Documents();

            if (data.hasOwnProperty('documents')) {
                obj['documents'] = ApiClient.convertToType(data['documents'], [Document]);
            }
        }
        return obj;
    }


}

/**
 * array of documents
 * @member {Array.<module:model/Document>} documents
 */
Documents.prototype['documents'] = undefined;






export default Documents;

