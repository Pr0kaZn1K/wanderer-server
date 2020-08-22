var template = `


<div class="md-layout md-alignment-center-center fs background">      
      <md-dialog-alert
          :md-active.sync="dialogRegisterShow"
          :md-title="dialogRegisterTitle"
          :md-content="dialogRegisterDescription" />
      
      <md-dialog-alert
          :md-active.sync="dialogLoginShow"
          :md-title="dialogLoginTitle"
          :md-content="dialogLoginDescription" />

    <div class="md-layout-item md-size-25">
        <md-card style=" width: 450px" class="md-elevation-6">          
        
            <md-card-content>
                <md-tabs @md-changed="onTabChange" :md-active-tab="currentTab" md-dynamic-height>
                
                    <md-tab id="tab-login" md-label="Log in">
                        <div class="md-layout md-alignment-center-center" style="margin-top: 10px;margin-bottom: 10px;" @click="onEveSSOLogin">
                            <div class="md-elevation-2 ui-login-eve-sso-button cursor-pointer" style="border-radius: 3px; overflow: hidden;">
                                <img src="images/EVE_SSO_Login_Buttons_Large_White.png">
                            </div>
                        </div>
                        
                        <div class="md-layout md-alignment-center-center relative" style="top: 12px; background: #fff; margin: 0px 172px;">
                            OR
                        </div>
                        <md-divider style="margin-bottom: 15px"></md-divider>   
                    
                        <md-field md-clearable>
                            <md-icon class="md-accent">
                                <md-tooltip md-direction="top">Mail example - vasilyPupkin100@yandex.ru</md-tooltip>
                                {{loginNicknameIcon}}
                            </md-icon>
                            <label>Mail</label>
                            <md-input v-model="nickname" @input="onFormChange" @change="onFormChange"></md-input>
                        </md-field>
                        
                        <md-field>
                            <md-icon class="md-accent">
                                <md-tooltip md-direction="top">Password must contain A-Z and a-z and 0-9</md-tooltip>
                                {{loginPasswordIcon}}
                            </md-icon>
                            <label>Password</label>
                            <md-input v-model="password" type="password" @input="onFormChange" @change="onFormChange"></md-input>
                        </md-field>
                        
                    </md-tab>
                 
                    <md-tab id="tab-register" md-label="Register">
                        <md-field md-clearable>
                            <md-icon class="md-accent">
                                <md-tooltip md-direction="top">Mail example - vasilyPupkin100@yandex.ru</md-tooltip>
                                {{regNicknameIcon}}
                            </md-icon>
                            <label>Mail</label>
                            <md-input v-model="regNickname" @input="onFormChange" @change="onFormChange"></md-input>
                        </md-field>
                        
                        <md-field>
                            <md-icon class="md-accent">
                            <md-tooltip md-direction="top">Password must contain A-Z and a-z and 0-9</md-tooltip>
                            {{regPasswordIcon}}
                            </md-icon>
                            <label>Password</label>
                            <md-input v-model="regPassword" type="password" @input="onFormChange" @change="onFormChange"></md-input>
                        </md-field>
                        
                        <md-field :md-toggle-password="false">
                            <md-icon class="md-accent">
                                <md-tooltip md-direction="top">Password must contain A-Z and a-z and 0-9</md-tooltip>
                                {{regPasswordRepeatIcon}}
                            </md-icon>
                            <label>Password repeat</label>
                            <md-input v-model="regPasswordRepeat" type="password" @input="onFormChange" @change="onFormChange"></md-input>
                        </md-field>
                    </md-tab>
                </md-tabs>
                
                               
                
            </md-card-content>
            
            <md-card-actions>
                <md-button class="md-primary md-raised" @click="onSubmit" :disabled="buttonDisabled">Submit</md-button>
            </md-card-actions>            
        </md-card>
        
         
    </div>
</div>
`;

