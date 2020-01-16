/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 6.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Section from './Section';
import SensitiveSectionAllOf from './SensitiveSectionAllOf';

/**
 * The SensitiveSection model module.
 * @module model/SensitiveSection
 * @version 6.0.0
 */
class SensitiveSection {
    /**
     * Constructs a new <code>SensitiveSection</code>.
     * @alias module:model/SensitiveSection
     * @implements module:model/Section
     * @implements module:model/SensitiveSectionAllOf
     * @param startOffset {Number} start offset of a section in characters from the beginning of the document
     * @param endOffset {Number} end offset of a section in characters from the beginning of the document
     * @param name {String} what was the exemption that was found (mandatory)
     */
    constructor(startOffset, endOffset, name) { 
        Section.initialize(this, startOffset, endOffset);SensitiveSectionAllOf.initialize(this, name);
        SensitiveSection.initialize(this, startOffset, endOffset, name);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, startOffset, endOffset, name) { 
        obj['startOffset'] = startOffset;
        obj['endOffset'] = endOffset;
        obj['name'] = name;
    }

    /**
     * Constructs a <code>SensitiveSection</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SensitiveSection} obj Optional instance to populate.
     * @return {module:model/SensitiveSection} The populated <code>SensitiveSection</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SensitiveSection();
            Section.constructFromObject(data, obj);
            SensitiveSectionAllOf.constructFromObject(data, obj);

            if (data.hasOwnProperty('startOffset')) {
                obj['startOffset'] = ApiClient.convertToType(data['startOffset'], 'Number');
            }
            if (data.hasOwnProperty('endOffset')) {
                obj['endOffset'] = ApiClient.convertToType(data['endOffset'], 'Number');
            }
            if (data.hasOwnProperty('text')) {
                obj['text'] = ApiClient.convertToType(data['text'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
        }
        return obj;
    }


}

/**
 * start offset of a section in characters from the beginning of the document
 * @member {Number} startOffset
 */
SensitiveSection.prototype['startOffset'] = undefined;

/**
 * end offset of a section in characters from the beginning of the document
 * @member {Number} endOffset
 */
SensitiveSection.prototype['endOffset'] = undefined;

/**
 * textual representation of the section
 * @member {String} text
 */
SensitiveSection.prototype['text'] = undefined;

/**
 * what was the exemption that was found (mandatory)
 * @member {String} name
 */
SensitiveSection.prototype['name'] = undefined;

/**
 * This is an optional textual description of what the predicted sensitivity is, suitable for presentation to the user
 * @member {String} description
 */
SensitiveSection.prototype['description'] = undefined;


// Implement Section interface:
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
// Implement SensitiveSectionAllOf interface:
/**
 * what was the exemption that was found (mandatory)
 * @member {String} name
 */
SensitiveSectionAllOf.prototype['name'] = undefined;
/**
 * This is an optional textual description of what the predicted sensitivity is, suitable for presentation to the user
 * @member {String} description
 */
SensitiveSectionAllOf.prototype['description'] = undefined;




export default SensitiveSection;

