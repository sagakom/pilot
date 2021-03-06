function(args) {
/*
is_app(true)
control_type("VB")
display_name("REST API call control")
description("This will return the REST API call control")
base_component_id("rest_control")
load_once_from_file(true)
visibility("PRIVATE")
read_only(true)
properties(
    [
        {
            id:         "text",
            name:       "Dev text",
            default:    "REST API Call",
            type:       "String"
        }
        ,

        {
            id:         "has_details_ui",
            name:       "Has details UI?",
            type:       "Boolean",
            default:    true,
            hidden:     true
        }
        ,
        {
            id:         "width",
            name:       "Width",
            default:    180,
            type:       "Number"
        }
        ,
        {
            id:         "height",
            name:       "Height",
            default:    70,
            type:       "Number"
        }
        ,
        {
            id:             "callDefaultRestApi",
            pre_snippet:    `await `,
            snippet:        `callDefaultRestApi()`,
            name:           "Execute Command",
            type:           "Action"
        }
        ,
        {
            id:         "callRestApi",
            pre_snippet:    `await `,
            snippet:    `callRestApi("http://INSERT_URL_HERE")`,
            name:       "Execute Command",
            type:       "Action"
        }
        ,
        {
            id:         "undoRoot",
            name:       "Undo response path",
            default:    "",
            type:       "String"
        }
        ,
        {
            id:         "productionRoot",
            name:       "Production response path",
            default:    "",
            type:       "String"
        }
        ,
        {
            id:         "undoFilter",
            name:       "Undo filter",
            default:    new Object(),
            hidden:     true,
            type:       "Object"
        }
        ,
        {
            id:         "productionFilter",
            name:       "Production filter",
            default:    new Object(),
            hidden:     true,
            type:       "Object"
        }
        ,
        {
            id:         "undoURL",
            name:       "Undo URL",
            default:    "https://raw.githubusercontent.com/typicode/demo/master/db.json",
            type:       "String"
        }
        ,
        {
            id:         "URL",
            name:       "URL",
            default:    "https://raw.githubusercontent.com/typicode/demo/master/db.json",
            type:       "String"
        }
        ,
        {
            id:         "jsonPaths",
            name:       "JSON Paths",
            default:    [],
            hidden:     true,
            type:       "Array"
        }
        ,
        {
            id:         "jsonRoots",
            name:       "JSON Roots",
            default:    [],
            hidden:     true,
            type:       "Array"
        }
        ,
        {
            id:         "filteredProductionResponse",
            name:       "Filtered Production Response",
            default:    null,
            hidden:     true,
            type:       "Object"
        }
        ,
        {
            id:         "response",
            name:       "Response",
            default:    null,
            hidden:     true,
            type:       "Object"
        }
        ,

        {
            id:         "callApiOnStartup",
            name:       "Call API on Startup",
            type:       "Select",
            default:    "False",
            values:     [
                            {display: "True",   value: "True"},
                            {display: "False",  value: "False"}
                        ]
        }
    ]
)//properties
logo_url("/driver_icons/rest.png")
*/







    Vue.component("rest_control",{

        props: ["meta", "args","design_mode","refresh"]

        ,



        template:

`<div v-bind:style='"height:100%;width:100%; border: 0px;" +
    "background-color: "+    args["background_color"]  +  ";"'>






<!-- ------------------------------------------------------------------------------------------

                                      Details screen



-------------------------------------------------------------------------------------------->
    <div v-bind:style='"height:100%;width:100%; border: 0px;color:black;padding: 10px;"'
         v-if='design_mode == "detail_editor"'>
        {{args.text}}
        <div/>
        <button    class="btn btn-primary"
                   v-on:click="callLiveRestApi()">

              Test API

        </button>


        <button    class="btn btn-info"
                   v-on:click="callUndo()">

              Undo

        </button>


        <button    class="btn btn-info"
                   v-if="!showAsCode"
                   v-on:click="showThisAsCode()">

              Show as code

        </button>


        <button    class="btn btn-info"
                   v-if="showAsCode"
                   v-on:click="hideCode()">

              Hide code

        </button>

        <div/>




        <div style="height:100%;width:600px; border: 0px;color:black;padding: 10px;overflow:scroll;">
            <input v-model="args.URL" size=60></input>
            <div/>



            <div style="font-weight: bold;">Root</div>
            <select v-model="args.productionRoot" @change="filterProductionRestApi();showAsCode = false;">
              <option disabled value="">Please select one</option>
              <option  v-for="jsonRoot in args.jsonRoots"
                    v-bind:selected="jsonRoot == args.productionRoot"
                        >{{jsonRoot}}</option>
            </select>


            <div style="padding-top:20px;font-weight: bold;">List of Paths</div>
            <button    class="btn-sm btn-secondary"  v-on:click="selectAll()">Select All</button>
            <button    class="btn-sm btn-secondary"  v-on:click="selectNone()">Select None</button>
            <div  style="height:200px;width:100%; border: 0px;color:black;padding: 10px;overflow:scroll;">
                <div v-for="jsonPath in args.jsonPaths" >

                   <input   v-if="jsonPath.startsWith(args.productionRoot)"
                            type="checkbox"
                            id="{{jsonPath}}"
                            value="{{jsonPath}}"
                            v-model="args.productionFilter[jsonPath]"
                            @change="if (args.productionFilter[jsonPath]) {checkParents(jsonPath)} else {uncheckChildren(jsonPath)};filterProductionRestApi();showAsCode = false;">

                   <label v-if="jsonPath.startsWith(args.productionRoot)"  for="{{jsonPath}}">{{jsonPath}}</label>
                </div>
            </div>
            <div style="height: 25px;"></div>

            <div v-if="!showAsCode">
                <div style="font-weight: bold;">Result</div>
                <pre>{{args.filteredProductionResponse}}</pre>
            </div>

            <div v-if="showAsCode">
<pre style="padding:10px; background-color: lightgray;">

var result
var result2 = await callFunction(
{
    driver_name: "rest_call_service",
    method_name: "rest_call_service"
}
,
{
    URL:    "https://raw.githubusercontent.com/typicode/demo/master/db.json"
})



if (result2) {
    var result = await callFunction(
    {
        driver_name: "json_filter_service",
        method_name: "json_filter_service"
    }
    ,
    {
        input: result2,
            filter: {{JSON.stringify(args.productionFilter)}},
        root:  {{JSON.stringify(args.productionRoot)}}

    })
}




</pre>
            </div>



        </div>
    </div>









    <div    v-else
            v-bind:style='"position:relative;width:100%;height:100%;border: 0px solid gray;background-color: "+    args["background_color"]  +  ";"'>

    <div    v-if='design_mode'>
           {{args.text}}
           <div/>
           <pre>{{args.URL}}</pre>
    </div>

        <div style="position:absolute;top:0px">
            <slot v-bind:refresh='refresh'>
            </slot>
        </div>
    </div>
</div>`

        ,
        // ----------------------------------------------------------------
        //
        //                              data
        //
        //
        //
        //
        // ----------------------------------------------------------------

        data: function() {
            return {
                    showAsCode: false
            }
        }

        ,





        // ----------------------------------------------------------------
        //
        //                              mounted
        //
        //
        //
        //
        // ----------------------------------------------------------------

        mounted: async function() {
            registerComponent(this)
            if (this.args.callApiOnStartup == 'True') {
                this.callDefaultRestApi()
            }
        }
        ,


        methods: {
            // ----------------------------------------------------------------
            //
            //                        callRestApiInternal
            //
            //
            //
            //
            // ----------------------------------------------------------------

            callRestApiInternal: async function(url) {
                var mm = this

                var result = await callFunction(
                {
                    driver_name: "rest_call_service",
                    method_name: "rest_call_service"
                }
                ,
                {
                    URL:    url
                })


                if (result) {
                    this.args.productionResponse = result
                    var result2 = await callFunction(
                    {
                        driver_name: "json_filter_service",
                        method_name: "json_filter_service"
                    }
                    ,
                    {
                        input: result,
                        filter: this.args.productionFilter,
                        root:  this.args.productionRoot

                    })
                    console.log("result: " + JSON.stringify(result))
                    console.log("this.args.productionFilter: " + JSON.stringify(this.args.productionFilter))
                    console.log("this.args.productionRoot: " + JSON.stringify(this.args.productionRoot))


                    if (result2) {
                        this.args.filteredProductionResponse = result2
                        this.args.response = result2
                        return result2
                    }
                    return null
                }
                return null
            }
            ,





            // ----------------------------------------------------------------
            //
            //                        getListOfResponsePathsForJson
            //
            //
            //
            //
            // ----------------------------------------------------------------

            getListOfResponsePathsForJson: async function(input) {
                var mm = this

                var result = await callFunction(
                {
                    driver_name: "json_traverse_service",
                    method_name: "json_traverse_service"
                }
                ,
                {
                    input: input
                })


                if (result) {
                    return result
                }
                return null
            }
            ,






            // ----------------------------------------------------------------
            //
            //                        getJsonFiltered
            //
            //
            //
            //
            // ----------------------------------------------------------------

            getJsonFiltered: async function(input) {
                var mm = this

                var result = await callFunction(
                {
                    driver_name: "json_filter_service",
                    method_name: "json_filter_service"
                }
                ,
                {
                    input: input,
                    filter: this.args.productionFilter,
                    root:  this.args.productionRoot

                })


                if (result) {
                    return result
                }
                return null
            }
            ,








            // ----------------------------------------------------------------
            //
            //                        callDefaultRestApi
            //
            //
            //
            //
            // ----------------------------------------------------------------

            callDefaultRestApi: async function() {

                var qwe = await this.callRestApiInternal(this.args.URL)
                return qwe
            }
            ,









            // ----------------------------------------------------------------
            //
            //                        callRestApi
            //
            //
            //
            //
            // ----------------------------------------------------------------

            callRestApi: async function(urlToCall, options) {

                var mm = this
                if (!urlToCall) {
                    urlToCall = mm.args.URL
                }

                mm.args.productionFilter = new Object()
                mm.args.productionRoot = ""
                if (options) {
                    if (options.filter) {
                        mm.args.productionFilter = JSON.parse(JSON.stringify(options.filter))
                    }
                    if (options.root) {
                        mm.args.productionRoot = JSON.parse(JSON.stringify(options.root))
                    }
                }

                var qwe = await this.callRestApiInternal(urlToCall)
                return qwe
            }
            ,








            // ----------------------------------------------------------------
            //
            //                        selectAll
            //
            //
            //
            //
            // ----------------------------------------------------------------

            selectAll: async function( ) {
                for ( var ert = 0  ;  ert < this.args.jsonPaths.length  ;  ert++  ) {
                    if (this.args.productionFilter[this.args.jsonPaths[ert]] == false) {
                        this.args.productionFilter[this.args.jsonPaths[ert]] = true
                    }
                }
                this.showAsCode = false
                this.filterProductionRestApi()
            }
            ,









            // ----------------------------------------------------------------
            //
            //                        checkParents
            //
            //
            //
            //
            // ----------------------------------------------------------------

            checkParents: async function( jsonPath ) {
                var lastDotPos = jsonPath.lastIndexOf(".")
                if (lastDotPos != -1) {
                    jsonPath = jsonPath.substring(jsonPath,lastDotPos)
                    //alert(jsonPath)
                    this.args.productionFilter[jsonPath] = true
                    this.checkParents(jsonPath)
                }
                this.showAsCode = false
            }
            ,





            // ----------------------------------------------------------------
            //
            //                        uncheckChildren
            //
            //
            //
            //
            // ----------------------------------------------------------------

            uncheckChildren: async function( jsonPath ) {
                for ( var ert = 0  ;  ert < this.args.jsonPaths.length  ;  ert++  ) {
                    if (this.args.jsonPaths[ert].startsWith(jsonPath)) {
                        this.args.productionFilter[this.args.jsonPaths[ert]] = false
                    }
                }
                this.showAsCode = false
            }
            ,









            // ----------------------------------------------------------------
            //
            //                             selectNone
            //
            //
            //
            //
            // ----------------------------------------------------------------

            selectNone: async function( ) {
                for ( var ert = 0  ;  ert < this.args.jsonPaths.length  ;  ert++  ) {
                    if (this.args.productionFilter[this.args.jsonPaths[ert]] == true) {
                        this.args.productionFilter[this.args.jsonPaths[ert]] = false
                    }
                }
                this.filterProductionRestApi()
                this.showAsCode = false
            }
            ,








            // ----------------------------------------------------------------
            //
            //                     callLiveRestApi
            //
            //
            //
            //
            // ----------------------------------------------------------------

            callLiveRestApi: async function( ) {


                //
                // get the JSON response
                //
                this.showAsCode = false
                this.args.filteredProductionResponse = new Object()
                var jsonResponse  = await this.callRestApi(this.args.URL)
                this.args.productionResponse   = jsonResponse
                this.args.filteredProductionResponse = JSON.parse(JSON.stringify(this.args.productionResponse))


                //
                // get the JSON paths and roots in the  response
                //
                var aa = await this.getListOfResponsePathsForJson(jsonResponse)
                this.args.jsonPaths = Object.keys(aa.paths)
                this.args.jsonRoots = Object.keys(aa.roots)


                //
                // show all the fields in the JSON response
                //
                for (var ert=0;ert<this.args.jsonPaths.length;ert++) {
                    this.args.productionFilter[this.args.jsonPaths[ert]] = true
                }


                this.args.undoFilter  = JSON.parse(JSON.stringify(this.args.productionFilter))
                this.args.undoURL     = this.args.URL
                this.args.undoRoot    = this.args.productionRoot

            }
            ,







            // ----------------------------------------------------------------
            //
            //                     callUndo
            //
            //
            //
            //
            // ----------------------------------------------------------------

            callUndo: async function(urlToCall) {


                this.args.productionFilter  = JSON.parse(JSON.stringify(this.args.undoFilter))
                this.args.URL               = this.args.undoURL
                this.args.productionRoot    = this.args.undoRoot

                var aa = await this.getJsonFiltered(this.args.productionResponse)
                this.args.filteredProductionResponse  = aa
                this.args.response  = aa
            }
            ,





            // ----------------------------------------------------------------
            //
            //                             showAsCode
            //
            //
            //
            //
            // ----------------------------------------------------------------

            showThisAsCode: async function() {
                this.showAsCode  = true
            }
            ,



            // ----------------------------------------------------------------
            //
            //                             hide code
            //
            //
            //
            //
            // ----------------------------------------------------------------

            hideCode: async function() {

                this.showAsCode  = false
            }
            ,





            // ----------------------------------------------------------------
            //
            //                          filterLiveRestApi
            //
            //
            //
            //
            // ----------------------------------------------------------------

            filterProductionRestApi: async function() {
                var aa = await this.getJsonFiltered(this.args.productionResponse)
                this.args.filteredProductionResponse  = aa
                this.args.response  = aa
            }









        }




    })
}
