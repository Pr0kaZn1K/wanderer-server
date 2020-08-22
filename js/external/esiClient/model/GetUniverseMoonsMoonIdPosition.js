/*
 * EVE Swagger Interface
 * An OpenAPI for EVE Online
 *
 * OpenAPI spec version: 1.3.8
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.14
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.EveSwaggerInterface) {
      root.EveSwaggerInterface = {};
    }
    root.EveSwaggerInterface.GetUniverseMoonsMoonIdPosition = factory(root.EveSwaggerInterface.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The GetUniverseMoonsMoonIdPosition model module.
   * @module model/GetUniverseMoonsMoonIdPosition
   * @version 1.3.8
   */

  /**
   * Constructs a new <code>GetUniverseMoonsMoonIdPosition</code>.
   * position object
   * @alias module:model/GetUniverseMoonsMoonIdPosition
   * @class
   * @param x {Number} x number
   * @param y {Number} y number
   * @param z {Number} z number
   */
  var exports = function(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  };

  /**
   * Constructs a <code>GetUniverseMoonsMoonIdPosition</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetUniverseMoonsMoonIdPosition} obj Optional instance to populate.
   * @return {module:model/GetUniverseMoonsMoonIdPosition} The populated <code>GetUniverseMoonsMoonIdPosition</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('x'))
        obj.x = ApiClient.convertToType(data['x'], 'Number');
      if (data.hasOwnProperty('y'))
        obj.y = ApiClient.convertToType(data['y'], 'Number');
      if (data.hasOwnProperty('z'))
        obj.z = ApiClient.convertToType(data['z'], 'Number');
    }
    return obj;
  }

  /**
   * x number
   * @member {Number} x
   */
  exports.prototype.x = undefined;

  /**
   * y number
   * @member {Number} y
   */
  exports.prototype.y = undefined;

  /**
   * z number
   * @member {Number} z
   */
  exports.prototype.z = undefined;

  return exports;

}));
