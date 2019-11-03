"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The HttpStatus model module.
 * @module model/HttpStatus
 * @version 0.1.0
 */
var HttpStatus =
/*#__PURE__*/
function () {
  /**
   * Constructs a new <code>HttpStatus</code>.
   * This object describes an HTTP status
   * @alias module:model/HttpStatus
   * @param code {Number} HTTP status code
   * @param message {String} HTTP status message
   */
  function HttpStatus(code, message) {
    _classCallCheck(this, HttpStatus);

    HttpStatus.initialize(this, code, message);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(HttpStatus, null, [{
    key: "initialize",
    value: function initialize(obj, code, message) {
      obj['code'] = code;
      obj['message'] = message;
    }
    /**
     * Constructs a <code>HttpStatus</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/HttpStatus} obj Optional instance to populate.
     * @return {module:model/HttpStatus} The populated <code>HttpStatus</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new HttpStatus();

        if (data.hasOwnProperty('code')) {
          obj['code'] = _ApiClient["default"].convertToType(data['code'], 'Number');
        }

        if (data.hasOwnProperty('message')) {
          obj['message'] = _ApiClient["default"].convertToType(data['message'], 'String');
        }
      }

      return obj;
    }
  }]);

  return HttpStatus;
}();
/**
 * HTTP status code
 * @member {Number} code
 */


HttpStatus.prototype['code'] = undefined;
/**
 * HTTP status message
 * @member {String} message
 */

HttpStatus.prototype['message'] = undefined;
var _default = HttpStatus;
exports["default"] = _default;