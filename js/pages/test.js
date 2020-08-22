var template = `
  
<div class="page-container fs">
    <md-app class="fs">
        <md-app-toolbar class="md-primary">
            <span class="md-title">Mapper</span>
        </md-app-toolbar>
        
        
        
        <md-app-content class="fs relative">
            <component ref="contentRef" v-bind:is="mainPageContent"  ></component>
        </md-app-content>
    </md-app>
</div>


`;
var deps = [
    // "env/cookie",
    "env/promise",
    "env/tools/print_f",
    "env/query",
    "env/cookie"
];
require(deps, function () {
    // var cookie  = require("env/cookie");
    var promise    = require("env/promise");
    var printf     = require("env/tools/print_f");
    var query      = require("env/query");
    var cookie     = require("env/cookie");

    Vue.component("HomePage", {
        props: [

        ],
        data: function () {
            return {
                mainPageContent: '',
                menuVisible: false,

                currentMapButtonIsActive: true,
                charactersButtonIsActive: false,
                mapsButtonIsActive: false,
                profileButtonIsActive: false,
                groupsButtonIsActive: false,
            }
        },
        template: template,
        mounted: function () {
            var page = _getSubPage();
            if(page === null)
                this._load("currentMap");
            else
                this._load(page);
        },
        methods: {
            toggleMenu () {
                this.menuVisible = !this.menuVisible
            },
            onCurrentMapClick: function (_event) {
                this._load("currentMap");
            },
            onCharClick: function (_event) {
                this._load("characters");
            },
            onProfileClick: function (_event) {
                this._load("profile");
            },
            onMapsClick: function  (_event) {
                this._load("maps");
            },
            onGroupsClick: function  (_event) {
                this._load("groups");
            },
            onLogOut: function () {
                window.history.replaceState(null, null, ".");
                cookie.remove("token");
                cookie.remove("login");
                location.reload();
            },
            _load: function (_componentName) {
                var pr = new promise();

                if(this.mainPageContent !== _componentName) {
                    if(this.$refs.contentRef) {
                        this.$refs.contentRef.close();
                    }

                    window.componentController.load(_componentName).then(function () {
                        setItem(_componentName);

                        this.resetAllActive();
                        this[_componentName + "ButtonIsActive"] = true;
                        this.mainPageContent = _componentName;
                        pr.resolve();
                    }.bind(this), function () {
                        pr.reject();
                    }.bind(this));
                }

                return pr.native;
            },
            resetAllActive: function () {
                this.charactersButtonIsActive = false;
                this.mapsButtonIsActive = false;
                this.profileButtonIsActive = false;
                this.currentMapButtonIsActive = false;
                this.groupsButtonIsActive = false;
            },
            onMenuOpened: function () {
                this.$refs.contentRef.refresh();
            },
            onMenuClosed: function () {
                this.$refs.contentRef.refresh();
            },
        }
    });

    var setItem = function (_itemName) {
        var urlInfo = query.searchObject();
        urlInfo.item = _itemName;
        window.history.replaceState(null, null, printf("?%s", query.toString(urlInfo)));
    };

    var _getSubPage = function (){
        if(window.location.search === "")
            return null;

        var urlInfo = query.searchObject();

        if(!urlInfo.item)
            return null;

        return urlInfo.item;
    };

    app.currentView = "HomePage";
});



