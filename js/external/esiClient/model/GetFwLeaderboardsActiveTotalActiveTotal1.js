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
    root.EveSwaggerInterface.GetFwLeaderboardsActiveTotalActiveTotal1 = factory(root.EveSwaggerInterface.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * The GetFwLeaderboardsActiveTotalActiveTotal1 model module.
   * @module model/GetFwLeaderboardsActiveTotalActiveTotal1
   * @version 1.3.8
   */

  /**
   * Constructs a new <code>GetFwLeaderboardsActiveTotalActiveTotal1</code>.
   * active_total object
   * @alias module:model/GetFwLeaderboardsActiveTotalActiveTotal1
   * @class
   */
  var exports = function() {
  };

  /**
   * Constructs a <code>GetFwLeaderboardsActiveTotalActiveTotal1</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetFwLeaderboardsActiveTotalActiveTotal1} obj Optional instance to populate.
   * @return {module:model/GetFwLeaderboardsActiveTotalActiveTotal1} The populated <code>GetFwLeaderboardsActiveTotalActiveTotal1</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('amount'))
        obj.amount = ApiClient.convertToType(data['amount'], 'Number');
      if (data.hasOwnProperty('faction_id'))
        obj.factionId = ApiClient.convertToType(data['faction_id'], 'Number');
    }
    return obj;
  }

  /**
   * Amount of victory points
   * @member {Number} amount
   */
  exports.prototype.amount = undefined;

  /**
   * faction_id integer
   * @member {Number} factionId
   */
  exports.prototype.factionId = undefined;

  return exports;

}));