require(["env/cookie", "config", "env/query"], function () {
    var cookie = require("env/cookie");
    var config = require("config");
    var query  = require("env/query");

    Vue.component("loginForm", {
        props: [

        ],
        data: function () {
            return {
                dialogRegisterShow: false,
                dialogRegisterTitle: "",
                dialogRegisterDescription: "",

                dialogLoginShow: false,
                dialogLoginTitle: "",
                dialogLoginDescription: "",

                loginNicknameIcon: "warning",
                loginPasswordIcon: "warning",
                loginPasswordRepeatIcon: "warning",
                regNicknameIcon: "warning",
                regPasswordIcon: "warning",
                regPasswordRepeatIcon: "warning",
                currentTab: "",
                nickname: "",
                password: "",
                regNickname: "",
                regPassword: "",
                regPasswordRepeat: "",
                buttonDisabled: true
            }
        },
        template: template,
        mounted: function () {

        },
        methods: {
            onSubmit: function () {
                if (this.currentTab === "tab-login")
                    this.submitLogin();
                else
                    this.submitRegister();
            },
            submitLogin: function () {
                api.user.login(this.nickname, this.password).then(function(_token) {
                    // this.showLoginDialog("Great with registration, " + this.regNickname, "Now you can enjoy this mapper!");
                    // this.currentTab = "tab-login";
                    // this.clearForm();
                    cookie.set("token", _token);
                    location.reload();
                }.bind(this), function(_errMsg) {
                    this.showLoginDialog("Error!", _errMsg);
                }.bind(this));
            },
            showRegisterDialog: function (_title, _message){
                this.dialogRegisterShow = true;
                this.dialogRegisterTitle = _title;
                this.dialogRegisterDescription = _message;
            },
            showLoginDialog: function (_title, _message){
                this.dialogLoginShow = true;
                this.dialogLoginTitle = _title;
                this.dialogLoginDescription = _message;
            },
            clearForm: function () {
                this.regNickname = "";
                this.regPassword = "";
                this.regPasswordRepeat = "";
                this.nickname = "";
                this.password = "";
            },
            submitRegister: function () {
                api.user.register(0, {mail: this.regNickname, password: this.regPassword}).then(function(_event) {
                    this.showRegisterDialog("Great with registration, " + this.regNickname, "Now you can enjoy this mapper!");
                    this.currentTab = "tab-login";
                    this.clearForm();
                }.bind(this), function(_errMsg) {
                    this.showRegisterDialog("Error!", _errMsg);
                }.bind(this));
            },
            onFormChange: function () {
                if(this.currentTab === "tab-login")
                    this.validateLoginForm();
                else
                    this.validateRegisterForm();
            },
            validateLoginForm: function ( ){
                var isValidNickName = validateNickname(this.nickname);
                var isValidPassword = validatePassword(this.password);

                this.setFieldState("login", "Nickname", isValidNickName);
                this.setFieldState("login", "Password", isValidPassword);

                this.buttonDisabled = !(isValidNickName && isValidPassword);
            },
            validateRegisterForm: function ( ){
                var isValidNickName = validateNickname(this.regNickname);
                var isValidPassword = validatePassword(this.regPassword);
                var isValidPasswordRepeat = validatePassword(this.regPasswordRepeat) && this.regPassword === this.regPasswordRepeat;

                this.setFieldState("reg", "Nickname", isValidNickName);
                this.setFieldState("reg", "Password", isValidPassword);
                this.setFieldState("reg", "PasswordRepeat", isValidPasswordRepeat);

                this.buttonDisabled = !(isValidNickName && isValidPassword && isValidPasswordRepeat);
            },
            onTabChange: function (_tabId) {
                if(_tabId) {
                    this.currentTab = _tabId;
                    this.onFormChange();
                }
            },
            setFieldState: function (_type, _field, _valid) {
                this[_type + _field + "Icon"] = _valid ? "done": "warning";
            },
            onEveSSOLogin: function (_event) {
                ssoAuthRequest(query.toString({
                    page: "ssoAuthResponseForLogin"
                }));
            }
        }
    });

    var validateNickname = function (_nickname) {
        if(!_nickname)
            return false;

        if(_nickname.length <= 3)
            return false;

        // return !!_nickname.match(/[A-Za-z_][A-Za-z_\- ]*?/m);
        return !!_nickname.match(/([A-Za-z_][A-Za-z0-9]+?)\@(.+)/);
    };

    var validatePassword = function (_pass) {
        if(!_pass)
            return false;

        if(_pass.length <= 5)
            return false;

        return !!_pass.match(/[A-Z]/m) && !!_pass.match(/[a-z]/m) && !!_pass.match(/[0-9]/m);
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

    app.currentView = "loginForm";

});



