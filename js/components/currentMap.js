var template = `

<div class="fs relative" style="height: calc(100% - 7px)">
    <div v-if="isLoaded" class="fs relative">
        <div v-if="!showMapEmpty" class="fs relative">            
            <div id="mapContainer" class="fs relative" @contextmenu="onMapContainerContext">
                
            </div>
            
            <div style="height: 0; width: 150px; top: 0px;" class="absolute md-layout-item">
                <md-field>
                    <label for="selectedMap">Select a map...</label>
                    <md-select v-model="selectedMap" name="selectedMap" id="selectedMap" md-dense @md-selected="onMapSelected($event)">
                        <md-option v-for="item in allowedMaps" :value="item.id">{{item.name}}</md-option>
                    </md-select>
                </md-field>
            </div>
            
            <md-speed-dial class="md-bottom-left" md-direction="top" style="margin-left: -20px; margin-bottom: -25px">
                <md-speed-dial-target class="md-hover">
                    <md-icon class="md-morph-initial">settings</md-icon>
                    <md-icon class="md-morph-final">edit</md-icon>
                </md-speed-dial-target>
                
                <md-speed-dial-content>
                    <md-button class="md-icon-button" @click="onSaveClick">
                        <md-icon>save</md-icon>
                    </md-button>
                    
                    <md-button class="md-icon-button" :class="{ 'md-accent': isAutoAlignment }" @click="onAAClick">
                        <md-icon>scatter_plot</md-icon>
                    </md-button>
                </md-speed-dial-content>               
              
            </md-speed-dial>
            
        </div>
        
        <md-empty-state 
            v-if="showMapEmpty"
            md-icon="map"
            md-label="Unfortunately, maps not found"
            md-description="But you can change it! Just do it... Use mapper functional for create maps, groups and attach your characters."
        >
            <md-button class="md-primary md-raised" href="?page=home&item=maps">Create map</md-button>
        </md-empty-state>
    </div>
    <div style="height: 0px">
        <component ref="systemInfoPanel" :is="systemInfoPanelComponent" ></component>
        
        <c-context-menu :c-activated.sync="linkCMActive" :c-offset-x="linkCMOffsetX" :c-offset-y="linkCMOffsetY" @c-closed="onClosedLinkContext">
            <md-content class="c-context-item md-hover" @click="onLinkContextMenuEdit">
                <span>Edit connection</span>
                <md-icon class="md-primary">edit</md-icon>
            </md-content>
            
            <md-content class="c-context-item md-hover" @click="onLinkContextMenuRemove">
                <span>Disconnect connection</span>
                <md-icon class="md-accent">delete</md-icon>
            </md-content>
        </c-context-menu>
        
        <c-context-menu :c-activated.sync="systemsCMActive" :c-offset-x="systemsCMOffsetX" :c-offset-y="systemsCMOffsetY" @c-closed="onClosedSystemsContext">
            <md-content class="c-context-item md-hover" @click="onSystemsContextMenuRemove">
                <span >Remove systems</span>
                <md-icon class="md-accent">delete</md-icon>
            </md-content>
        </c-context-menu> 
        
        <c-context-menu :c-activated.sync="systemCMActive" :c-offset-x="systemCMOffsetX" :c-offset-y="systemCMOffsetY" @c-closed="onClosedSystemContext">
            <md-content class="c-context-item md-hover" @click="onSystemContextMenuEdit">
                <span >Edit system</span>
                <md-icon class="md-primary">edit</md-icon>
            </md-content>
            
            <md-content class="c-context-item md-hover" v-if="!systemContextMenuLockedItem" @click="onSystemContextMenuLock">
                <span>Lock system</span>
                <md-icon class="md-accent">lock</md-icon>
            </md-content>
            
            <md-content class="c-context-item md-hover" v-if="systemContextMenuLockedItem" @click="onSystemContextMenuUnlock">
                <span >Unlock system</span>
                <md-icon class="md-primary">lock_open</md-icon>
            </md-content>
            
            <md-content class="c-context-item md-hover" v-if="!systemContextMenuLockedItem" @click="onSystemContextMenuRemove">
                <span >Remove system</span>
                <md-icon class="md-accent">delete</md-icon>
            </md-content>
        </c-context-menu> 
       
    </div>
    <c-area-selection v-on:c-selection-completed="onSelectionCompleted" @c-selection-started="onSelectionStarted"></c-area-selection>
</div>

        `;

