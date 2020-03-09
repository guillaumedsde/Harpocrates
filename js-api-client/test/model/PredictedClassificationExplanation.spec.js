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

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.api);
  }
}(this, function(expect, api) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new api.PredictedClassificationExplanation();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('PredictedClassificationExplanation', function() {
    it('should create an instance of PredictedClassificationExplanation', function() {
      // uncomment below and update the code to test PredictedClassificationExplanation
      //var instane = new api.PredictedClassificationExplanation();
      //expect(instance).to.be.a(api.PredictedClassificationExplanation);
    });

    it('should have the property features (base name: "features")', function() {
      // uncomment below and update the code to test the property features
      //var instane = new api.PredictedClassificationExplanation();
      //expect(instance).to.be();
    });

    it('should have the property explainer (base name: "explainer")', function() {
      // uncomment below and update the code to test the property explainer
      //var instane = new api.PredictedClassificationExplanation();
      //expect(instance).to.be();
    });

  });

}));
