var template = `

<div>
       
    <md-table class="c-custom-table">
        <md-table-row>
            <md-table-head style="width: 150px">Name</md-table-head>
            <md-table-head style="width: 180px">Owner</md-table-head>
            <md-table-head>Description</md-table-head>
        </md-table-row>
        
        <md-table-row @click="onRowClick(item.id, $event)" class="cursor-pointer" v-for="item in groups">
            <md-table-cell>{{item.name}}</md-table-cell>
            <md-table-cell>{{item.owner}}</md-table-cell>
            <md-table-cell>{{item.description}}</md-table-cell>
        </md-table-row>
    </md-table>
    
    <component ref="allowedDialogRef" :is="allowedDialog" ></component>
    
</div>
        
`;

(function () {
    var componentId = "components/groups/allowed";

    var deps = [
        "env/query"
    ];

    define(componentId, deps, function () {
        var query = require("env/query");

        Vue.component("allowedGroups", {
            props: [

            ],
            data: function () {
                return {
                    allowedDialog: "",
                    groups: [],
                }
            },
            template: template,
            mounted: function () {    var prarr = [];
                prarr.push(componentController.load("allowedDialog"));
                Promise.all(prarr).then(function(){
                    this.allowedDialog = "allowedDialog";

                    // this._loadData();
                }.bind(this), function(){
                    debugger; // todo
                }.bind(this));
            },
            methods: {
                _loadData: function () {
                    api.eve.group.allowedGroups().then(function(_groups){
                        this.groups = _groups;
                    }.bind(this), function(_err){
                        debugger;
                    }.bind(this))
                },
                load: function () {
                    this._loadData();
                },
                close: function () {

                },
                onRowClick: function (_groupId, _event) {
                    this.$refs.allowedDialogRef.show(_groupId);
                    // this.$emit("rowClicked", _groupId);
                    // this.edit(_groupId);
                }
            }
        });

    });
})(window);
