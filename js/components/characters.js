var template = `

<div class="ms-cst-chars-layout">

    <md-card class="md-elevation-4" v-for="(character, index) in characters" md-with-hover>
        <md-ripple>
            <md-card-media-cover md-text-scrim>
                <md-card-media md-ratio="1:1" :style='"background-image: url(" + character.images.px512x512 + ")"'>
    
                    <div class="fs absolute top">
                        <md-icon 
                            class="absolute" 
                            :id="'character_icon_' + this.btoa(character.id)" 
                            :style="'right: 5px; top: 5px; color: #7c7c6f'">
                            public
                        </md-icon>
                    </div>                
    
                </md-card-media>
                
                <md-card-area>
                    <md-card-header>
                        <span class="md-title">{{character.name}}</span>
                        <span class="md-subhead">{{character.corporation + " [" + character.alliance + "]"}}</span>
                    </md-card-header>
                    
                    <md-card-actions>
                        <md-button class="md-icon-button">
                            <md-icon>autorenew</md-icon>
                        </md-button>
                        
                        <md-button class="md-icon-button" @click="onRemoveClick(character.id)">
                            <md-icon>delete</md-icon>
                        </md-button>
                    </md-card-actions>
                </md-card-area>
            </md-card-media-cover>
        </md-ripple>
    </md-card>
    
    <md-card class="md-elevation-4" md-with-hover style="height:320px;" >
        <div class="fs" @click="onAddClick" >
            <md-ripple style="padding-top: 0px;">
                <md-empty-state
                    md-icon="library_add"
                    md-label="Attach character"
                    md-description="Eve sso character authorization"
                >
                </md-empty-state>
            </md-ripple>
        </div>
    </md-card>
</div>

`;


(function () {
    var componentId = "components/characters";

    var deps = [
        "env/query"
    ];

    define(componentId, deps, function () {
        var query  = require("env/query");

        Vue.component("characters", {
            props: [

            ],
            data: function () {
                return {
                    characters: []
                }
            },
            template: template,
            mounted: function () {
                this._subscribers = Object.create(null);

                window.api.eve.character.list().then(function(_characters){
                    this.characters = _characters;
                    this._initSubscribes();
                }.bind(this), function(_err){
                    debugger;
                }.bind(this))
            },
            methods: {
                onAddClick: function (_event) {
                    ssoAuthRequest(query.toString({
                        page: "ssoAuthResponse"
                    }));
                },
                _initSubscribes: function () {
                    this._subscribers = Object.create(null);

                    for (var a = 0; a < this.characters.length; a++) {
                        var character = this.characters[a];
                        this._subscribers[character.id] = api.eve.character.online(character.id);
                        this._subscribers[character.id].subscribe();
                        this._subscribers[character.id].on("change", _onOnlineChange.bind(this, character.id));
                    }
                },
                close: function () {
                    for (var characterId in this._subscribers) {
                        this._subscribers[characterId].unsubscribe();
                    }

                    this._subscribers = Object.create(null);
                },
                refresh: function () {

                },
                onRemoveClick: function (_characterId) {
                    api.eve.character.remove(_characterId).then(function () {
                        this.characters.eraseByObjectKey("id", _characterId);
                    }.bind(this), function (_err) {
                        alert(JSON.stringify(_err, true, 3));
                    }.bind(this));
                }
            }
        });

        var _onOnlineChange = function (_characterId, _isOnline) {
            var iconId  = "character_icon_" + btoa(_characterId);
            var iconDiv = document.getElementById(iconId);

            if(!_isOnline) {
                iconDiv.style.color = "#7c7c6f";
            } else {
                iconDiv.style.color = "#00cb04";
            }
        };

        var ssoAuthRequest = function (_responseQuery) {
            var response_url = location.origin + location.pathname + "?" + _responseQuery;

            var SSO_HOST = config.eve.sso.server.host;
            var SSO_PROTO = config.eve.sso.server.proto;

            var RESPONSE_TYPE = config.eve.sso.client.response_type;
            var CLIENT_ID = config.eve.sso.client.client_id;
            var SCOPE = config.eve.sso.client.scope.join(" ");

            var data = {
                response_type: RESPONSE_TYPE,
                client_id: CLIENT_ID,
                scope: SCOPE,
                state: "ccp_auth_response",
                redirect_uri: response_url
            };
            var destination = SSO_PROTO + "//" + SSO_HOST + "/oauth/authorize/?";

            var url = destination + query.toString(data);
            console.log("CCP_AUTH_URL " + url);
            location.href = url;
        }
    });




})(window);

