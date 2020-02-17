/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 9.2.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The HttpStatus model module.
 * @module model/HttpStatus
 * @version 9.2.0
 */
class HttpStatus {
    /**
     * Constructs a new <code>HttpStatus</code>.
     * This object describes an HTTP status
     * @alias module:model/HttpStatus
     * @param code {Number} HTTP status code
     * @param message {String} HTTP status message
     */
    constructor(code, message) { 
        
        HttpStatus.initialize(this, code, message);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, code, message) { 
        obj['code'] = code;
        obj['message'] = message;
    }

    /**
     * Constructs a <code>HttpStatus</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/HttpStatus} obj Optional instance to populate.
     * @return {module:model/HttpStatus} The populated <code>HttpStatus</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new HttpStatus();

            if (data.hasOwnProperty('code')) {
                obj['code'] = ApiClient.convertToType(data['code'], 'Number');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
        }
        return obj;
    }


}

/**
 * HTTP status code
 * @member {Number} code
 */
HttpStatus.prototype['code'] = undefined;

/**
 * HTTP status message
 * @member {String} message
 */
HttpStatus.prototype['message'] = undefined;






export default HttpStatus;

