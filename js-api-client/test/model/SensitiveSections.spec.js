/**
 * Harpocrates API
 * This is the Rest API specification for the Harpocrates application
 *
 * The version of the OpenAPI document: 8.1.1
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
    instance = new @HarpocratesApiClient.SensitiveSections();
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

  describe('SensitiveSections', function() {
    it('should create an instance of SensitiveSections', function() {
      // uncomment below and update the code to test SensitiveSections
      //var instane = new @HarpocratesApiClient.SensitiveSections();
      //expect(instance).to.be.a(@HarpocratesApiClient.SensitiveSections);
    });

    it('should have the property sensitiveSections (base name: "sensitiveSections")', function() {
      // uncomment below and update the code to test the property sensitiveSections
      //var instane = new @HarpocratesApiClient.SensitiveSections();
      //expect(instance).to.be();
    });

  });

}));
