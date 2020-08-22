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
    define(['ApiClient', 'model/GetFwLeaderboardsKills', 'model/GetFwLeaderboardsVictoryPoints'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GetFwLeaderboardsKills'), require('./GetFwLeaderboardsVictoryPoints'));
  } else {
    // Browser globals (root is window)
    if (!root.EveSwaggerInterface) {
      root.EveSwaggerInterface = {};
    }
    root.EveSwaggerInterface.GetFwLeaderboardsOk = factory(root.EveSwaggerInterface.ApiClient, root.EveSwaggerInterface.GetFwLeaderboardsKills, root.EveSwaggerInterface.GetFwLeaderboardsVictoryPoints);
  }
}(this, function(ApiClient, GetFwLeaderboardsKills, GetFwLeaderboardsVictoryPoints) {
  'use strict';

  /**
   * The GetFwLeaderboardsOk model module.
   * @module model/GetFwLeaderboardsOk
   * @version 1.3.8
   */

  /**
   * Constructs a new <code>GetFwLeaderboardsOk</code>.
   * 200 ok object
   * @alias module:model/GetFwLeaderboardsOk
   * @class
   * @param kills {module:model/GetFwLeaderboardsKills} 
   * @param victoryPoints {module:model/GetFwLeaderboardsVictoryPoints} 
   */
  var exports = function(kills, victoryPoints) {
    this.kills = kills;
    this.victoryPoints = victoryPoints;
  };

  /**
   * Constructs a <code>GetFwLeaderboardsOk</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetFwLeaderboardsOk} obj Optional instance to populate.
   * @return {module:model/GetFwLeaderboardsOk} The populated <code>GetFwLeaderboardsOk</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('kills'))
        obj.kills = GetFwLeaderboardsKills.constructFromObject(data['kills']);
      if (data.hasOwnProperty('victory_points'))
        obj.victoryPoints = GetFwLeaderboardsVictoryPoints.constructFromObject(data['victory_points']);
    }
    return obj;
  }

  /**
   * @member {module:model/GetFwLeaderboardsKills} kills
   */
  exports.prototype.kills = undefined;

  /**
   * @member {module:model/GetFwLeaderboardsVictoryPoints} victoryPoints
   */
  exports.prototype.victoryPoints = undefined;

  return exports;

}));
