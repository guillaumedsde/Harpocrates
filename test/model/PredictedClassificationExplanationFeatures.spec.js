/**
 * Harpocrates API
 * This is the Rest API specification for the harpocrates application
 *
 * The version of the OpenAPI document: 0.2.2
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
    factory(root.expect, root.@HarpocratesApiClient);
  }
}(this, function(expect, @HarpocratesApiClient) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new @HarpocratesApiClient.PredictedClassificationExplanationFeatures();
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

  describe('PredictedClassificationExplanationFeatures', function() {
    it('should create an instance of PredictedClassificationExplanationFeatures', function() {
      // uncomment below and update the code to test PredictedClassificationExplanationFeatures
      //var instane = new @HarpocratesApiClient.PredictedClassificationExplanationFeatures();
      //expect(instance).to.be.a(@HarpocratesApiClient.PredictedClassificationExplanationFeatures);
    });

    it('should have the property feature (base name: "feature")', function() {
      // uncomment below and update the code to test the property feature
      //var instane = new @HarpocratesApiClient.PredictedClassificationExplanationFeatures();
      //expect(instance).to.be();
    });

    it('should have the property weight (base name: "weight")', function() {
      // uncomment below and update the code to test the property weight
      //var instane = new @HarpocratesApiClient.PredictedClassificationExplanationFeatures();
      //expect(instance).to.be();
    });

  });

}));
