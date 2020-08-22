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
                        
                        <md-switch v-model="formIsPrivate" class="md-primary">Is Private</md-switch>
                    </div>
                </md-tab>
                
                <md-tab id="tab-groups" md-label="Groups">
                    <div style="padding: 20px; height: 500px " class="fs bs">

                        <div class="md-content relative md-home-maps-search-content" style="padding-right: 65px">
                            <md-autocomplete
                                v-model="searchDefaultGroupValue"
                                :md-options="groups"
                                md-layout="box"
                                @md-selected="searchDefaultGroupValue = $event.name; onSearchDefaultGroupSelected($event)"
                                @md-changed="onSearchDefaultGroupChanged"
                                @md-opened="onACOpened"
                                md-dense
                            >
                               
                               <label><md-icon>search</md-icon> Select group</label>
                                
                               <template slot="md-autocomplete-item" slot-scope="{ item, term }">
                                   <md-highlight-text :md-fuzzy-search="false" :md-term="term">{{ item.name }}</md-highlight-text>
                               </template>
                    
                               <template slot="md-autocomplete-empty" slot-scope="{ term }">
                                   Such group not exist "{{ term }}"!
                               </template>
                            </md-autocomplete>
                            
                            <md-button 
                                class="md-raised md-mini md-fab absolute top right" 
                                :disabled="searchAddButtonDisabled"
                                @click="onSearchAddButtonClick"
                            >  
                                <md-icon>add</md-icon>  
                            </md-button>
                        </div>
                        
                        <md-table class="c-custom-table" style="height: 400px" md-card @md-selected="onRowsSelected" v-model="searchAttachedGroups">
                            <md-table-toolbar>
                                <h1 class="md-title">Groups attached to map</h1>
                            </md-table-toolbar>
                            
                            <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
                                <div class="md-toolbar-section-start">Groups selected - {{count}}</div>
                                
                                <div class="md-toolbar-section-end">
                                    <md-button class="md-icon-button" @click="onDeleteRows">
                                        <md-icon>delete</md-icon>
                                    </md-button>
                                </div>
                            </md-table-toolbar>
                            
                            <md-table-row slot-scope="{ item }" class="cursor-pointer" md-auto-select md-selectable="multiple" slot="md-table-row">
                                <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
                                <md-table-cell md-label="Owner">{{item.owner}}</md-table-cell>
                                <md-table-cell md-label="Description">{{item.description}}</md-table-cell>
                            </md-table-row>
                        </md-table>
                        
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
    var componentId = "components/maps/mapsEditDialog";

    var deps = [
        "env/promise"
    ];

    define(componentId, deps, function () {
        var CustomPromise = require("env/promise");

        Vue.component("mapsEditDialog", {
            props: [

            ],
            data: function () {
                return {
                    maps: [],
                    groups: [],

                    header: "",

                    searchAddButtonDisabled: true,
                    searchDefaultGroupValue: "",
                    searchDefaultGroupItem: null,
                    searchAttachedGroups: [
                        // {name: "kek21", description: "kek21", owner: "kek21", id: "asdfasd123wdfasdf"},
                    ],
                    searchAttachedGroupsSelected: [],

                    formName: "",
                    formDescription: "",
                    formDescriptionIcon: "",
                    formIsPrivate: true,
                    formButtonDisabled: true,
                    // formDefaultGroupValue: "",
                    // formDefaultGroupItem: null,
                    // formDefaultGroupIcon: "",
                    showEditDialog: false,
                }
            },
            template: template,
            mounted: function () {
                var prarr = [];

                prarr.push(api.eve.group.list());
                prarr.push(api.eve.map.list());

                Promise.all(prarr).then(function(_arr){
                    this.groups = _arr[0];
                    this.maps = _arr[1];
                }.bind(this), function(_err){
                    debugger; // todo
                }.bind(this))
            },
            methods: {
                _load: function () {

                },
                show: function (_options) {
                    this._state = !_options ? "add" : "edit";
                    this.header = this._state === "add" ? "Create new map" : "Edit map - " + _options.name;

                    this._showPromise = new CustomPromise();

                    if(_options) {
                        this._loadGroups(_options.groups).then(function (_groups) {
                            this.showEditDialog = true;

                            this.mapId = _options.mapId;
                            this.formName = _options.name;
                            this.formIsPrivate = _options.isPrivate;
                            this.formDescription = _options.description;
                            // this.formDefaultGroupItem = _options.defaultGroupItem;
                            // this.formDefaultGroupValue = _options.defaultGroupValue;
                            this.searchAttachedGroups = _groups;

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

                _loadGroups: function (_groups) {
                    var pr = new CustomPromise();

                    var prarr = [];

                    for (var a = 0; a < _groups.length; a++) {
                        prarr.push(api.eve.group.info(_groups[a]));
                    }

                    Promise.all(prarr).then(function(_result){
                        for (var a = 0; a < _result.length; a++) {
                            _result[a].id = _groups[a];
                        }
                        pr.resolve(_result);
                    }.bind(this), function(_err){
                        pr.reject(_err);
                    }.bind(this))

                    return pr.native;
                },

                // ========= SEARCHING GROUPS PART ===========
                onACOpened: function (){
                    setTimeout(function () {
                        window.dispatchEvent(new Event('resize'));
                    }.bind(this), 10)
                },

                onSearchDefaultGroupChanged: function (_event) {
                    setTimeout(function () {
                        this.searchDefaultGroupItem = _event;
                    }.bind(this), 0);
                },
                onSearchDefaultGroupSelected: function (_event) {
                    this.formDefaultGroupItem = _event;
                    this.searchAddButtonDisabled = false;
                },
                onSearchAddButtonClick: function (_event) {
                    if(!this.searchAttachedGroups.searchByObjectKey("id", this.formDefaultGroupItem.id)) {
                        this.searchAttachedGroups.push(this.formDefaultGroupItem);
                        this.searchAddButtonDisabled = true;
                        this.searchDefaultGroupValue = "";
                    }
                },
                onRowsSelected: function (_selectedGroups) {
                    this.searchAttachedGroupsSelected = _selectedGroups;
                },
                onDeleteRows: function (_selectedGroups) {
                    for (var a = 0; a < this.searchAttachedGroupsSelected.length; a++) {
                        this.searchAttachedGroups.eraseByObjectKey("id", this.searchAttachedGroupsSelected[a].id);
                    }
                    this.searchAttachedGroupsSelected = [];
                },
                // ========= SEARCHING GROUPS PART ===========


                // ========= EDITING DIALOG PART ===========
                onEditDialogOpened: function () {
                    this.validateEditForm();
                },
                onDialogClosed: function () {
                    this.clearForm();
                },
                onEditSubmit: function () {
                    var groups = [];

                    for (var a = 0; a < this.searchAttachedGroups.length; a++) {
                        groups.push(this.searchAttachedGroups[a].id);
                    }

                    var options = {
                        name: this.formName,
                        description: this.formDescription,
                        isPrivate: this.formIsPrivate,
                        // defaultGroup: this.formDefaultGroupItem.id,
                        groups: groups
                    };

                    var pr = new CustomPromise();

                    switch(this._state) {
                        case "add":
                            pr = api.eve.map.add(options)
                            break;
                        case "edit":
                            pr = api.eve.map.edit(this.mapId, options)
                            break;
                    }

                    pr.then(function(_event) {
                        if(this._state === "add") {
                            options.id = _event.mapId;
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

                    this.formButtonDisabled = !(isValidName && isValidDescription);
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

