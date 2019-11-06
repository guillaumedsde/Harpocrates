/**
 * Harpocrates API
 * This is the Rest API specification for the harpocrates application
 *
 * The version of the OpenAPI document: 0.3.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import PredictedClassificationExplanationFeatures from './PredictedClassificationExplanationFeatures';

/**
 * The PredictedClassificationExplanation model module.
 * @module model/PredictedClassificationExplanation
 * @version 0.3.0
 */
class PredictedClassificationExplanation {
    /**
     * Constructs a new <code>PredictedClassificationExplanation</code>.
     * Object representing an explanation for a sensitivity prediction
     * @alias module:model/PredictedClassificationExplanation
     */
    constructor() { 
        
        PredictedClassificationExplanation.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>PredictedClassificationExplanation</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PredictedClassificationExplanation} obj Optional instance to populate.
     * @return {module:model/PredictedClassificationExplanation} The populated <code>PredictedClassificationExplanation</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PredictedClassificationExplanation();

            if (data.hasOwnProperty('features')) {
                obj['features'] = ApiClient.convertToType(data['features'], [PredictedClassificationExplanationFeatures]);
            }
        }
        return obj;
    }


}

/**
 * The explanation for the predicted sensitivity classification of a document as an array of features and their contribution to the explanation
 * @member {Array.<module:model/PredictedClassificationExplanationFeatures>} features
 */
PredictedClassificationExplanation.prototype['features'] = undefined;






export default PredictedClassificationExplanation;

