/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 7.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The Section model module.
 * @module model/Section
 * @version 7.1.0
 */
class Section {
    /**
     * Constructs a new <code>Section</code>.
     * Section of characters within a document
     * @alias module:model/Section
     * @param startOffset {Number} start offset of a section in characters from the beginning of the document
     * @param endOffset {Number} end offset of a section in characters from the beginning of the document
     */
    constructor(startOffset, endOffset) { 
        
        Section.initialize(this, startOffset, endOffset);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, startOffset, endOffset) { 
        obj['startOffset'] = startOffset;
        obj['endOffset'] = endOffset;
    }

    /**
     * Constructs a <code>Section</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Section} obj Optional instance to populate.
     * @return {module:model/Section} The populated <code>Section</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Section();

            if (data.hasOwnProperty('startOffset')) {
                obj['startOffset'] = ApiClient.convertToType(data['startOffset'], 'Number');
            }
            if (data.hasOwnProperty('endOffset')) {
                obj['endOffset'] = ApiClient.convertToType(data['endOffset'], 'Number');
            }
            if (data.hasOwnProperty('text')) {
                obj['text'] = ApiClient.convertToType(data['text'], 'String');
            }
        }
        return obj;
    }


}

/**
 * start offset of a section in characters from the beginning of the document
 * @member {Number} startOffset
 */
Section.prototype['startOffset'] = undefined;

/**
 * end offset of a section in characters from the beginning of the document
 * @member {Number} endOffset
 */
Section.prototype['endOffset'] = undefined;

/**
 * textual representation of the section
 * @member {String} text
 */
Section.prototype['text'] = undefined;






export default Section;

