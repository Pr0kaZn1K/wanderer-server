var template = `

<div>
    <div class="md-content relative md-home-maps-search-content" style="padding-right: 65px">
        <md-autocomplete
            v-model="currentValue"
            :md-options="searchList"
            md-layout="box"
            @md-selected="currentValue = $event.name; onElementSelected($event)"
            @md-changed="onElementChanged"
            @md-opened="onACOpened"
            md-dense
        >
           
           <label><md-icon>search</md-icon>Search alliances</label>
            
           <template slot="md-autocomplete-item" slot-scope="{ item, term }">
               <md-highlight-text :md-fuzzy-search="false" :md-term="term">{{ item.name }}</md-highlight-text>
           </template>
           
          <template slot="md-autocomplete-empty" slot-scope="{ term }">
               Such character {{ term }} not exist!
           </template>
        </md-autocomplete>
        
        <md-button 
            class="md-raised md-mini md-fab absolute top right" 
            :disabled="buttonDisabled"
            @click="onElementAddButtonClicked"
        >  
            <md-icon>add</md-icon>  
        </md-button>
    </div>
    
    <md-table class="c-custom-table" style="height: 400px" md-card @md-selected="onRowsSelected" v-model="elements">
        <md-table-toolbar>
            <h1 class="md-title">Alliances is allowed to see the map</h1>
        </md-table-toolbar>
        
        <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
            <div class="md-toolbar-section-start">Alliances selected - {{count}}</div>
            
            <div class="md-toolbar-section-end">
                <md-button class="md-icon-button" @click="onDeleteRows">
                    <md-icon>delete</md-icon>
                </md-button>
            </div>
        </md-table-toolbar>
        
        <md-table-row slot-scope="{ item }" class="cursor-pointer" md-auto-select md-selectable="multiple" slot="md-table-row">
            <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
        </md-table-row>
    </md-table>    
</div>

`;

(function () {
    var componentId = "components/searchers/alliancesSearcher";

    var deps = [
        "env/promise",
        "env/spamFilter"
    ];

    define(componentId, deps, function () {
        var CustomPromise = require("env/promise");
        var SpamFilter    = require("env/spamFilter");

        Vue.component("alliancesSearcher", {
            props: [

            ],
            data: function () {
                return {
                    currentValue: "",
                    elements: [],
                    buttonDisabled: true,

                    searchList: []
                }
            },
            template: template,
            mounted: function () {
                this._passChange = false;
                this._spamFilter = new SpamFilter(this._makeSearch.bind(this), 500);
            },
            methods: {
                onACOpened: function (_event){
                    this.onElementChanged(_event);

                    setTimeout(function () {
                        window.dispatchEvent(new Event('resize'));
                    }.bind(this), 10)
                },
                onElementSelected: function (_event) {
                    this._passChange = true;
                    this.formDefaultGroupItem = _event;
                    this.buttonDisabled = false;
                },
                onElementChanged: function (_event) {
                    if(this._passChange){
                        this._passChange = false;
                        return;
                    }

                    if(this.currentValue.length > 2) {
                        var pr = new CustomPromise();
                        this.searchList = pr.native
                        this._spamFilter.call(this.currentValue, pr);
                    } else {
                        this.searchList = [];
                    }
                },
                onElementAddButtonClicked: function (_event) {
                    if(!this.elements.searchByObjectKey("id", this.formDefaultGroupItem.id)) {
                        this.elements.push(this.formDefaultGroupItem);
                        this.buttonDisabled = true;
                        this.currentValue = "";
                    }
                },
                onRowsSelected: function (_selectedGroups) {
                    this.elementsSelected = _selectedGroups;
                },
                onDeleteRows: function (_selectedGroups) {
                    for (var a = 0; a < this.elementsSelected.length; a++) {
                        this.elements.eraseByObjectKey("id", this.elementsSelected[a].id);
                    }
                    this.elementsSelected = [];
                },
                _makeSearch: function (_match, _pr) {
                    api.eve.alliance.fastSearch({match: _match}).then(function (_result) {
                        _pr.resolve(_result);
                    }.bind(this), function () {
                        debugger;
                    }.bind(this))
                },
                getElements: function () {
                    return this.elements;
                },
                setElements: function (_elements) {
                    this.elements = _elements;
                }
            }
        });

    });
})(window);

