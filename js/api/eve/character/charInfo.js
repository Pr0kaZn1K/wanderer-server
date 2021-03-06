/**
 * Created by Aleksey Chichenkov <rolahd@yandex.ru> on 5/20/20.
 */

var _sendError = function (_connectionId, _responseId, _message, _data) {
    api.send(_connectionId, _responseId, {
        errData: _data,
        success: false,
        message: _message,
        eventType: "responseEveCharacterCharInfo",
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
        let userId = await core.tokenController.checkToken(token);
        let info = await core.charactersController.getCharInfo(_event.characterId, _event.type);
        let own = await core.userController.isCharacterAttachedToUser(_event.characterId, userId);
        info.isOwn = own;

        api.send(_connectionId, _responseId, {
            result: info,
            success: true,
            eventType: "responseEveCharacterCharInfo"
        })
    } catch (_err) {
        _sendError(_connectionId, _responseId, "Error on load char info", _err);
    }
};

module.exports = request;