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
import FeatureAllOf from './FeatureAllOf';
import Section from './Section';

/**
 * The Feature model module.
 * @module model/Feature
 * @version 10.0.0-multiplefileupload.0
 */
class Feature {
    /**
     * Constructs a new <code>Feature</code>.
     * @alias module:model/Feature
     * @implements module:model/Section
     * @implements module:model/FeatureAllOf
     * @param startOffset {Number} start offset of a section in characters from the beginning of the text
     * @param endOffset {Number} end offset of a section in characters from the beginning of the text
     */
    constructor(startOffset, endOffset) { 
        Section.initialize(this, startOffset, endOffset);FeatureAllOf.initialize(this);
        Feature.initialize(this, startOffset, endOffset);
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
     * Constructs a <code>Feature</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Feature} obj Optional instance to populate.
     * @return {module:model/Feature} The populated <code>Feature</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Feature();
            Section.constructFromObject(data, obj);
            FeatureAllOf.constructFromObject(data, obj);

            if (data.hasOwnProperty('startOffset')) {
                obj['startOffset'] = ApiClient.convertToType(data['startOffset'], 'Number');
            }
            if (data.hasOwnProperty('endOffset')) {
                obj['endOffset'] = ApiClient.convertToType(data['endOffset'], 'Number');
            }
            if (data.hasOwnProperty('text')) {
                obj['text'] = ApiClient.convertToType(data['text'], 'String');
            }
            if (data.hasOwnProperty('weight')) {
                obj['weight'] = ApiClient.convertToType(data['weight'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * start offset of a section in characters from the beginning of the text
 * @member {Number} startOffset
 */
Feature.prototype['startOffset'] = undefined;

/**
 * end offset of a section in characters from the beginning of the text
 * @member {Number} endOffset
 */
Feature.prototype['endOffset'] = undefined;

/**
 * textual representation of the section
 * @member {String} text
 */
Feature.prototype['text'] = undefined;

/**
 * The contribution of that feature to the classification, if positive weight, this feature contributes to a document's sensitivity and conversely
 * @member {Number} weight
 */
Feature.prototype['weight'] = undefined;


// Implement Section interface:
/**
 * start offset of a section in characters from the beginning of the text
 * @member {Number} startOffset
 */
Section.prototype['startOffset'] = undefined;
/**
 * end offset of a section in characters from the beginning of the text
 * @member {Number} endOffset
 */
Section.prototype['endOffset'] = undefined;
/**
 * textual representation of the section
 * @member {String} text
 */
Section.prototype['text'] = undefined;
// Implement FeatureAllOf interface:
/**
 * The contribution of that feature to the classification, if positive weight, this feature contributes to a document's sensitivity and conversely
 * @member {Number} weight
 */
FeatureAllOf.prototype['weight'] = undefined;




export default Feature;

