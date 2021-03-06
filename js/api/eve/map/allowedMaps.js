/**
 * Created by Aleksey Chichenkov <rolahd@yandex.ru> on 5/20/20.
 */

var _sendError = function (_connectionId, _responseId, _message, _data) {
    api.send(_connectionId, _responseId, {
        errData: _data,
        success: false,
        message: _message,
        eventType: "responseEveAllowedMaps",
    });
};


var request = async function (_connectionId, _responseId, _event) {
    // we need get token by connection
    var token = core.connectionStorage.get(_connectionId);

    // when token is undefined - it means what you have no rights
    if(token === undefined) {
        _sendError(_connectionId, _responseId, "You not authorized or token was expired");
        return;
    }

    try {
        var userId = await core.tokenController.checkToken(token);

        var maps = await core.groupsController.getAllowedMapsByUser(userId);

        api.send(_connectionId, _responseId, {
            list: maps,
            success: true,
            eventType: "responseEveAllowedMaps"
        });

    } catch (_err) {
        debugger;
        _sendError(_connectionId, _responseId, "Error on getAllowedMapsByUser", _err);
    }



    // core.tokenController.checkToken(token).then(function(_value) {
    //     userId = _value;
    //
    //     // log(log.INFO, printf("SSO_AUTH[1]: inner token success for user [%s]", _value));
    //
    //
    //     return core.mapController.getMapListByOwner(userId);
    // }.bind(this), function() {
    //     _sendError(_connectionId, _responseId, "You not authorized or token was expired");
    // }.bind(this))
    //
    // .then(function(_list){
    //     api.send(_connectionId, _responseId, {
    //         list: _list,
    //         success: true,
    //         eventType: "responseEveMapList"
    //     });
    // }.bind(this), function(_err){
    //     // need log it
    //     _sendError(_connectionId, _responseId, "Error on load map list", _err);
    // }.bind(this))

};

module.exports = request;