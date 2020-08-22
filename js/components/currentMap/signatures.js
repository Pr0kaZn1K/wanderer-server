var template = `

<div>
    <div v-if="enable == true">
        <md-content class="kek c-small-table-cell">
            <div v-if="signatures.length > 0">
            <md-table ref="signaturesTable" v-model="signatures" md-sort="email" md-sort-order="asc" md-card md-fixed-header md-height="600px" @md-selected="onSelect" >                                      
                <md-table-row ref="tableRows" slot="md-table-row" slot-scope="{ item }" md-auto-select md-selectable="multiple">
                    <md-table-cell md-label="id" md-sort-by="id" width="40" style="white-space: nowrap">{{ item.id }}</md-table-cell>
                    <md-table-cell md-label="type" md-sort-by="type" width="100">{{ item.type }}</md-table-cell>
                    <md-table-cell md-label="name" md-sort-by="name">{{ item.name }}</md-table-cell>
                    <md-table-cell md-label="created" md-sort-by="created" width="60">
                        <c-time-left :c-date="new Date(item.created)"></c-time-left>
                    </md-table-cell>
                </md-table-row>
            </md-table>
            </div>
            
            <md-content v-if="signatures.length == 0" class="md-card" style="padding: 10px 0">
                <md-empty-state
                md-rounded
                md-icon="announcement"
                md-label="No signatures"
                md-description="Just paste (ctrl + v) for update signatures.">
              </md-empty-state>
            </md-content>
           
            <transition name="c-fade"> 
                <md-toolbar v-if="selected.length > 0" md-elevation="0" class="c-table-toolbar" style="padding: 0 10px;">
                    <div class="md-toolbar-section-start">Signatures selected - {{selected.length}}</div>
                    
                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button" @click="onClickDeleteSignatures">
                            <md-icon>delete</md-icon>
                        </md-button>
                    </div>
                </md-toolbar>
            </transition>
        
        </md-content>
        
        <div style="width: 1000px;">
            <md-dialog :md-active.sync="saveSigsDialogActive">
                <md-dialog-title>Found non exists signatures</md-dialog-title>
                
                <md-content style="margin: 0 20px;">Do you want to remove non exists signatures?</md-content>
                
                <md-dialog-actions>
                    <md-button class="md-primary" @click="onUpdateAllSigs">Update all</md-button>
                    <md-button class="md-primary md-accent" @click="onUpdateNonExists">Remove it</md-button>
                </md-dialog-actions>
            </md-dialog>
        </div>
        
        <input type="text" class="c-hidden-input"">
    </div>
</div>
        
`;

