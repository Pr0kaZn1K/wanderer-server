var template = `

<div>
    <md-dialog :md-active.sync="showDialog" @md-opened="onEditDialogOpened" @md-closed="onDialogClosed">
        <md-dialog-title>{{header}}</md-dialog-title>
        
        <div style="padding: 20px; height: 70%" class="bs">
            <md-table class="c-custom-table">
                <md-table-row>
                    <md-table-head style="width: 150px">Character</md-table-head>
                    <md-table-head style="width: 150px">Track</md-table-head>
                </md-table-row>
                
                <md-table-row v-for="item in characters">
                    <md-table-cell>{{item.name}}</md-table-cell>
                    <md-table-cell>
                        <md-switch v-model="item.track" class="md-primary"></md-switch>
                    </md-table-cell>
                </md-table-row>
            </md-table>
    
        </div>
        
        <md-dialog-actions>
            <md-button class="md-primary md-accent" @click="showDialog = false">Close</md-button>
            <md-button 
                class="md-primary md-raised" 
                @click="onEditSubmit">Confirm</md-button>
        </md-dialog-actions>
    </md-dialog>
   
    
</div>

`;

(function () {
    var componentId = "components/groups/allowedDialog";

    var deps = [
        "env/promise"
    ];

    define(componentId, deps, function () {
        var CustomPromise = require("env/promise");

        Vue.component("allowedDialog", {
            props: [

            ],
            data: function () {
                return {
                    characters: [],
                    header: "Set accounts tracking",
                    showDialog: false
                }
            },
            template: template,
            mounted: function () {

            },
            methods: {
                show: function (_groupId) {
                    this._showPromise = new CustomPromise();

                    this._groupId = _groupId;
                    this._loadCharacters(_groupId).then(function() {
                        this.showDialog = true;

                    }.bind(this), function() {
                        this._showPromise.reject();
                    }.bind(this));

                    return this._showPromise.native;
                },
                close: function () {

                },
                _loadCharacters: function (_groupId) {
                    var pr = new CustomPromise();

                    api.eve.group.getAllowedCharactersForGroup(_groupId).then(function(_characters) {
                        this.characters = _characters;
                        pr.resolve();
                    }.bind(this),function(_err) {
                        pr.reject(_err);
                    }.bind(this));

                    return pr.native;
                },
                // ========= EDITING DIALOG PART ===========
                onEditDialogOpened: function () {
                    // this.validateEditForm();
                },
                onDialogClosed: function () {
                    // this.clearForm();
                },
                onEditSubmit: function () {
                    api.eve.group.updateAllowedCharactersForGroup(this._groupId, this.characters).then(function() {
                        this.showDialog = false;
                    }.bind(this),function(_err) {
                        alert(_err);
                    }.bind(this))
                }
            }
        });


    });
})(window);

