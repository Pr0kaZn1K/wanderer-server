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
    define(['ApiClient', 'model/GetFwLeaderboardsCharactersActiveTotalActiveTotal', 'model/GetFwLeaderboardsCharactersLastWeekLastWeek', 'model/GetFwLeaderboardsCharactersYesterdayYesterday'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GetFwLeaderboardsCharactersActiveTotalActiveTotal'), require('./GetFwLeaderboardsCharactersLastWeekLastWeek'), require('./GetFwLeaderboardsCharactersYesterdayYesterday'));
  } else {
    // Browser globals (root is window)
    if (!root.EveSwaggerInterface) {
      root.EveSwaggerInterface = {};
    }
    root.EveSwaggerInterface.GetFwLeaderboardsCharactersKills = factory(root.EveSwaggerInterface.ApiClient, root.EveSwaggerInterface.GetFwLeaderboardsCharactersActiveTotalActiveTotal, root.EveSwaggerInterface.GetFwLeaderboardsCharactersLastWeekLastWeek, root.EveSwaggerInterface.GetFwLeaderboardsCharactersYesterdayYesterday);
  }
}(this, function(ApiClient, GetFwLeaderboardsCharactersActiveTotalActiveTotal, GetFwLeaderboardsCharactersLastWeekLastWeek, GetFwLeaderboardsCharactersYesterdayYesterday) {
  'use strict';

  /**
   * The GetFwLeaderboardsCharactersKills model module.
   * @module model/GetFwLeaderboardsCharactersKills
   * @version 1.3.8
   */

  /**
   * Constructs a new <code>GetFwLeaderboardsCharactersKills</code>.
   * Top 100 rankings of pilots by number of kills from yesterday, last week and in total
   * @alias module:model/GetFwLeaderboardsCharactersKills
   * @class
   * @param activeTotal {Array.<module:model/GetFwLeaderboardsCharactersActiveTotalActiveTotal>} Top 100 ranking of pilots active in faction warfare by total kills. A pilot is considered \"active\" if they have participated in faction warfare in the past 14 days
   * @param lastWeek {Array.<module:model/GetFwLeaderboardsCharactersLastWeekLastWeek>} Top 100 ranking of pilots by kills in the past week
   * @param yesterday {Array.<module:model/GetFwLeaderboardsCharactersYesterdayYesterday>} Top 100 ranking of pilots by kills in the past day
   */
  var exports = function(activeTotal, lastWeek, yesterday) {
    this.activeTotal = activeTotal;
    this.lastWeek = lastWeek;
    this.yesterday = yesterday;
  };

  /**
   * Constructs a <code>GetFwLeaderboardsCharactersKills</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetFwLeaderboardsCharactersKills} obj Optional instance to populate.
   * @return {module:model/GetFwLeaderboardsCharactersKills} The populated <code>GetFwLeaderboardsCharactersKills</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('active_total'))
        obj.activeTotal = ApiClient.convertToType(data['active_total'], [GetFwLeaderboardsCharactersActiveTotalActiveTotal]);
      if (data.hasOwnProperty('last_week'))
        obj.lastWeek = ApiClient.convertToType(data['last_week'], [GetFwLeaderboardsCharactersLastWeekLastWeek]);
      if (data.hasOwnProperty('yesterday'))
        obj.yesterday = ApiClient.convertToType(data['yesterday'], [GetFwLeaderboardsCharactersYesterdayYesterday]);
    }
    return obj;
  }

  /**
   * Top 100 ranking of pilots active in faction warfare by total kills. A pilot is considered \"active\" if they have participated in faction warfare in the past 14 days
   * @member {Array.<module:model/GetFwLeaderboardsCharactersActiveTotalActiveTotal>} activeTotal
   */
  exports.prototype.activeTotal = undefined;

  /**
   * Top 100 ranking of pilots by kills in the past week
   * @member {Array.<module:model/GetFwLeaderboardsCharactersLastWeekLastWeek>} lastWeek
   */
  exports.prototype.lastWeek = undefined;

  /**
   * Top 100 ranking of pilots by kills in the past day
   * @member {Array.<module:model/GetFwLeaderboardsCharactersYesterdayYesterday>} yesterday
   */
  exports.prototype.yesterday = undefined;

  return exports;

}));
