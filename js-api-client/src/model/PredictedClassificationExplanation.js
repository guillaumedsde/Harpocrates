/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 9.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Feature from './Feature';

/**
 * The PredictedClassificationExplanation model module.
 * @module model/PredictedClassificationExplanation
 * @version 9.1.0
 */
class PredictedClassificationExplanation {
    /**
     * Constructs a new <code>PredictedClassificationExplanation</code>.
     * Explanation for a predicted classification
     * @alias module:model/PredictedClassificationExplanation
     * @param features {Array.<module:model/Feature>} List of features with weights explaining a text's classification
     * @param explainer {String} Explainer used to obtain explanation
     */
    constructor(features, explainer) { 
        
        PredictedClassificationExplanation.initialize(this, features, explainer);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, features, explainer) { 
        obj['features'] = features;
        obj['explainer'] = explainer;
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
                obj['features'] = ApiClient.convertToType(data['features'], [Feature]);
            }
            if (data.hasOwnProperty('explainer')) {
                obj['explainer'] = ApiClient.convertToType(data['explainer'], 'String');
            }
        }
        return obj;
    }


}

/**
 * List of features with weights explaining a text's classification
 * @member {Array.<module:model/Feature>} features
 */
PredictedClassificationExplanation.prototype['features'] = undefined;

/**
 * Explainer used to obtain explanation
 * @member {String} explainer
 */
PredictedClassificationExplanation.prototype['explainer'] = undefined;






export default PredictedClassificationExplanation;

