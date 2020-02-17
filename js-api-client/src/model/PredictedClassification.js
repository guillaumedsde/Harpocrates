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
import PredictedClassificationExplanation from './PredictedClassificationExplanation';

/**
 * The PredictedClassification model module.
 * @module model/PredictedClassification
 * @version 9.2.0
 */
class PredictedClassification {
    /**
     * Constructs a new <code>PredictedClassification</code>.
     * The predicted Sensitivity (Sensitive or Not) of a text along with feature explanation for that classification
     * @alias module:model/PredictedClassification
     * @param sensitive {Boolean} true if the document is predicted to be sensitive, false otherwise
     */
    constructor(sensitive) { 
        
        PredictedClassification.initialize(this, sensitive);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, sensitive) { 
        obj['sensitive'] = sensitive;
    }

    /**
     * Constructs a <code>PredictedClassification</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PredictedClassification} obj Optional instance to populate.
     * @return {module:model/PredictedClassification} The populated <code>PredictedClassification</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PredictedClassification();

            if (data.hasOwnProperty('sensitive')) {
                obj['sensitive'] = ApiClient.convertToType(data['sensitive'], 'Boolean');
            }
            if (data.hasOwnProperty('sensitivity')) {
                obj['sensitivity'] = ApiClient.convertToType(data['sensitivity'], 'Number');
            }
            if (data.hasOwnProperty('classifier')) {
                obj['classifier'] = ApiClient.convertToType(data['classifier'], 'String');
            }
            if (data.hasOwnProperty('explanations')) {
                obj['explanations'] = ApiClient.convertToType(data['explanations'], [PredictedClassificationExplanation]);
            }
        }
        return obj;
    }


}

/**
 * true if the document is predicted to be sensitive, false otherwise
 * @member {Boolean} sensitive
 */
PredictedClassification.prototype['sensitive'] = undefined;

/**
 * Document sensitivity
 * @member {Number} sensitivity
 */
PredictedClassification.prototype['sensitivity'] = undefined;

/**
 * Classifier algorithm used for this classification
 * @member {String} classifier
 */
PredictedClassification.prototype['classifier'] = undefined;

/**
 * list of explanations for a predicted classification
 * @member {Array.<module:model/PredictedClassificationExplanation>} explanations
 */
PredictedClassification.prototype['explanations'] = undefined;






export default PredictedClassification;

