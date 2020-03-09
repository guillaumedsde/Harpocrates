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
    instance = new api.TextContentApi();
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

  describe('TextContentApi', function() {
    describe('addSensitiveSection', function() {
      it('should call addSensitiveSection successfully', function(done) {
        //uncomment below and update the code to test addSensitiveSection
        //instance.addSensitiveSection(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('addSensitiveSections', function() {
      it('should call addSensitiveSections successfully', function(done) {
        //uncomment below and update the code to test addSensitiveSections
        //instance.addSensitiveSections(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getSensitiveSections', function() {
      it('should call getSensitiveSections successfully', function(done) {
        //uncomment below and update the code to test getSensitiveSections
        //instance.getSensitiveSections(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
