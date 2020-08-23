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
    define(['ApiClient', 'model/PostCharactersCharacterIdMailRecipient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PostCharactersCharacterIdMailRecipient'));
  } else {
    // Browser globals (root is window)
    if (!root.EveSwaggerInterface) {
      root.EveSwaggerInterface = {};
    }
    root.EveSwaggerInterface.PostCharactersCharacterIdMailMail = factory(root.EveSwaggerInterface.ApiClient, root.EveSwaggerInterface.PostCharactersCharacterIdMailRecipient);
  }
}(this, function(ApiClient, PostCharactersCharacterIdMailRecipient) {
  'use strict';

  /**
   * The PostCharactersCharacterIdMailMail model module.
   * @module model/PostCharactersCharacterIdMailMail
   * @version 1.3.8
   */

  /**
   * Constructs a new <code>PostCharactersCharacterIdMailMail</code>.
   * mail object
   * @alias module:model/PostCharactersCharacterIdMailMail
   * @class
   * @param body {String} body string
   * @param recipients {Array.<module:model/PostCharactersCharacterIdMailRecipient>} recipients array
   * @param subject {String} subject string
   */
  var exports = function(body, recipients, subject) {
    this.body = body;
    this.recipients = recipients;
    this.subject = subject;
  };

  /**
   * Constructs a <code>PostCharactersCharacterIdMailMail</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostCharactersCharacterIdMailMail} obj Optional instance to populate.
   * @return {module:model/PostCharactersCharacterIdMailMail} The populated <code>PostCharactersCharacterIdMailMail</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      if (data.hasOwnProperty('approved_cost'))
        obj.approvedCost = ApiClient.convertToType(data['approved_cost'], 'Number');
      if (data.hasOwnProperty('body'))
        obj.body = ApiClient.convertToType(data['body'], 'String');
      if (data.hasOwnProperty('recipients'))
        obj.recipients = ApiClient.convertToType(data['recipients'], [PostCharactersCharacterIdMailRecipient]);
      if (data.hasOwnProperty('subject'))
        obj.subject = ApiClient.convertToType(data['subject'], 'String');
    }
    return obj;
  }

  /**
   * approved_cost integer
   * @member {Number} approvedCost
   * @default 0
   */
  exports.prototype.approvedCost = 0;

  /**
   * body string
   * @member {String} body
   */
  exports.prototype.body = undefined;

  /**
   * recipients array
   * @member {Array.<module:model/PostCharactersCharacterIdMailRecipient>} recipients
   */
  exports.prototype.recipients = undefined;

  /**
   * subject string
   * @member {String} subject
   */
  exports.prototype.subject = undefined;

  return exports;

}));