(function () {
    var componentId = "components/currentMap/signatures";

    var deps = [
        "env/query",
        "env/promise",
        "env/tools/print_f",
        "env/sizeObserver",
        "env/tabObserver",
    ];

    define(componentId, deps, function () {
        var query         = require("env/query");
        var CustomPromise = require("env/promise");
        var printf        = require("env/tools/print_f");
        var SizeObserver  = require("env/sizeObserver");
        var TabObserver   = require("env/tabObserver");

        Vue.component("Signatures", {
            props: [

            ],
            data: function () {
                return {
                    saveSigsDialogActive: false,
                    signatures: [],
                    selected: [],
                    enable: true
                }
            },
            template: template,
            mounted: function () {
                this._rtid = -1;
                this._so = new SizeObserver(this.refresh.bind(this));
                this._to = new TabObserver();
                this._to.on("out", this._onTabOut.bind(this));
                this._to.on("in", this._onTabIn.bind(this));

                this.initialize().then(function() {

                }.bind(this),function() {
                    debugger;
                }.bind(this));

                this._hiddenInput = this.$el.querySelector(".c-hidden-input");
                this._hiddenInput.addEventListener("paste", this.onPaste.bind(this));
            },
            beforeDestroy: function () {
                this._rtid !== -1 && clearTimeout(this._rtid);
                this._rtid = -1;
                this.mapId = null;
                this.systemId = null;
                this._so.destructor();
                this._to.destructor();
            },
            methods: {


                refresh: function () {
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

                    return pr.native;
                },

                // Custom
                _onTabOut: function () {
                    this.enable = false;
                },
                _onTabIn: function () {
                    this.enable = true;
                },

                onSelect (items) {
                    this.selected = items
                },
                onClickDeleteSignatures: function (){
                    var out = [];
                    for (var a = 0; a < this.signatures.length; a++) {
                        var oldSig = this.signatures[a];
                        if(!this.selected.searchByObjectKey("id", oldSig.id)) {
                            out.push(oldSig);
                        }
                    }
                    api.eve.map.updateSystem(this.mapId, this.systemId, {
                        signatures: out
                    });
                },

                /**
                 * Just save as is signatures
                 */
                onUpdateAllSigs: function () {
                    var out = [];
                    for (var a = 0; a < this.signatures.length; a++) {
                        var oldSignature = this.signatures[a];
                        var updatedSignature = this.currentWaitSaveData.updatedSignatures.searchByObjectKey("id", oldSignature.id);

                        if(updatedSignature)
                            out.push(updatedSignature);
                        else
                            out.push(oldSignature);
                    }

                    out = out.concat(this.currentWaitSaveData.newSignatures);

                    api.eve.map.updateSystem(this.mapId, this.systemId, {
                        signatures: out
                    });
                    this.saveSigsDialogActive = false;
                },
                /**
                 * Remove non exists signatures from updated
                 */
                onUpdateNonExists: function () {
                    api.eve.map.updateSystem(this.mapId, this.systemId, {
                        signatures: this.currentWaitSaveData.updatedSignatures.concat(this.currentWaitSaveData.newSignatures)
                    });
                    this.saveSigsDialogActive = false;
                },

                load: function (_mapId, _systemId) {
                    this.mapId = _mapId;
                    this.systemId = _systemId;
                    this.focus();
                },
                update: function (_signatures) {
                    this.selected = [];
                    this.signatures = _signatures;

                    // if(this.le) {
                    //     this.le.stop();
                    // }
                    //
                    // this.le = new LazyEach(_signatures, function (_el) {
                    //     this.signatures.push(_el);
                    // }.bind(this));
                    // this.le.start();
                },

                focus: function () {
                    this._hiddenInput.focus();
                },
                onPaste: function (_event) {
                    var text = _event.clipboardData.getData("text");

                    var sigs = signaturesParser(text);

                    if(sigs.length === 0)
                        return;

                    var result = this._processSignatures(sigs);

                    if(result.nonExistingSignatures.length > 0) {
                        // we need remove it from updated and show dialog
                        this.saveSigsDialogActive = true;
                        this.currentWaitSaveData = result;
                    } else {
                        api.eve.map.updateSystem(this.mapId, this.systemId, {
                            signatures: result.updatedSignatures.concat(result.newSignatures)
                        });
                    }
                },

                _processSignatures: function (_signatures) {
                    var nonExistingSignatures = [];

                    for (var a = 0; a < this.signatures.length; a++) {
                        var oldSignature = this.signatures[a];

                        if(!_signatures.searchByObjectKey("id", oldSignature.id))
                            nonExistingSignatures.push(oldSignature.id);
                    }

                    var updatedSignatures = [];
                    var newSignatures = [];

                    for (var a = 0; a < _signatures.length; a++) {
                        var signature = _signatures[a];

                        var oldSig = this.signatures.searchByObjectKey("id", signature.id);

                        if(oldSig) {
                            updatedSignatures.push({
                                id: oldSig.id,
                                kind: signature.kind,
                                type: signature.type,
                                name: signature.name,
                                description: signature.description,
                                created: oldSig.created
                            })
                        } else {
                            newSignatures.push(signature);
                        }
                    }

                    return {
                        nonExistingSignatures: nonExistingSignatures,
                        updatedSignatures: updatedSignatures,
                        newSignatures: newSignatures,
                    }
                }
            }
        });

        var innerRefresh = function () {
            this._rtid = -1;

            fixTable.call(this);
        };

        // this is need for correct table headers
        // and this is work
        var fixTable = function () {
            var damnedTable = this.$refs.signaturesTable;

            if(!damnedTable)
                return;

            damnedTable.setHeaderPadding();
            damnedTable.setWidth();

            // this is incredible bullshit
            var damnedRows = damnedTable.$children[0].$children[damnedTable.$children[0].$children.length - 2];

            var damnedChildren = damnedRows.$children;
            for (var a = 1; a < damnedChildren.length; a++) {
                var child = damnedChildren[a];
                child.setWidth();
            }
        }

        var rx = /([A-Z]{3}-[0-9]{3})\s(\w+\s\w+)\s(|\w+\s\w+)\s(|[A-Za-z\s]+)\s/gm;
        var signaturesParser = function (_value) {
            var outArr = [];
            var itr = _value.matchAll(rx);

            var result = itr.next();
            while(!result.done) {

                var type = result.value[3];

                var kind = result.value[2];
                if(kind === "Unstable Wormhole") {
                    kind = "Wormhole"
                }

                outArr.push({
                    id: result.value[1],
                    kind: kind,
                    type: type ? type.split(" ")[0] : "Signature",
                    name: result.value[4],
                    description: "",
                    created: new Date().toUTCString()
                });
                result = itr.next();
            }

            return outArr;
        }
    });
})(window);
