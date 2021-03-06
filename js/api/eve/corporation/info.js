/**
 * Created by Aleksey Chichenkov <rolahd@yandex.ru> on 5/20/20.
 */

var _sendError = function (_connectionId, _responseId, _message, _data) {
    api.send(_connectionId, _responseId, {
        errData: _data,
        success: false,
        message: _message,
        eventType: "responseEveCharacterCorporationInfo",
    });
};

/**
 *
 * @param _connectionId
 * @param _responseId
 * @param _event
 * @param _event.corporationId
 * @param _event.type
 */
var request = function (_connectionId, _responseId, _event) {
    // we need get token by connection
    var token = core.connectionStorage.get(_connectionId);

    // when token is undefined - it means what you have no rights
    if(token === undefined) {
        _sendError(_connectionId, _responseId, "You not authorized or token was expired");
        return;
    }

    var userId = null;

    core.tokenController.checkToken(token).then(function(_value) {
        userId = _value;

        // log(log.INFO, printf("SSO_AUTH[1]: inner token success for user [%s]", _value));

        return core.corporationsController.getCorporationInfo(_event.corporationId, _event.type);
    }.bind(this), function() {
        _sendError(_connectionId, _responseId, "You not authorized or token was expired");
    }.bind(this))

    .then(function(_info){
        api.send(_connectionId, _responseId, {
            result: _info,
            success: true,
            eventType: "responseEveCharacterCorporationInfo"
        });
    }.bind(this), function(_err){
        // need log it
        _sendError(_connectionId, _responseId, "Error on load char info", _err);
    }.bind(this))

};

module.exports = request;