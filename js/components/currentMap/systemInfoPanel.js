var template = `

<div>
       
    <c-popup 
        @mousedown="focus" @mouseup="focus"
        ref="infoPanel" 
        :c-activated.sync="showPopup" 
        :c-width="panelWidth" 
        :c-height="panelHeight" 
        :c-title="panelTitle"
        :c-offset-x="10" 
        :c-offset-y="75" 
        c-horizontal-alignment="right"
        @c-closed="onPopupClosed"
    >
        <md-tabs v-if="enabled" @md-changed="onTabChange" class="fh">
            <md-tab id="tab-overview" md-label="Overview"  exact>
                <component v-if="enabled" ref="systemInfo" :is="systemInfoComponent"></component>
            </md-tab>
            
            <md-tab id="tab-signatures" md-label="Signatures">
                <component v-if="enabled" ref="signatures" :is="signaturesComponent"></component>
            </md-tab>     
            
            <md-tab id="tab-online" md-label="Online">
                Coming soon...
            </md-tab>           
        </md-tabs>
    </c-popup>
    
</div>
        
`;

(function () {
    var componentId = "components/currentMap/systemInfoPanel";

    var deps = [
        "env/promise",
        "env/tools/print_f",
        "env/tools/extend",
        "env/sizeObserver",
    ];

    define(componentId, deps, function () {
        var CustomPromise = require("env/promise");
        var printf        = require("env/tools/print_f");
        var extend        = require("env/tools/extend");
        var SizeObserver  = require("env/sizeObserver");

        Vue.component("systemInfoPanel", {
            props: [

            ],
            data: function () {
                return {
                    signaturesComponent: "",
                    systemInfoComponent: "",

                    enabled: false,
                    showPopup: false,
                    panelWidth: 200,
                    panelHeight: 200,
                    panelTitle: "Default info title",
                    currentTab: "tab-overview",
                }
            },
            template: template,
            mounted: function () {
                this.currentSystemData = {}
                this._rtid = -1;
                this.mapId = null;
                this.systemId = null;
                this._so = new SizeObserver(this.refresh.bind(this));

                this.initialize().then(function() {

                }.bind(this),function() {
                    debugger;
                }.bind(this));
            },
            beforeDestroy: function () {
                this.showPopup = false;
                this._rtid !== -1 && clearTimeout(this._rtid);
                this._rtid = -1;
                this.mapId = null;
                this.systemId = null;
                this._so.destructor();
                this._so = null;
                this.enabled = false;
                this.signaturesComponent = "";
                this.isLoaded = false;
                this.currentSystemData = null;
                this.panelTitle = "";
                window.focus();
            },
            methods: {
                // API
                refresh: function () {
                    if(!this.showPopup)
                        return;

                    this._rtid !== -1 && clearTimeout(this._rtid);
                    this._rtid = setTimeout(innerRefresh.bind(this), 10);
                },

                initialize: function () {
                    var pr = new CustomPromise();

                    this.requireComponents().then(function () {
                        this.isLoaded = true;
                        pr.resolve();
                    }.bind(this), function (_err) {
                        pr.reject(_err);
                    }.bind(this));

                    return pr.native;
                },
                requireComponents: function () {
                    var pr = new CustomPromise();

                    pr.resolve();
                    var prarr = [];
                    prarr.push(componentController.load("signatures"));
                    prarr.push(componentController.load("systemInfo"));
                    Promise.all(prarr).then(function () {
                        this.signaturesComponent = "signatures";
                        this.systemInfoComponent = "systemInfo";
                        pr.resolve();
                    }.bind(this), function (_err) {
                        pr.reject(_err);
                    }.bind(this));

                    return pr.native;
                },

                // Custom
                onPopupClosed: function () {
                    this.enabled = false;

                    this.$emit("closed");
                },
                show: function (_mapId, _systemId) {
                    this.enabled = true;

                    this.mapId = _mapId;
                    this.systemId = _systemId;
                    this.focus();
                },
                hide: function () {
                    this.showPopup && (this.showPopup = false);
                    this._rtid !== -1 && clearTimeout(this._rtid);
                    this._rtid = -1;
                    this.enabled = false;
                    window.focus();
                },
                update: function (_data) {
                    this.currentSystemData = extend(this.currentSystemData, _data);
                    this.showPopup = true;
                    this.panelTitle = printf("%s", this.currentSystemData.name);

                    switch (this.currentTab) {
                        case "tab-overview":
                            this.$refs.systemInfo.update(this.currentSystemData);
                            break;
                        case "tab-signatures":
                            this.$refs.signatures.update(this.currentSystemData.signatures);
                            break;
                    }

                    setTimeout(function () {
                        this.refresh();
                    }.bind(this), 100);
                },

                onTabChange: function (_tabName) {
                    if(_tabName === undefined)
                        return;

                    this.currentTab = _tabName;

                    switch (_tabName) {
                        case "tab-overview":
                            this.$refs.systemInfo.update(this.currentSystemData);
                            break;
                        case "tab-signatures":
                            this.$refs.signatures.load(this.mapId, this.systemId);
                            this.$refs.signatures.update(this.currentSystemData.signatures);
                            break;

                    }
                    this.refresh();
                },
                focus: function () {
                    this.$nextTick(function () {
                        switch (this.currentTab) {
                            case "tab-signatures":
                                this.$refs.signatures.focus();
                                break;
                            default:
                                window.focus();
                        }
                    }.bind(this));

                }
            }
        });

        var innerRefresh = function () {
            this._rtid = -1;

            var bounds = document.body.getBoundingClientRect();
            this.panelWidth = bounds.width * 0.4 < 500 ? 500 : bounds.width * 0.45;
            this.panelHeight = bounds.height - 85;

            switch(this.currentTab) {
                case "tab-signatures":
                    this.$refs.signatures.refresh();
                    break;
            }
        };


    });
})(window);
