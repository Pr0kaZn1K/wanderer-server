var template = `

<div>
    <md-dialog :md-active.sync="showEditDialog" @md-opened="onEditDialogOpened" @md-closed="onDialogClosed" class="c-medium-dialog">
        <md-dialog-title>{{header}}</md-dialog-title>
        
        <div style="padding: 20px; height: 70%" class="bs">
            <md-tabs md-dynamic-height>
                <md-tab id="tab-preferences" md-label="Preferences">
                    <div style="padding: 20px;" class="fs bs">
                                        
                        <md-field md-clearable>
                            <label>Name</label>
                            <md-input v-model="formName" @input="onEditFormChange" @change="onEditFormChange"></md-input>
                        </md-field>
                        
                        <md-field md-clearable>
                            <md-icon v-if="(formDescriptionIcon == 'warning')" class="md-accent">
                                <md-tooltip md-direction="top">Description must contains minimum 4 letter</md-tooltip>
                                {{createDescriptionIcon}}
                            </md-icon>
                            <label>Description</label>
                            <md-input v-model="formDescription" @input="onEditFormChange" @change="onEditFormChange"></md-input>
                        </md-field>
                  
                    </div>
                </md-tab>
                
                <md-tab id="tab-characters" md-label="Characters">
                    <div style="padding: 20px; height: 500px " class="fs bs">
                        <component ref="charactersSearcherRef" :is="charactersSearcher" ></component>
                    </div>
                </md-tab>
                
                <md-tab id="tab-corporations" md-label="Corporations">
                    <div style="padding: 20px; height: 500px " class="fs bs">
                        <component ref="corporationsSearcherRef" :is="corporationsSearcher" ></component>
                    </div>
                </md-tab>
                
                <md-tab id="tab-alliances" md-label="Alliances">
                    <div style="padding: 20px; height: 500px " class="fs bs">
                        <component ref="alliancesSearcherRef" :is="alliancesSearcher" ></component>
                    </div>
                </md-tab>
                
              
            </md-tabs>
        </div>
        
        <md-dialog-actions>
            <md-button class="md-primary md-accent" @click="showEditDialog = false">Close</md-button>
            <md-button 
                class="md-primary md-raised" 
                @click="onEditSubmit" 
                :disabled="formButtonDisabled">Confirm</md-button>
        </md-dialog-actions>
    </md-dialog>
   
    
</div>

`;

