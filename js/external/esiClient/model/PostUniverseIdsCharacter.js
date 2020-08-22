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
    root.EveSwaggerInterface.PostUniverseIdsCharacter = factory(root.EveSwaggerInterface.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The PostUniverseIdsCharacter model module.
   * @module model/PostUniverseIdsCharacter
   * @version 1.3.8
   */

  /**
   * Constructs a new <code>PostUniverseIdsCharacter</code>.
   * character object
   * @alias module:model/PostUniverseIdsCharacter
   * @class
   */
  var exports = function() {
  };

  /**
   * Constructs a <code>PostUniverseIdsCharacter</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostUniverseIdsCharacter} obj Optional instance to populate.
   * @return {module:model/PostUniverseIdsCharacter} The populated <code>PostUniverseIdsCharacter</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('id'))
        obj.id = ApiClient.convertToType(data['id'], 'Number');
      if (data.hasOwnProperty('name'))
        obj.name = ApiClient.convertToType(data['name'], 'String');
    }
    return obj;
  }

  /**
   * id integer
   * @member {Number} id
   */
  exports.prototype.id = undefined;

  /**
   * name string
   * @member {String} name
   */
  exports.prototype.name = undefined;

  return exports;

}));
