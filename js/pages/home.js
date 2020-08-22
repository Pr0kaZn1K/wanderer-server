var template = `
  
<div class="page-container fs">
    <md-app class="fs">
        <md-app-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">Mapper</span>
        </md-app-toolbar>
        
        <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini" @md-opened="onMenuOpened"  @md-closed="onMenuClosed" >
            <md-toolbar class="md-transparent" md-elevation="0">
                <span>Menu</span>
                
                <div class="md-toolbar-section-end">
                    <md-button class="md-icon-button md-dense" @click="toggleMenu">
                    <md-icon>keyboard_arrow_left</md-icon>
                    </md-button>
                </div>
            </md-toolbar>
            
            <md-list>
                <md-list-item @click="onCurrentMapClick" :active="currentMapButtonIsActive">
                    <md-icon >my_location</md-icon>
                    <span class="md-list-item-text">Current Map</span>
                </md-list-item>
                
                <md-list-item @click="onMapsClick" :active="mapsButtonIsActive">
                    <md-icon >library_add</md-icon>
                    <span class="md-list-item-text">Maps</span>
                </md-list-item>
                
                <md-list-item @click="onGroupsClick" :active="groupsButtonIsActive">
                    <md-icon >group_add</md-icon>
                    <span class="md-list-item-text">Groups</span>
                </md-list-item>
                
                <md-list-item @click="onCharClick" :active="charactersButtonIsActive" >
                    <md-icon>person_add</md-icon>
                    <span class="md-list-item-text">Characters</span>
                </md-list-item>
                
                <md-list-item @click="onProfileClick" :active="profileButtonIsActive">
                    <md-icon>build</md-icon>
                    <span class="md-list-item-text">Profile</span>
                </md-list-item>
                
                <md-list-item @click="onLogOut">
                    <md-icon>system_update_alt</md-icon>
                    <span class="md-list-item-text">Log out</span>
                </md-list-item>
            </md-list>
        </md-app-drawer>
        
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
            this._tid = -1;

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
                this._tid !== -1 && clearTimeout(this._tid);
                this._tid = setTimeout(function () {
                    this._tid = -1;
                    this.$refs.contentRef.refresh();
                }.bind(this), 150)

            },
            onMenuClosed: function () {
                this._tid !== -1 && clearTimeout(this._tid);
                this._tid = setTimeout(function () {
                    this._tid = -1;
                    this.$refs.contentRef.refresh();
                }.bind(this), 150)
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



