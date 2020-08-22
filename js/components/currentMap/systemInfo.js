var template = `

<div>
    <md-card class="">
        <md-card-header>
            <div class="md-subhead">System information</div>
        </md-card-header>
        
        <md-card-content>
            <div class="flex flex-justify">
                <div class="half-w">
                    <div class="flex flex-justify" >
                        <span class="text-color-secondary" >System</span>
                        <span>{{systemName}}</span>
                    </div>
                    <div class="flex flex-justify">
                        <span class="text-color-secondary" >Region</span>
                        <div>{{regionName}}</div>
                    </div>
                    <div class="flex flex-justify">
                        <span class="text-color-secondary" >Constellation</span>
                        <div>{{constellationName}}</div>
                    </div>
                    <div class="flex flex-justify" >
                        <span class="text-color-secondary" >Type</span>
                        <div>
                            <span :class="kindClass">{{kind}}</span> <span v-if="type != null">(<span :class="typeClass">{{type}}</span>)</span>
                        </div>
                    </div>
                    <div class="flex flex-justify">
                        <span class="text-color-secondary">Security</span>
                        <div :class="securityClass">{{security}}</div>
                    </div>
                    <div class="flex flex-justify" v-if="statics.length > 0">
                        <span class="text-color-secondary">Statics</span>
                        <div class="text-right">
                            <div v-for="static in statics">
                                <span>{{static.id}}</span>
                                (<span :class="getStaticClassColor(static.leadTo)">{{static.leadTo}}</span>)
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-justify" v-if="showEffect">
                        <span class="text-color-secondary">Effect</span>
                        <div><span :class="effectColor">{{effectName}}</span></div>
                    </div>
                </div>
                <div style="margin: 0 10px;border-left: 1px solid #efefef;border-right: 1px solid #d6d6d6;"></div>
                <div class="half-w">
                
                </div>
            </div>
        </md-card-content>
    </md-card>
   
</div>
    
`;

