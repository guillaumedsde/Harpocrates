/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 4.2.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import SensitiveSection from './SensitiveSection';

/**
 * The SensitiveSections model module.
 * @module model/SensitiveSections
 * @version 4.2.0
 */
class SensitiveSections {
    /**
     * Constructs a new <code>SensitiveSections</code>.
     * an object representing multiple sensitive sections
     * @alias module:model/SensitiveSections
     * @param sensitiveSections {Array.<module:model/SensitiveSection>} array of sensitive sections
     */
    constructor(sensitiveSections) { 
        
        SensitiveSections.initialize(this, sensitiveSections);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, sensitiveSections) { 
        obj['sensitiveSections'] = sensitiveSections;
    }

    /**
     * Constructs a <code>SensitiveSections</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SensitiveSections} obj Optional instance to populate.
     * @return {module:model/SensitiveSections} The populated <code>SensitiveSections</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SensitiveSections();

            if (data.hasOwnProperty('sensitiveSections')) {
                obj['sensitiveSections'] = ApiClient.convertToType(data['sensitiveSections'], [SensitiveSection]);
            }
        }
        return obj;
    }


}

/**
 * array of sensitive sections
 * @member {Array.<module:model/SensitiveSection>} sensitiveSections
 */
SensitiveSections.prototype['sensitiveSections'] = undefined;






export default SensitiveSections;

