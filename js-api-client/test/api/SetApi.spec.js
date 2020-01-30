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
    instance = new @HarpocratesApiClient.SetApi();
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

  describe('SetApi', function() {
    describe('createSet', function() {
      it('should call createSet successfully', function(done) {
        //uncomment below and update the code to test createSet
        //instance.createSet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteSet', function() {
      it('should call deleteSet successfully', function(done) {
        //uncomment below and update the code to test deleteSet
        //instance.deleteSet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getSet', function() {
      it('should call getSet successfully', function(done) {
        //uncomment below and update the code to test getSet
        //instance.getSet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getSets', function() {
      it('should call getSets successfully', function(done) {
        //uncomment below and update the code to test getSets
        //instance.getSets(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
