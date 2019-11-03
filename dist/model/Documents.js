"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Document = _interopRequireDefault(require("./Document"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Documents model module.
 * @module model/Documents
 * @version 0.1.0
 */
var Documents =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>Documents</code>.
   * an object representing multiple documents
   * @alias module:model/Documents
   * @param documents {Array.<module:model/Document>} array of documents
   */
  function Documents(documents) {
    _classCallCheck(this, Documents);

    Documents.initialize(this, documents);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Documents, null, [{
    key: "initialize",
    value: function initialize(obj, documents) {
      obj['documents'] = documents;
    }
    /**
     * Constructs a <code>Documents</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Documents} obj Optional instance to populate.
     * @return {module:model/Documents} The populated <code>Documents</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Documents();

        if (data.hasOwnProperty('documents')) {
          obj['documents'] = _ApiClient["default"].convertToType(data['documents'], [_Document["default"]]);
        }
      }

      return obj;
    }
  }]);

  return Documents;
}();
/**
 * array of documents
 * @member {Array.<module:model/Document>} documents
 */


Documents.prototype['documents'] = undefined;
var _default = Documents;
exports["default"] = _default;