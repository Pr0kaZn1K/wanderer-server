var template = `

<div>
    <div class="md-content relative md-home-maps-search-content" style="padding-right: 65px">
        <md-autocomplete
            v-model="searchDefaultGroupValue"
            :md-options="searchList"
            md-layout="box"
            @md-selected="searchDefaultGroupValue = $event.name; onSearchDefaultGroupSelected($event)"
            @md-changed="onSearchDefaultGroupChanged"
            @md-opened="onACOpened"
            md-dense
        >
           
           <label><md-icon>search</md-icon> Select group</label>
            
           <template slot="md-autocomplete-item" slot-scope="{ item, term }">
               <md-highlight-text :md-fuzzy-search="false" :md-term="term">{{ item.name }}</md-highlight-text>
           </template>
        
           <template slot="md-autocomplete-empty" slot-scope="{ term }">
               Such group not exist "{{ term }}"!
           </template>
        </md-autocomplete>
        
        <md-button 
            class="md-raised md-mini md-fab absolute top right" 
            :disabled="searchAddButtonDisabled"
            @click="onSearchAddButtonClick"
        >  
            <md-icon>add</md-icon>  
        </md-button>
    </div>
    
    <md-table class="c-custom-table" style="height: 400px" md-card @md-selected="onRowsSelected" v-model="searchAttachedGroups">
        <md-table-toolbar>
            <h1 class="md-title">Groups attached to map</h1>
        </md-table-toolbar>
        
        <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
            <div class="md-toolbar-section-start">Groups selected - {{count}}</div>
            
            <div class="md-toolbar-section-end">
                <md-button class="md-icon-button" @click="onDeleteRows">
                    <md-icon>delete</md-icon>
                </md-button>
            </div>
        </md-table-toolbar>
        
        <md-table-row slot-scope="{ item }" class="cursor-pointer" md-auto-select md-selectable="multiple" slot="md-table-row">
            <md-table-cell md-label="Name">{{item.name}}</md-table-cell>
            <md-table-cell md-label="Owner">{{item.owner}}</md-table-cell>
            <md-table-cell md-label="Description">{{item.description}}</md-table-cell>
        </md-table-row>
    </md-table>    
</div>

`;

(function () {
    var componentId = "components/searchers/groupsSearcher";

    var deps = [
        "env/promise"
    ];

    define(componentId, deps, function () {
        var CustomPromise = require("env/promise");

        Vue.component("groupsSearcher", {
            props: [

            ],
            data: function () {
                return {
                    searchDefaultGroupValue: "",
                    searchAttachedGroups: [],
                    searchAddButtonDisabled: true,

                    searchList: []
                }
            },
            template: template,
            mounted: function () {
                var prarr = [];


                Promise.all(prarr).then(function(_arr){

                }.bind(this), function(_err){
                    debugger; // todo
                }.bind(this))
            },
            methods: {
                onACOpened: function (_event){
                    this.onSearchDefaultGroupChanged(_event);

                    setTimeout(function () {
                        window.dispatchEvent(new Event('resize'));
                    }.bind(this), 10)
                },
                onSearchDefaultGroupSelected: function (_event) {

                },
                onSearchDefaultGroupChanged: function (_event) {
                    var pr = new CustomPromise();
                    this.searchList = pr.native

                    setTimeout(function () {
                        pr.resolve([
                            {name: "kek21", description: "kek21", owner: "kek21", id: "asdfasd123wdfasdf"},
                            {name: "kek212", description: "kek21", owner: "kek21", id: "asdfasd123wdfasdf"},
                            {name: "kek213", description: "kek21", owner: "kek21", id: "asdfasd123wdfasdf"},
                        ]);
                    }.bind(this), 500)

                    // return pr.native;
                },
                onSearchAddButtonClick: function (_event) {

                },
                onRowsSelected: function (_event) {

                }
            }
        });

    });
})(window);

