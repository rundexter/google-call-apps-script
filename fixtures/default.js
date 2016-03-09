var _ = require('lodash')
    , env = require('./env')
    ;

module.exports = _.merge({
    /*
     * Some default settings. 
     *
     * You can generally leave this as is for general testing purposes.
     */
    simulation: true
    , instance_id: 'local_test_instance'
    , urls: {
        home: "http://rundexter.com/"
    }
    , instance_state: {
        active_step :  "local_test_step"
    }
    , workflow: {
        "id" : "local_test_workflow"
        , "title": "Local test workflow"
        , "description": "A fixture workflow used to test a module"
    }
    , steps: {
        local_test_step: {
            id: 'local_test_step'
            , type: 'module'
            //The test runner will change YOUR_MODULE_NAME to the correct module name
            , name: 'YOUR_MODULE_NAME'
            , next: []
        }
    }
    , modules: {
        //The test runner will add the proper data here
    }
    /*
     * End defaults
     */
    , environment: {
       /*
        * Any API keys you might need should go in the env.js.
        * For example:
        *
        "parse_app_id": "abc123"
        , "parse_app_key": "foobar"
        */
    }
    , user: {
        /*
         * Your dexter user settings should go in the env.js file and remain uncommitted.  
         * For example:
         *
        profile: {
            id: 1,
            api_key: 'apikeytest'
        }
         */
        /*
         * You should also add your providers to env.js
         * Example:
        providers: {
            github: {
                access_token: 'abc123',
                username: 'foo'
            }
        }
         */
    }
    , data: {
        local_test_step: {
            /*
             * You should update this section with some test input for testing your module
             */
            input: {
                //Replace VAR1 with the name of an expected input, and add more inputs as needed.
//                parameters : [ [ '1wrNu-1v-wbPJGlRlHY3JG3NQKp8O2RrPB5ST4afnTVM', 'who are you' ] ]
                parameters : [ [ '15QKc6gax-F20tt8sVTqF8LZjdi4HXvUDTXvIkABVBkQ', 'what is today\'s date' ] ]
                , dev_mode : true
                , function : 'lookupAndCompute'
                , script_id: 'M96fgc6zwIkFPHVR-GmT-lVv6xFqglN_I'
            }
        }
    }
}, env);