(function () {
    var componentId = "components/groups/groupEditDialog";

    var deps = [
        "env/promise"
    ];

    define(componentId, deps, function () {
        var CustomPromise = require("env/promise");

        Vue.component("groupEditDialog", {
            props: [

            ],
            data: function () {
                return {
                    groups: [],

                    header: "",
                    // groupsSearcher: "",
                    charactersSearcher: "",
                    corporationsSearcher: "",
                    alliancesSearcher: "",

                    formName: "",
                    formDescription: "",
                    formDescriptionIcon: "",
                    formButtonDisabled: true,
                    showEditDialog: false,
                }
            },
            template: template,
            mounted: function () {
                var prarr = [];
                // prarr.push(componentController.load("groupsSearcher"));
                prarr.push(componentController.load("charactersSearcher"));
                prarr.push(componentController.load("corporationsSearcher"));
                prarr.push(componentController.load("alliancesSearcher"));
                Promise.all(prarr).then(function(){
                    // this.groupsSearcher = "groupsSearcher";
                    this.charactersSearcher = "charactersSearcher";
                    this.corporationsSearcher = "corporationsSearcher";
                    this.alliancesSearcher = "alliancesSearcher";
                    this._loadData();
                }.bind(this), function(){
                    debugger; // todo
                }.bind(this));

                this._loadTid = -1;
            },
            beforeDestroy: function () {
                this._loadTid !== -1 && clearTimeout(this._loadTid);
                this._loadTid = -1;
            },
            methods: {
                _loadData: function () {
                    var prarr = [];

                    prarr.push(api.eve.group.list());

                    Promise.all(prarr).then(function(_arr){
                        this.groups = _arr[0];
                    }.bind(this), function(_err){
                        debugger; // todo
                    }.bind(this))
                },
                show: function (_options) {
                    this._state = !_options ? "add" : "edit";
                    this.header = this._state === "add" ? "Create new group" : "Edit group - " + _options.name;

                    this._showPromise = new CustomPromise();

                    if(_options) {
                        var prarr = [];

                        prarr.push(this._loadCharacters(_options.characters));
                        prarr.push(this._loadCorporations(_options.corporations));
                        prarr.push(this._loadAlliances(_options.alliances));

                        Promise.all(prarr).then(function (_arr) {
                            this.showEditDialog = true;

                            this.itemId = _options.id;
                            this.formName = _options.name;
                            this.formDescription = _options.description;

                            this._loadTid = setTimeout(function () {
                                this._loadTid = -1;
                                this.$refs.charactersSearcherRef.setElements(_arr[0]);
                                this.$refs.corporationsSearcherRef.setElements(_arr[1]);
                                this.$refs.alliancesSearcherRef.setElements(_arr[2]);
                            }.bind(this), 100)

                        }.bind(this), function () {
                            // do nothing
                        }.bind(this));
                    } else {
                        this.showEditDialog = true;
                    }

                    return this._showPromise.native;
                },
                close: function () {

                },
                _loadCharacters: function (_characters) {
                    var pr = new CustomPromise();

                    var prarr = [];

                    for (var a = 0; a < _characters.length; a++) {
                        prarr.push(api.eve.character.charInfo(_characters[a]));
                    }

                    Promise.all(prarr).then(function(_result){
                        for (var a = 0; a < _result.length; a++) {
                            _result[a].id = _characters[a];
                        }
                        pr.resolve(_result);
                    }.bind(this), function(_err){
                        pr.reject(_err);
                    }.bind(this));

                    return pr.native;
                },
                _loadCorporations: function (_corporationIds) {
                    var pr = new CustomPromise();

                    var prarr = [];

                    for (var a = 0; a < _corporationIds.length; a++) {
                        prarr.push(api.eve.corporation.info(_corporationIds[a]));
                    }

                    Promise.all(prarr).then(function(_result){
                        for (var a = 0; a < _result.length; a++) {
                            _result[a].id = _corporationIds[a];
                        }
                        pr.resolve(_result);
                    }.bind(this), function(_err){
                        pr.reject(_err);
                    }.bind(this));

                    return pr.native;
                },
                _loadAlliances: function (_allianceIds) {
                    var pr = new CustomPromise();

                    var prarr = [];

                    for (var a = 0; a < _allianceIds.length; a++) {
                        prarr.push(api.eve.alliance.info(_allianceIds[a]));
                    }

                    Promise.all(prarr).then(function(_result){
                        for (var a = 0; a < _result.length; a++) {
                            _result[a].id = _allianceIds[a];
                        }
                        pr.resolve(_result);
                    }.bind(this), function(_err){
                        pr.reject(_err);
                    }.bind(this));

                    return pr.native;
                },
                // ========= EDITING DIALOG PART ===========

                onEditDialogOpened: function () {
                    this.validateEditForm();
                },
                onDialogClosed: function () {
                    this.clearForm();
                },
                onEditSubmit: function () {
                    var characters = [];
                    var corporations = [];
                    var alliances = [];
                    var attachedCharacters = this.$refs.charactersSearcherRef.getElements();
                    var attachedCorporations = this.$refs.corporationsSearcherRef.getElements();
                    var attachedAlliances = this.$refs.alliancesSearcherRef.getElements();

                    for (var a = 0; a < attachedCharacters.length; a++) {
                        characters.push(attachedCharacters[a].id);
                    }

                    for (a = 0; a < attachedCorporations.length; a++) {
                        corporations.push(attachedCorporations[a].id);
                    }

                    for (a = 0; a < attachedAlliances.length; a++) {
                        alliances.push(attachedAlliances[a].id);
                    }

                    var options = {
                        name: this.formName,
                        description: this.formDescription,
                        characters: characters,
                        corporations: corporations,
                        alliances: alliances,
                    };

                    var pr = new CustomPromise();

                    switch(this._state) {
                        case "add":
                            pr = api.eve.group.add(options);
                            break;
                        case "edit":
                            pr = api.eve.group.edit(this.itemId, options);
                            break;
                    }

                    pr.then(function(_event) {
                        if(this._state === "add") {
                            options.id = _event.groupId;
                            options.owner = _event.userId;
                        }

                        this.clearForm();
                        this.showEditDialog = false;
                        this._showPromise.resolve(options);
                    }.bind(this), function(_errMsg) {
                        // do nothing
                    }.bind(this));
                },
                onEditFormChange: function (_event) {
                    this.validateEditForm();
                },
                validateEditForm: function () {
                    var isValidName = validateName(this.formName, 3);
                    var isValidDescription = validateName(this.formDescription, 0);

                    this.setFieldState("Name", isValidName);
                    this.setFieldState("Description", isValidDescription);

                    this.formButtonDisabled = !(isValidName /*&& isValidDescription*/);
                },
                // ========= EDITING DIALOG PART ===========
                setFieldState: function (_type, _field, _valid) {
                    this["form" + _field + "Icon"] = _valid ? "done": "warning";
                },
                clearForm: function () {
                    this.formName = "";
                    this.formNameIcon = "";
                    this.formDescription = "";
                    this.formDescriptionIcon = "";
                    this.formIsPrivate = false;
                    this.searchAttachedGroups = [];
                },
            }
        });

        var validateName = function (_nickname, _allowLength) {
            _allowLength = _allowLength !== undefined ? _allowLength : 3;

            if(_allowLength === 0 && _nickname === "")
                return true;

            if(!_nickname)
                return false;

            if(_nickname.length <= _allowLength)
                return false;

            return !!_nickname.match(/[A-Za-z_][A-Za-z_\- ]*?/m);
        };

    });
})(window);

