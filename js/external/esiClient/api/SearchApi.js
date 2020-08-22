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
    define(['ApiClient', 'model/BadRequest', 'model/ErrorLimited', 'model/Forbidden', 'model/GatewayTimeout', 'model/GetCharactersCharacterIdSearchOk', 'model/GetSearchOk', 'model/InternalServerError', 'model/ServiceUnavailable', 'model/Unauthorized'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/BadRequest'), require('../model/ErrorLimited'), require('../model/Forbidden'), require('../model/GatewayTimeout'), require('../model/GetCharactersCharacterIdSearchOk'), require('../model/GetSearchOk'), require('../model/InternalServerError'), require('../model/ServiceUnavailable'), require('../model/Unauthorized'));
  } else {
    // Browser globals (root is window)
    if (!root.EveSwaggerInterface) {
      root.EveSwaggerInterface = {};
    }
    root.EveSwaggerInterface.SearchApi = factory(root.EveSwaggerInterface.ApiClient, root.EveSwaggerInterface.BadRequest, root.EveSwaggerInterface.ErrorLimited, root.EveSwaggerInterface.Forbidden, root.EveSwaggerInterface.GatewayTimeout, root.EveSwaggerInterface.GetCharactersCharacterIdSearchOk, root.EveSwaggerInterface.GetSearchOk, root.EveSwaggerInterface.InternalServerError, root.EveSwaggerInterface.ServiceUnavailable, root.EveSwaggerInterface.Unauthorized);
  }
}(this, function(ApiClient, BadRequest, ErrorLimited, Forbidden, GatewayTimeout, GetCharactersCharacterIdSearchOk, GetSearchOk, InternalServerError, ServiceUnavailable, Unauthorized) {
  'use strict';

  /**
   * Search service.
   * @module api/SearchApi
   * @version 1.3.8
   */

  /**
   * Constructs a new SearchApi. 
   * @alias module:api/SearchApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getCharactersCharacterIdSearch operation.
     * @callback module:api/SearchApi~getCharactersCharacterIdSearchCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCharactersCharacterIdSearchOk} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Search on a string
     * Search for entities that match a given sub-string.  --- Alternate route: `/dev/characters/{character_id}/search/`  Alternate route: `/legacy/characters/{character_id}/search/`  Alternate route: `/v3/characters/{character_id}/search/`  --- This route is cached for up to 3600 seconds
     * @param {Array.<module:model/String>} categories Type of entities to search for
     * @param {Number} characterId An EVE character ID
     * @param {String} search The string to search on
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.acceptLanguage Language to use in the response (default to en-us)
     * @param {module:model/String} opts.datasource The server name you would like data from (default to tranquility)
     * @param {String} opts.ifNoneMatch ETag from a previous request. A 304 will be returned if this matches the current ETag
     * @param {module:model/String} opts.language Language to use in the response, takes precedence over Accept-Language (default to en-us)
     * @param {Boolean} opts.strict Whether the search should be a strict match (default to false)
     * @param {String} opts.token Access token to use if unable to set a header
     * @param {module:api/SearchApi~getCharactersCharacterIdSearchCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCharactersCharacterIdSearchOk}
     */
    this.getCharactersCharacterIdSearch = function(categories, characterId, search, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'categories' is set
      if (categories === undefined || categories === null) {
        throw new Error("Missing the required parameter 'categories' when calling getCharactersCharacterIdSearch");
      }

      // verify the required parameter 'characterId' is set
      if (characterId === undefined || characterId === null) {
        throw new Error("Missing the required parameter 'characterId' when calling getCharactersCharacterIdSearch");
      }

      // verify the required parameter 'search' is set
      if (search === undefined || search === null) {
        throw new Error("Missing the required parameter 'search' when calling getCharactersCharacterIdSearch");
      }


      var pathParams = {
        'character_id': characterId
      };
      var queryParams = {
        'datasource': opts['datasource'],
        'language': opts['language'],
        'search': search,
        'strict': opts['strict'],
        'token': opts['token'],
      };
      var collectionQueryParams = {
        'categories': {
          value: categories,
          collectionFormat: 'multi'
        },
      };
      var headerParams = {
        'Accept-Language': opts['acceptLanguage'],
        'If-None-Match': opts['ifNoneMatch']
      };
      var formParams = {
      };

      var authNames = ['evesso'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = GetCharactersCharacterIdSearchOk;

      return this.apiClient.callApi(
        '/characters/{character_id}/search/', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getSearch operation.
     * @callback module:api/SearchApi~getSearchCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetSearchOk} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Search on a string
     * Search for entities that match a given sub-string.  --- Alternate route: `/dev/search/`  Alternate route: `/legacy/search/`  Alternate route: `/v2/search/`  --- This route is cached for up to 3600 seconds
     * @param {Array.<module:model/String>} categories Type of entities to search for
     * @param {String} search The string to search on
     * @param {Object} opts Optional parameters
     * @param {module:model/String} opts.acceptLanguage Language to use in the response (default to en-us)
     * @param {module:model/String} opts.datasource The server name you would like data from (default to tranquility)
     * @param {String} opts.ifNoneMatch ETag from a previous request. A 304 will be returned if this matches the current ETag
     * @param {module:model/String} opts.language Language to use in the response, takes precedence over Accept-Language (default to en-us)
     * @param {Boolean} opts.strict Whether the search should be a strict match (default to false)
     * @param {module:api/SearchApi~getSearchCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetSearchOk}
     */
    this.getSearch = function(categories, search, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'categories' is set
      if (categories === undefined || categories === null) {
        throw new Error("Missing the required parameter 'categories' when calling getSearch");
      }

      // verify the required parameter 'search' is set
      if (search === undefined || search === null) {
        throw new Error("Missing the required parameter 'search' when calling getSearch");
      }


      var pathParams = {
      };
      var queryParams = {
        'datasource': opts['datasource'],
        'language': opts['language'],
        'search': search,
        'strict': opts['strict'],
      };
      var collectionQueryParams = {
        'categories': {
          value: categories,
          collectionFormat: 'multi'
        },
      };
      var headerParams = {
        'Accept-Language': opts['acceptLanguage'],
        'If-None-Match': opts['ifNoneMatch']
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = GetSearchOk;

      return this.apiClient.callApi(
        '/search/', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
