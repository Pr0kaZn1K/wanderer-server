var template = `

<div>
       
    <md-tabs @md-changed="onTabChange">
        <md-tab id="tab-own" md-label="Own groups" exact>
            <component ref="ownGroupsRef" :is="ownGroupsComponent" ></component>
        </md-tab>
        
        <md-tab id="tab-allowed" md-label="Allowed groups">
            <component ref="allowedGroupsRef" :is="allowedGroupsComponent" ></component>
        </md-tab>
       
    </md-tabs>
           
    
</div>
        
`;

(function () {
    var componentId = "components/groups/groups";

    var deps = [
        "env/query"
    ];

    define(componentId, deps, function () {
        var query = require("env/query");

        Vue.component("groups", {
            props: [

            ],
            data: function () {
                return {
                    groups: [],

                    ownGroupsComponent: "",
                    allowedGroupsComponent: "",
                }
            },
            template: template,
            mounted: function () {
                this._loaded = false;
                var prarr = [];
                prarr.push(componentController.load("ownGroups"));
                prarr.push(componentController.load("allowedGroups"));
                Promise.all(prarr).then(function(){
                    this.ownGroupsComponent = "ownGroups";
                    this.allowedGroupsComponent = "allowedGroups";

                    this._loadData();
                    this._loaded = true;
                }.bind(this), function(){
                    debugger; // todo
                }.bind(this));
            },
            methods: {
                _loadData: function () {
                    setTimeout(function(){
                        this.$refs.ownGroupsRef.$on("rowClicked", this.onRowClick);
                        this.onTabChange("tab-own");
                    }.bind(this), 100)
                },
                close: function () {

                },
                refresh: function () {

                },
                getTabRoute: function (_type) {
                    var obj = query.searchObject();

                    obj.subItem = _type;

                    return query.toString(obj);
                },
                onTabChange: function (_type) {
                    if(this._loaded) {

                        switch (_type) {
                            case "tab-own":
                                this.$refs.ownGroupsRef.load();
                                break;
                            case "tab-allowed":
                                this.$refs.allowedGroupsRef.load();
                                break;
                        }
                    }
                }
            }
        });

    });
})(window);

