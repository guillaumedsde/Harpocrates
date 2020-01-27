/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 8.2.0-textContentClassifications.5
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import PredictedClassification from './PredictedClassification';
import TextContent from './TextContent';

/**
 * The Document model module.
 * @module model/Document
 * @version 8.2.0-textContentClassifications.5
 */
class Document {
    /**
     * Constructs a new <code>Document</code>.
     * A document to review
     * @alias module:model/Document
     * @param documentId {String} 
     * @param textContents {Array.<module:model/TextContent>} list of textContent object representing the content of the document
     */
    constructor(documentId, textContents) { 
        
        Document.initialize(this, documentId, textContents);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, documentId, textContents) { 
        obj['documentId'] = documentId;
        obj['textContents'] = textContents;
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
            if (data.hasOwnProperty('predictedClassification')) {
                obj['predictedClassification'] = PredictedClassification.constructFromObject(data['predictedClassification']);
            }
            if (data.hasOwnProperty('textContents')) {
                obj['textContents'] = ApiClient.convertToType(data['textContents'], [TextContent]);
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
 * @member {module:model/PredictedClassification} predictedClassification
 */
Document.prototype['predictedClassification'] = undefined;

/**
 * list of textContent object representing the content of the document
 * @member {Array.<module:model/TextContent>} textContents
 */
Document.prototype['textContents'] = undefined;






export default Document;

