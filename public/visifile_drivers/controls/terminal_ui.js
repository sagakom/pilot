function(args) {
/*
is_app(true)
control_type("VB")
display_name("Terminal control")
description("This will return the terminal control")
base_component_id("terminal_control")
load_once_from_file(true)
visibility("PRIVATE")
read_only(true)
properties(
    [
        {
            id:         "text",
            name:       "Dev text",
            default:    "Terminal",
            type:       "String"
        }
        ,
        {
            id:         "width",
            name:       "Width",
            default:    100,
            type:       "Number"
        }
        ,
        {
            id:         "height",
            name:       "Height",
            default:    40,
            type:       "Number"
        }
        ,
        {
            id:         "is_container",
            name:       "Is Container?",
            type:       "Boolean",
            default:    true,
            hidden:     true
        }
        ,
        {
            id:         "execCmd",
            pre_snippet:    `await `,
            snippet:    `execCmd('ls')`,
            name:       "Execute Command",
            type:       "Action"
        }
    ]
)//properties
logo_url("/driver_icons/terminal.png")
*/

    Vue.component("terminal_control",{

        props: ["meta", "args","design_mode","refresh", "children"]

        ,



        template:

`<div v-bind:style='"height:100%;width:100%; border: 0px;" +
    "background-color: "+    args["background_color"]  +  ";"'>

    <div v-if="design_mode && (children.length == 0)">
        {{args.text}}
    </div>

    <div v-bind:style='"position:relative;width:100%;height:100%;border: 0px solid gray;background-color: "+    args["background_color"]  +  ";"'>
        <div style="position:absolute;top:0px">
            <slot v-bind:refresh='refresh'>
            </slot>
        </div>
    </div>
</div>`

        ,

        data: function() {
            return {
            }
        }

        ,

        mounted: async function() {
            registerComponent(this)

        }
        ,


        methods: {
            readFromTerminal: async function(cmdString) {
                var result = await callFunction(
                {
                    driver_name: "serverTerminalStuff",
                    method_name: "serverTerminalStuff"
                }
                ,
                {
                    cmd_string:    cmdString
                })

                if (result) {
                    return result
                }
                return null
            }
            ,


            execCmd: async function(cmdString) {
                var qwe = await this.readFromTerminal(cmdString)
                return qwe
            }

        }




    })
}
