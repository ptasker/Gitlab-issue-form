var express = require('express'),
    configure = require('./config/configure'),
    _ = require('underscore');

app = express();
app = configure(app);



//NODE_ENV=development nodemon index.js
function startServer() {
    app.listen(app.get('port'), function () {
        console.log('Express started in ' + app.get('env') +
        ' mode on http://localhost:' + app.get('port') +
        '; press Ctrl-C to terminate.');
    });

}

/**

 Handle clustering

 **/
if (require.main === module) {
    // application run directly; start app server
    startServer();
} else {
    // application imported as a module via "require": export function
    // to create server
    module.exports = startServer;
}
