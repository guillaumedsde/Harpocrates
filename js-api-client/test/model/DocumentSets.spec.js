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
    instance = new @HarpocratesApiClient.DocumentSets();
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

  describe('DocumentSets', function() {
    it('should create an instance of DocumentSets', function() {
      // uncomment below and update the code to test DocumentSets
      //var instane = new @HarpocratesApiClient.DocumentSets();
      //expect(instance).to.be.a(@HarpocratesApiClient.DocumentSets);
    });

    it('should have the property documentSets (base name: "documentSets")', function() {
      // uncomment below and update the code to test the property documentSets
      //var instane = new @HarpocratesApiClient.DocumentSets();
      //expect(instance).to.be();
    });

  });

}));
