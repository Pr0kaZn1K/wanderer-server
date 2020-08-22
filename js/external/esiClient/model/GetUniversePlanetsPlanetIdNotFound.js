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
    root.EveSwaggerInterface.GetUniversePlanetsPlanetIdNotFound = factory(root.EveSwaggerInterface.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The GetUniversePlanetsPlanetIdNotFound model module.
   * @module model/GetUniversePlanetsPlanetIdNotFound
   * @version 1.3.8
   */

  /**
   * Constructs a new <code>GetUniversePlanetsPlanetIdNotFound</code>.
   * Not found
   * @alias module:model/GetUniversePlanetsPlanetIdNotFound
   * @class
   */
  var exports = function() {
  };

  /**
   * Constructs a <code>GetUniversePlanetsPlanetIdNotFound</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetUniversePlanetsPlanetIdNotFound} obj Optional instance to populate.
   * @return {module:model/GetUniversePlanetsPlanetIdNotFound} The populated <code>GetUniversePlanetsPlanetIdNotFound</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('error'))
        obj.error = ApiClient.convertToType(data['error'], 'String');
    }
    return obj;
  }

  /**
   * Not found message
   * @member {String} error
   */
  exports.prototype.error = undefined;

  return exports;

}));
