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
    root.EveSwaggerInterface.GetAlliancesAllianceIdIconsOk = factory(root.EveSwaggerInterface.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The GetAlliancesAllianceIdIconsOk model module.
   * @module model/GetAlliancesAllianceIdIconsOk
   * @version 1.3.8
   */

  /**
   * Constructs a new <code>GetAlliancesAllianceIdIconsOk</code>.
   * 200 ok object
   * @alias module:model/GetAlliancesAllianceIdIconsOk
   * @class
   */
  var exports = function() {
  };

  /**
   * Constructs a <code>GetAlliancesAllianceIdIconsOk</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetAlliancesAllianceIdIconsOk} obj Optional instance to populate.
   * @return {module:model/GetAlliancesAllianceIdIconsOk} The populated <code>GetAlliancesAllianceIdIconsOk</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('px128x128'))
        obj.px128x128 = ApiClient.convertToType(data['px128x128'], 'String');
      if (data.hasOwnProperty('px64x64'))
        obj.px64x64 = ApiClient.convertToType(data['px64x64'], 'String');
    }
    return obj;
  }

  /**
   * px128x128 string
   * @member {String} px128x128
   */
  exports.prototype.px128x128 = undefined;

  /**
   * px64x64 string
   * @member {String} px64x64
   */
  exports.prototype.px64x64 = undefined;

  return exports;

}));
