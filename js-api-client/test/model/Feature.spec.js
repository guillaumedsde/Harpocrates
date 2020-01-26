/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 8.2.0-textContentClassifications.0
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
    instance = new @HarpocratesApiClient.Feature();
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

  describe('Feature', function() {
    it('should create an instance of Feature', function() {
      // uncomment below and update the code to test Feature
      //var instane = new @HarpocratesApiClient.Feature();
      //expect(instance).to.be.a(@HarpocratesApiClient.Feature);
    });

    it('should have the property startOffset (base name: "startOffset")', function() {
      // uncomment below and update the code to test the property startOffset
      //var instane = new @HarpocratesApiClient.Feature();
      //expect(instance).to.be();
    });

    it('should have the property endOffset (base name: "endOffset")', function() {
      // uncomment below and update the code to test the property endOffset
      //var instane = new @HarpocratesApiClient.Feature();
      //expect(instance).to.be();
    });

    it('should have the property text (base name: "text")', function() {
      // uncomment below and update the code to test the property text
      //var instane = new @HarpocratesApiClient.Feature();
      //expect(instance).to.be();
    });

    it('should have the property weight (base name: "weight")', function() {
      // uncomment below and update the code to test the property weight
      //var instane = new @HarpocratesApiClient.Feature();
      //expect(instance).to.be();
    });

  });

}));
