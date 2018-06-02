{
    doc_type: 'visifile',
    name: 'systemFunctions',  version: 1,
    description: 'system functions',




    events: {
        "This will return the apps available": {
            on: "get_apps_list",
            do: function(args, returnfn) {
                dbsearch.serialize(
                    function() {
                        dbsearch.all(
                            "SELECT driver FROM system_code where on_condition = '\"app\"' ; "
                            ,

                            function(err, results)
                            {
                                var list = [

                                ]
                                for (var tt = 0; tt < results.length ; tt ++) {
                                    list.push(results[tt].driver)
                                }
                                returnfn(list)
                            })
                }, sqlite3.OPEN_READONLY)


            }, end: null
        }


        ,



        "This will execute sql on the internal SQLite database": {
            on: "sql",
            do: function(args, returnfn) {
                dbsearch.serialize(
                    function() {
                        dbsearch.all(
                            args.sql
                            ,

                            function(err, results)
                            {
                                returnfn(results)
                            })
                }, sqlite3.OPEN_READONLY)


            }, end: null
        }


    }

}
