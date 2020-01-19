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
 * The SensitiveSectionAllOf model module.
 * @module model/SensitiveSectionAllOf
 * @version 7.1.0
 */
class SensitiveSectionAllOf {
    /**
     * Constructs a new <code>SensitiveSectionAllOf</code>.
     * This is the base object for recording or suggesting sensitivities
     * @alias module:model/SensitiveSectionAllOf
     * @param name {String} what was the exemption that was found (mandatory)
     */
    constructor(name) { 
        
        SensitiveSectionAllOf.initialize(this, name);
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
     * Constructs a <code>SensitiveSectionAllOf</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SensitiveSectionAllOf} obj Optional instance to populate.
     * @return {module:model/SensitiveSectionAllOf} The populated <code>SensitiveSectionAllOf</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SensitiveSectionAllOf();

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
 * what was the exemption that was found (mandatory)
 * @member {String} name
 */
SensitiveSectionAllOf.prototype['name'] = undefined;

/**
 * This is an optional textual description of what the predicted sensitivity is, suitable for presentation to the user
 * @member {String} description
 */
SensitiveSectionAllOf.prototype['description'] = undefined;






export default SensitiveSectionAllOf;

