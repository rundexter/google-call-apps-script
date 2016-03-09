var _       = require('lodash')
  , google  = require('googleapis')
  , q       = require('q')
  , service = google.script('v1')
;

module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var OAuth2       = google.auth.OAuth2
          , oauth2Client = new OAuth2()
          , access_token = dexter.provider('google').credentials('access_token')
          , self         = this
          , promises     = []
          , scriptId     = step.input('script_id').first()
          , fn           = step.input('function').first()
          , parameters   = step.input('parameters').first()
          , devMode      = step.input('dev_mode').first()
          , data
        ;

        // set credentials
        oauth2Client.setCredentials({ access_token: access_token });

        google.options({ auth: oauth2Client });

        data = {
            resource: {
                function     : fn
                , parameters : parameters //[ step.input('spreadsheet_id').first(), 'hello' ]
                , devMode    : _.isNil(devMode) ? false : devMode // true
            },
            scriptId: scriptId
        };

        promisify(service.scripts.run.bind(service.scripts), data)
          .then(function(i) {
            self.complete(i);
          })
          .catch(function(err) { self.fail(require('util').inspect(err, { depth: 5 })); })
        ;
    }
};


function promisify(fn, data, path) {
    var deferred = q.defer(); 

    fn(data, function(err, result) {
        return err
          ? deferred.reject(err)
          : deferred.resolve(path ? _.get(result, path) : result)
        ;
    });

    return deferred.promise;
}