(function () {
    var componentId = "components/currentMap/systemInfo";

    var deps = [
        "env/query",
        "env/promise",
        "env/tools/print_f",
        "env/tools/exist",
        "env/sizeObserver",
    ];

    define(componentId, deps, function () {
        var query         = require("env/query");
        var CustomPromise = require("env/promise");
        var printf        = require("env/tools/print_f");
        var exists        = require("env/tools/exist");
        var SizeObserver  = require("env/sizeObserver");

        Vue.component("SystemInfo", {
            props: [

            ],
            data: function () {
                return {
                    saveSigsDialogActive: false,
                    signatures: [],
                    selected: [],

                    regionName: "",
                    constellationName: "",
                    systemName: "",
                    kind: "",
                    kindClass: "",
                    type: null,
                    typeClass: "",
                    security: "",
                    securityClass: "",
                    statics: [],

                    showEffect: false,
                    effectColor: "",
                    effectName: ""
                }
            },
            template: template,
            mounted: function () {
                this._rtid = -1;
                // this._so = new SizeObserver(this.refresh.bind(this));

                this.initialize().then(function() {

                }.bind(this),function() {
                    debugger;
                }.bind(this));

                // this._hiddenInput = this.$el.querySelector(".c-hidden-input");
                // this._hiddenInput.addEventListener("paste", this.onPaste.bind(this));
            },
            beforeDestroy: function () {
                // this._rtid !== -1 && clearTimeout(this._rtid);
                // this._rtid = -1;
                // this.mapId = null;
                // this.systemId = null;
                // this._so.destructor();
            },
            methods: {
                getStaticClassColor: function (_staticClass) {
                    return typeClasses[_staticClass];
                },

                refresh: function () {
                    // this._rtid !== -1 && clearTimeout(this._rtid);
                    // this._rtid = setTimeout(innerRefresh.bind(this), 10);
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

                    return pr.native;
                },

                update: function (_data) {
                    this.systemName = _data.name;
                    this.regionName = _data.regionName;
                    this.constellationName = _data.constellationName;
                    this.security = _data.security;
                    this.statics = _data.systemData.statics || [];
                    this.securityClass = securityClasses[_data.security];

                    switch (_data.systemType) {
                        case 0: // high-sec
                            this.kind = "High-sec";
                            this.kindClass = kindClassed[_data.systemType];
                            this.type = null;
                            break;
                        case 1: // low-sec
                            this.kind = "Low-sec";
                            this.kindClass = kindClassed[_data.systemType];
                            this.type = null;
                            break;
                        case 2: // null-sec
                            this.kind = "Null-sec";
                            this.kindClass = kindClassed[_data.systemType];
                            this.type = null;
                            break;
                        case 3: // WH
                        case 4: // Thera
                            this.kind = "W-Space";
                            this.kindClass = kindClassed[_data.systemType];
                            this.type = _data.systemData.typeName;
                            this.typeClass = typeClasses[_data.systemData.typeName];
                            break;
                        case 5: // abyss
                            this.kind = "Abyss-Space";
                            this.kindClass = kindClassed[_data.systemType];
                            this.type = _data.systemData.typeName;
                            break;
                        case 6: // penalty?
                            this.kind = "Penalty-Space";
                            this.kindClass = kindClassed[_data.systemType];
                            this.type = _data.systemData.typeName;
                            break;
                    }

                    // this.showEffect = false;

                    if(_data.systemType === 3 && exists(_data.systemData.effectType)) {
                        this.showEffect = true;
                        this.effectColor = `text-eve-wh-effect-color-${_data.systemData.effectType}`;
                        this.effectName = _data.systemData.effectName;
                    } else {
                        this.showEffect = false;
                    }

                    // debugger;
                }
            }
        });


        var securityClasses = {
            "1.0": "eve-security-color-10",
            "0.9": "eve-security-color-09",
            "0.8": "eve-security-color-08",
            "0.7": "eve-security-color-07",
            "0.6": "eve-security-color-06",
            "0.5": "eve-security-color-05",
            "0.4": "eve-security-color-04",
            "0.3": "eve-security-color-03",
            "0.2": "eve-security-color-02",
            "0.1": "eve-security-color-01",
            "0.0": "eve-security-color-00",
            "-0.1": "eve-security-color-m-01",
            "-0.2": "eve-security-color-m-02",
            "-0.3": "eve-security-color-m-03",
            "-0.4": "eve-security-color-m-04",
            "-0.5": "eve-security-color-m-05",
            "-0.6": "eve-security-color-m-06",
            "-0.7": "eve-security-color-m-07",
            "-0.8": "eve-security-color-m-08",
            "-0.9": "eve-security-color-m-09",
            "-1.0": "eve-security-color-m-10"
        }

        var typeClasses = {
            "C1"      : "eve-wh-type-color-c1",
            "C2"      : "eve-wh-type-color-c2",
            "C3"      : "eve-wh-type-color-c3",
            "C4"      : "eve-wh-type-color-c4",
            "C5"      : "eve-wh-type-color-c5",
            "C6"      : "eve-wh-type-color-c6",
            "C13"     : "eve-wh-type-color-c13",
            "drifter" : "eve-wh-type-color-drifter",
            "Thera"   : "eve-wh-type-color-thera",
            "High"    : "eve-wh-type-color-high",
            "Low"     : "eve-wh-type-color-low",
            "Null"    : "eve-wh-type-color-null",
        };

        var kindClassed = {
            "0" : "eve-kind-color-high",
            "1" : "eve-kind-color-low",
            "2" : "eve-kind-color-null",
            "3" : "eve-kind-color-wh",
            "4" : "eve-kind-color-thera",
            "5" : "eve-kind-color-abyss",
            "6" : "eve-kind-color-penalty",
        }

    });
})(window);
