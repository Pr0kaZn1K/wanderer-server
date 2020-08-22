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
    root.EveSwaggerInterface.GetFwWars200Ok = factory(root.EveSwaggerInterface.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The GetFwWars200Ok model module.
   * @module model/GetFwWars200Ok
   * @version 1.3.8
   */

  /**
   * Constructs a new <code>GetFwWars200Ok</code>.
   * 200 ok object
   * @alias module:model/GetFwWars200Ok
   * @class
   * @param againstId {Number} The faction ID of the enemy faction.
   * @param factionId {Number} faction_id integer
   */
  var exports = function(againstId, factionId) {
    this.againstId = againstId;
    this.factionId = factionId;
  };

  /**
   * Constructs a <code>GetFwWars200Ok</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetFwWars200Ok} obj Optional instance to populate.
   * @return {module:model/GetFwWars200Ok} The populated <code>GetFwWars200Ok</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('against_id'))
        obj.againstId = ApiClient.convertToType(data['against_id'], 'Number');
      if (data.hasOwnProperty('faction_id'))
        obj.factionId = ApiClient.convertToType(data['faction_id'], 'Number');
    }
    return obj;
  }

  /**
   * The faction ID of the enemy faction.
   * @member {Number} againstId
   */
  exports.prototype.againstId = undefined;

  /**
   * faction_id integer
   * @member {Number} factionId
   */
  exports.prototype.factionId = undefined;

  return exports;

}));
