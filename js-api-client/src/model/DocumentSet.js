/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 10.0.0-multiplefileupload.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The DocumentSet model module.
 * @module model/DocumentSet
 * @version 10.0.0-multiplefileupload.0
 */
class DocumentSet {
    /**
     * Constructs a new <code>DocumentSet</code>.
     * schema for a set of Documents
     * @alias module:model/DocumentSet
     * @param name {String} 
     */
    constructor(name) { 
        
        DocumentSet.initialize(this, name);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name) { 
        obj['name'] = name;
    }

    /**
     * Constructs a <code>DocumentSet</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DocumentSet} obj Optional instance to populate.
     * @return {module:model/DocumentSet} The populated <code>DocumentSet</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DocumentSet();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('setId')) {
                obj['setId'] = ApiClient.convertToType(data['setId'], 'String');
            }
            if (data.hasOwnProperty('documentCount')) {
                obj['documentCount'] = ApiClient.convertToType(data['documentCount'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * @member {String} name
 */
DocumentSet.prototype['name'] = undefined;

/**
 * @member {String} setId
 */
DocumentSet.prototype['setId'] = undefined;

/**
 * number of documents in set
 * @member {Number} documentCount
 */
DocumentSet.prototype['documentCount'] = undefined;






export default DocumentSet;

