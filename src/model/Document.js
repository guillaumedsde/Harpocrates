/**
 * Harpocrates API
 * This is the Rest API specification for the harpocrates application
 *
 * The version of the OpenAPI document: 0.1.1-1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The Document model module.
 * @module model/Document
 * @version 0.1.1-1
 */
class Document {
    /**
     * Constructs a new <code>Document</code>.
     * A document to review
     * @alias module:model/Document
     * @param documentId {String} 
     */
    constructor(documentId) { 
        
        Document.initialize(this, documentId);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, documentId) { 
        obj['documentId'] = documentId;
    }

    /**
     * Constructs a <code>Document</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Document} obj Optional instance to populate.
     * @return {module:model/Document} The populated <code>Document</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Document();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('documentId')) {
                obj['documentId'] = ApiClient.convertToType(data['documentId'], 'String');
            }
            if (data.hasOwnProperty('content')) {
                obj['content'] = ApiClient.convertToType(data['content'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} name
 */
Document.prototype['name'] = undefined;

/**
 * @member {String} documentId
 */
Document.prototype['documentId'] = undefined;

/**
 * @member {String} content
 */
Document.prototype['content'] = undefined;






export default Document;

