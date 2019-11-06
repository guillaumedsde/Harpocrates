/**
 * Harpocrates API
 * This is the Rest API specification for the harpocrates application
 *
 * The version of the OpenAPI document: 1.0.1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Feature from './Feature';
import PredictedClassification from './PredictedClassification';
import PredictedClassificationWithExplanationAllOf from './PredictedClassificationWithExplanationAllOf';

/**
 * The PredictedClassificationWithExplanation model module.
 * @module model/PredictedClassificationWithExplanation
 * @version 1.0.1
 */
class PredictedClassificationWithExplanation {
    /**
     * Constructs a new <code>PredictedClassificationWithExplanation</code>.
     * @alias module:model/PredictedClassificationWithExplanation
     * @implements module:model/PredictedClassification
     * @implements module:model/PredictedClassificationWithExplanationAllOf
     * @param sensitive {Boolean} true if the document is predicted to be sensitive, false otherwise
     */
    constructor(sensitive) { 
        PredictedClassification.initialize(this, sensitive);PredictedClassificationWithExplanationAllOf.initialize(this);
        PredictedClassificationWithExplanation.initialize(this, sensitive);
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
     * Constructs a <code>PredictedClassificationWithExplanation</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PredictedClassificationWithExplanation} obj Optional instance to populate.
     * @return {module:model/PredictedClassificationWithExplanation} The populated <code>PredictedClassificationWithExplanation</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PredictedClassificationWithExplanation();
            PredictedClassification.constructFromObject(data, obj);
            PredictedClassificationWithExplanationAllOf.constructFromObject(data, obj);

            if (data.hasOwnProperty('sensitive')) {
                obj['sensitive'] = ApiClient.convertToType(data['sensitive'], 'Boolean');
            }
            if (data.hasOwnProperty('sensitivity')) {
                obj['sensitivity'] = ApiClient.convertToType(data['sensitivity'], 'Number');
            }
            if (data.hasOwnProperty('sensitiveFeatures')) {
                obj['sensitiveFeatures'] = ApiClient.convertToType(data['sensitiveFeatures'], [Feature]);
            }
            if (data.hasOwnProperty('nonSensitiveFeatures')) {
                obj['nonSensitiveFeatures'] = ApiClient.convertToType(data['nonSensitiveFeatures'], [Feature]);
            }
        }
        return obj;
    }


}

/**
 * true if the document is predicted to be sensitive, false otherwise
 * @member {Boolean} sensitive
 */
PredictedClassificationWithExplanation.prototype['sensitive'] = undefined;

/**
 * Document sensitivity percentage
 * @member {Number} sensitivity
 */
PredictedClassificationWithExplanation.prototype['sensitivity'] = undefined;

/**
 * The explanation for the \"sensitive\" classification of a document as an array of features and their contribution to the explanation
 * @member {Array.<module:model/Feature>} sensitiveFeatures
 */
PredictedClassificationWithExplanation.prototype['sensitiveFeatures'] = undefined;

/**
 * The explanation for the \"non sensitive\" classification of a document as an array of features and their contribution to the explanation
 * @member {Array.<module:model/Feature>} nonSensitiveFeatures
 */
PredictedClassificationWithExplanation.prototype['nonSensitiveFeatures'] = undefined;


// Implement PredictedClassification interface:
/**
 * true if the document is predicted to be sensitive, false otherwise
 * @member {Boolean} sensitive
 */
PredictedClassification.prototype['sensitive'] = undefined;
/**
 * Document sensitivity percentage
 * @member {Number} sensitivity
 */
PredictedClassification.prototype['sensitivity'] = undefined;
// Implement PredictedClassificationWithExplanationAllOf interface:
/**
 * The explanation for the \"sensitive\" classification of a document as an array of features and their contribution to the explanation
 * @member {Array.<module:model/Feature>} sensitiveFeatures
 */
PredictedClassificationWithExplanationAllOf.prototype['sensitiveFeatures'] = undefined;
/**
 * The explanation for the \"non sensitive\" classification of a document as an array of features and their contribution to the explanation
 * @member {Array.<module:model/Feature>} nonSensitiveFeatures
 */
PredictedClassificationWithExplanationAllOf.prototype['nonSensitiveFeatures'] = undefined;




export default PredictedClassificationWithExplanation;