(function () {
    var componentId = "components/currentMap";

    var deps = [
        "core/map",
        "env/promise",
        "env/tools/class",
        "env/tools/emitter",
        "env/tools/exist",
        "env/tools/extend",
        "env/tools/print_f",
    ];

    define(componentId, deps, function () {
        var Map           = require("core/map");
        var CustomPromise = require("env/promise");
        var classCreator  = require("env/tools/class");
        var Emitter       = require("env/tools/emitter");
        var exist         = require("env/tools/exist");
        var extend        = require("env/tools/extend");
        var printf        = require("env/tools/print_f");

        Vue.component("currentMap", {
            props: [

            ],
            data: function () {
                return {
                    selectedMap: null,
                    allowedMaps: [],
                    showMapEmpty: false,
                    isLoaded: false,
                    systemContextMenuLockedItem: false,
                    isAutoAlignment: false,
                    systemInfoPanelComponent: "",

                    linkCMOffsetX: 0,
                    linkCMOffsetY: 0,
                    linkCMActive: false,

                    systemCMOffsetX: 0,
                    systemCMOffsetY: 0,
                    systemCMActive: false,

                    systemsCMActive: false,
                    systemsCMOffsetX: 0,
                    systemsCMOffsetY: 0,
                }
            },
            template: template,
            mounted: function () {
                this._currentOpenSystem = null;

                // this.createMap();
                this.initialize().then(function() {
                    if(this.selectedMap !== null) {
                        this.onMapSelected(this.selectedMap);
                    }
                }.bind(this),function() {
                    debugger;
                }.bind(this));
            },
            methods: {
                // API
                close: function () {
                    if(this.mapController) {
                        var map = this.mapController.map;
                        this.mapController && this.mapController.deinit();
                        map && map.destructor();
                        this.mapController = null
                    }
                    this.$refs.systemInfoPanel.hide();
                },
                refresh: function () {
                    this.mapController && this.mapController.map.refresh();
                },

                initialize: function () {
                    var pr = new CustomPromise();

                    var mapIds = [];
                    this.requireComponents().then(function () {
                        return api.eve.map.allowedMaps();
                    }.bind(this), function (_err) {
                        pr.reject(_err);
                    }.bind(this)).then(function (_mapIds) {
                        mapIds = _mapIds;
                        var prarr = [];

                        for (var a = 0; a < mapIds.length; a++) {
                            prarr.push(api.eve.map.info(mapIds[a]));
                        }

                        return Promise.all(prarr);
                    }.bind(this), function (_err) {
                        pr.reject(_err);
                    }.bind(this)).then(function (_arr) {
                        for (var a = 0; a < _arr.length; a++) {
                            _arr[a].id = mapIds[a];
                        }

                        this.allowedMaps = _arr;

                        this.isLoaded = true;
                        this.showMapEmpty = _arr.length === 0;

                        if(!this.showMapEmpty) {
                            this.selectedMap = _arr[0].id;
                        }
                        pr.resolve();
                    }.bind(this), function (_err) {
                        pr.reject(_err);
                    }.bind(this))

                    return pr.native;
                },
                requireComponents: function () {
                    var pr = new CustomPromise();

                    var prarr = [];
                    prarr.push(componentController.load("systemInfoPanel"));
                    Promise.all(prarr).then(function () {
                        this.systemInfoPanelComponent = "systemInfoPanel";

                        this.$nextTick(function () {
                            this.$refs.systemInfoPanel.$on("closed", this.onSystemInfoPanelClosed.bind(this));
                        }.bind(this))

                        pr.resolve();
                    }.bind(this), function (_err) {
                        pr.reject(_err);
                    }.bind(this));

                    return pr.native;
                },

                onSelectionCompleted: function (_event) {
                    this.mapController.setSelection(_event.leftTop, _event.rightBottom);
                },
                onSelectionStarted: function () {
                    this._offContexts();
                },

                onMapSelected: function(_mapId) {
                    this.selectedMap = _mapId;
                    this._destroyMap();
                    this._initMap(_mapId);
                },

                onAAClick: function () {
                    this.isAutoAlignment = !this.isAutoAlignment;

                    this.mapController.map.enableForce(this.isAutoAlignment);
                },

                onSaveClick: function () {
                    var positions = this.mapController.map.collectPositions();
                    api.eve.map.updateSystemsPosition(this.selectedMap, positions);
                },

                /**
                 * Will remove current map if it initialized
                 * @private
                 */
                _destroyMap: function () {
                    if(this.mapController) {
                        var map = this.mapController.map;
                        this.mapController && this.mapController.deinit();
                        map && map.destructor();
                        this.mapController = null
                    }
                },

                _initMap: function (_mapId) {
                    var bounds = this.$el.getBoundingClientRect();

                    this.mapController = new MapController(new Map({
                        container: document.querySelector("#mapContainer"),
                        width: bounds.width,
                        height: bounds.height
                    }), _mapId);

                    this.mapController.init();

                    this.mapController.on("linkContextMenu", this._onLinkContextMenu.bind(this));
                    this.mapController.on("systemContextMenu", this._onSystemContextMenu.bind(this));
                    this.mapController.on("systemsContextMenu", this._onSystemsContextMenu.bind(this));
                    this.mapController.on("systemOpenInfo", this._onSystemOpenInfo.bind(this));
                    this.mapController.on("systemChange", this._onSystemChange.bind(this));
                    this.mapController.on("dragStarted", this._onDragStarted.bind(this));
                    this.mapController.on("mapClicked", this._onMapClicked.bind(this));
                },
                _offContexts: function () {
                    this.systemsCMActive = false;
                    this.systemCMActive = false;
                    this.linkCMActive = false;
                },

                _onLinkContextMenu: function (_linkId, _event) {
                    this._offContexts();

                    this._currentContextLink = _linkId;
                    this.linkCMActive = true;
                    this.linkCMOffsetX = _event.x + 10;
                    this.linkCMOffsetY = _event.y + 10;
                },
                _onSystemContextMenu: function (_systemId, _event) {
                    this._offContexts();

                    this._currentContextSystem = _systemId;
                    this.systemCMActive = true;
                    var systemInfo = this.mapController.getSystem(this._currentContextSystem).info;
                    this.systemContextMenuLockedItem = systemInfo.isLocked;
                    this.systemCMOffsetX = _event.x + 10;
                    this.systemCMOffsetY = _event.y + 10;
                },
                _onSystemsContextMenu: function (_systemIds, _event) {
                    this._offContexts();

                    this._currentSelectedSystems = _systemIds;
                    this.systemsCMActive = true;
                    this.systemsCMOffsetX = _event.x + 10;
                    this.systemsCMOffsetY = _event.y + 10;
                },
                onClosedSystemsContext: function ( ){
                    this._currentSelectedSystems = [];
                },
                onSystemsContextMenuRemove: function () {
                    api.eve.map.systemsRemove(this.selectedMap, this._currentSelectedSystems);
                },
                onClosedSystemContext: function () {
                    this._currentContextSystem = null;
                },
                onClosedLinkContext: function () {
                    this._currentContextLink = null;
                },
                onSystemInfoPanelClosed: function () {
                    this._currentOpenSystem = null;
                },
                _onSystemOpenInfo: function (_systemId, _event) {
                    this._offContexts();
                    this.mapController.map.deselectAll();

                    if(this._currentOpenSystem === _systemId)
                        return;

                    this._currentOpenSystem = _systemId;
                    this.$refs.systemInfoPanel.show(this.mapController.mapId, _systemId);

                    this.$nextTick(function () {
                        this.$refs.systemInfoPanel.update(_event);
                    }.bind(this));
                },
                _onDragStarted: function () {
                    this._offContexts();
                },
                _onMapClicked: function () {
                    this.mapController.map.deselectAll();
                    this._offContexts();
                },
                onMapContainerContext: function (_event) {
                    _event.preventDefault();
                    _event.stopPropagation();
                },
                onLinkContextMenuEdit: function() {

                },
                onLinkContextMenuRemove: function () {
                    api.eve.map.linkRemove(this.selectedMap, this._currentContextLink);
                },
                onSystemContextMenuEdit: function() {

                },
                onSystemContextMenuRemove: function() {
                    api.eve.map.systemRemove(this.selectedMap, this._currentContextSystem);
                },
                onSystemContextMenuLock: function () {
                    api.eve.map.updateSystem(this.selectedMap, this._currentContextSystem, {
                        isLocked: true
                    });
                },
                onSystemContextMenuUnlock: function () {
                    api.eve.map.updateSystem(this.selectedMap, this._currentContextSystem, {
                        isLocked: false
                    });
                },

                _onSystemChange: function (_data) {
                    switch (_data.type) {
                        case "removed":
                            if(_data.systemId === this._currentOpenSystem)
                                this.$refs.systemInfoPanel.hide();

                            break;
                        case "systemUpdated":
                            if(_data.systemId === this._currentOpenSystem)
                                this.$refs.systemInfoPanel.update(_data.data);
                            break;
                        case "bulk":
                        case "updatedSystemsPosition":
                        case "add":
                            break;
                    }
                }
            }
        });

        var MapController = classCreator("MapController", Emitter, {
            constructor: function (_map, _mapId) {
                Emitter.prototype.constructor.call(this);

                this.map = _map;
                this.mapId = _mapId;

                this.systems = Object.create(null);
                this.links = Object.create(null);

                this._inited = false;
            },
            init: function () {
                // we must subscribe on map systems and links
                this._systemsSubscription = api.eve.map.subscribeMapSystems(this.mapId);
                this._systemsSubscription.on("change", this._onSystemSubscriptionChange.bind(this));

                // we must subscribe on map systems and links
                this._linksSubscription = api.eve.map.subscribeMapLinks(this.mapId);
                this._linksSubscription.on("change", this._onLinksSubscriptionChange.bind(this));

                this.map.on("linkContextMenu", this._onLinkContextMenu.bind(this));
                this.map.on("systemContextMenu", this._onSystemContextMenu.bind(this));
                this.map.on("markerClicked", this.onMarkerClicked.bind(this));
                this.map.on("dragStarted", this.emit.bind(this, "dragStarted"));
                this.map.on("mapClicked", this.emit.bind(this, "mapClicked"));
                this.map.clear();

                this._systemsSubscription.subscribe().then(function () {
                    this._linksSubscription.subscribe();
                }.bind(this))

                this._inited = true;
            },
            deinit: function () {
                this._inited = false;
                this.map = null;

                this._systemsSubscription.unsubscribe();
                this._linksSubscription.unsubscribe();

                for (var systemId in this.systems)
                    this.systems[systemId].deinit();

                for (var links in this.links)
                    this.links[links].deinit();

                this.systems = Object.create(null);
                this.links = Object.create(null);
            },
            setSelection: function (_leftTop, _rightBottom) {
                this.map.deselectAll();
                var lt = this.map.getVirtualBy(_leftTop);
                var rb = this.map.getVirtualBy(_rightBottom);

                var result = this.map.getMarkersAndLinksByArea(lt, rb);
                for (var a = 0; a < result.length; a++) {
                    this.map.setSelectMarker(result[a], true);
                }
            },
            _onSystemSubscriptionChange: function (_data) {
                var onlineCharacters;

                if(!this._inited)
                    return;

                switch (_data.type) {
                    case "systemUpdatedList":
                        _data.list.map(function (_event) {
                            this._onSystemSubscriptionChange(_event)
                        }.bind(this));
                        break;
                    case "bulk":
                        for (var a = 0; a < _data.list.length; a++) {
                            this.systems[_data.list[a].id] = new SolarSystem(this, this.map, this.mapId, _data.list[a].id);
                            this.systems[_data.list[a].id].updateInfo(_data.list[a]);
                            this.systems[_data.list[a].id].init();
                        }
                        break;
                    case "add":
                        this.systems[_data.systemInfo.id] = new SolarSystem(this, this.map, this.mapId, _data.systemInfo.id);
                        this.systems[_data.systemInfo.id].updateInfo(_data.systemInfo);
                        this.systems[_data.systemInfo.id].init();
                        break;
                    case "removed":
                        if(this.systems[_data.systemId]) {
                            this.systems[_data.systemId].deinit();
                            delete this.systems[_data.systemId];
                        }
                        break;
                    case "updatedSystemsPosition":
                        for (var a = 0; a < _data.systemsPosition.length; a++) {
                            var systemPosition = _data.systemsPosition[a];
                            if(this.systems[systemPosition.id]) {
                                this.systems[systemPosition.id].updatePosition(systemPosition);
                            }
                        }
                        break;
                    case "systemUpdated":
                        if(this.systems[_data.systemId]) {
                            this.systems[_data.systemId].updateInfo(_data.data);
                        }
                        break;
                    case "onlineUpdate":
                        if(this.systems[_data.systemId]) {
                            this.systems[_data.systemId].updateInfo({
                                onlineCount: _data.onlineCount
                            });
                        }
                        break;
                    case "userJoin":
                        onlineCharacters = this.systems[_data.systemId].info.onlineCharacters;
                        if(onlineCharacters) {
                            this.systems[_data.systemId].info.onlineCharacters.push(_data.characterId);
                            this.systems[_data.systemId].updateInfo({
                                onlineCharacters: this.systems[_data.systemId].info.onlineCharacters
                            });
                        }
                        break;
                    case "userLeave":
                        onlineCharacters = this.systems[_data.systemId].info.onlineCharacters;
                        if(onlineCharacters) {
                            onlineCharacters.removeByIndex(onlineCharacters.indexOf(_data.characterId));
                            this.systems[_data.systemId].updateInfo({
                                onlineCharacters: onlineCharacters
                            });
                        }
                        break;
                }

                this.emit("systemChange", _data);
            },
            _onLinksSubscriptionChange: function (_data) {
                if (!this._inited)
                    return;

                switch (_data.type) {
                    case "bulk":
                        api.eve.map.linkInfo(this.mapId, _data.list).then(function (_result) {
                            for (var a = 0; a < _result.length; a++) {
                                this.links[_result[a].id] = new Link(this, this.map, this.mapId, _result[a].id);
                                this.links[_result[a].id].updateInfo(_result[a]);
                                this.links[_result[a].id].init();
                            }
                        }.bind(this), function (_err) {
                            debugger;
                        }.bind(this));
                        break;
                    case "add":
                        api.eve.map.linkInfo(this.mapId, [_data.linkId]).then(function (_result) {
                            this.links[_data.linkId] = new Link(this, this.map, this.mapId, _data.linkId);
                            this.links[_data.linkId].updateInfo(_result[0]);
                            this.links[_data.linkId].init();
                        }.bind(this), function () {
                            debugger;
                        }.bind(this));
                        break;
                    case "removed":
                        if (this.links[_data.linkId]) {
                            this.links[_data.linkId].deinit();
                            delete this.links[_data.linkId];
                        }
                        break;
                }
            },
            _onLinkContextMenu: function (_linkId, _event) {
                this.emit("linkContextMenu", _linkId, _event)
            },
            _onSystemContextMenu: function (_systemId, _event) {
                var selectedSystems = this.map.selected();

                if(selectedSystems.indexOf(_systemId) === -1) {
                    this.map.deselectAll();
                    selectedSystems = [];
                }

                if(selectedSystems.length > 1) {
                    this.emit("systemsContextMenu", selectedSystems, _event);
                } else {
                    this.emit("systemContextMenu", _systemId, _event);
                }

            },
            onMarkerClicked: function (_systemId, _event) {
                this.emit("systemOpenInfo", _systemId, this.systems[_systemId].info);
            },
            getSystem: function (_systemId) {
                return this.systems[_systemId]
            }
        });

        var SolarSystem = classCreator("System", Emitter, {
            constructor: function (_controller, _map, _mapId, _systemId) {
                Emitter.prototype.constructor.call(this);

                this.controller = _controller;
                this.map = _map;
                this.mapId = _mapId;
                this.systemId = _systemId;
                this._inited = false;
                this.position = null;
                this.info = Object.create(null);
            },
            init: function () {
                this._inited = true;

                this.info.x = this.info.position.x;
                this.info.y = this.info.position.y;

                this.markerId = this.map.createMarker(this.systemId, this.info);
            },
            deinit: function () {
                if(exist(this.markerId)) {
                    this.map.removeMarker(this.markerId);
                }

                this._inited = false;
                this.map = null;
                this.controller = null;
            },
            setPosition: function (_position) {
                this.position = _position;
            },
            updateInfo: function (_info) {
                this.info = extend(this.info, _info);
                this._inited && this.map.updateMarker(this.markerId, this.info);
            },
            updatePosition: function (_position) {
                this.position = _position;
                this.map.updateMarker(this.markerId, {
                    position: _position
                })
            }
        })

        var Link = classCreator("Link", Emitter, {
            constructor: function (_controller, _map, _mapId, _linkId) {
                Emitter.prototype.constructor.call(this);

                this.controller = _controller;
                this.map = _map;
                this.mapId = _mapId;
                this.linkId = _linkId;
                this.uiLinkId = null;
                this.info = Object.create(null);
                this._inited = false;
            },
            init: function () {
                this._inited = true;
                var sourceMarkerId = this.controller.systems[this.info.solarSystemSource].markerId;
                var targetMarkerId = this.controller.systems[this.info.solarSystemTarget].markerId;
                this.uiLinkId = this.map.createLink(this.linkId, sourceMarkerId, targetMarkerId);
            },
            deinit: function () {
                if(exist(this.uiLinkId)) {
                    this.map.removeLink(this.uiLinkId);
                }

                this._inited = false;
                this.uiLinkId = null;
                this.info = Object.create(null);
                this.map = null;
                this.controller = null;
            },
            updateInfo: function (_info) {
                this.info = extend(this.info, _info);
            }
        })

    });
})(window);

