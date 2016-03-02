var express = require("express"),
  bodyParser = require('body-parser'),
  flash = require('connect-flash'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  fs = require('fs'),
  _ = require('underscore'),
  formidable = require('formidable'),
  busboy = require('connect-busboy'),
  async = require('async')
routes = require('./routes');

require('dotenv').load();

var gitlabProjects = require('../middleware/gitlab/gitlab_projects'),
  gitlabUsers = require('../middleware/gitlab/gitlab_users');


module.exports = function(app) {

  app.use(cookieParser('super-secret-key-here'));

  app.use(session({
    secret: 'super-secret-key-here',
    saveUninitialized: true,
    resave: true
  }));


  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  // parse application/json
  app.use(bodyParser.json());


  app.use(flash());

  //Setup 'domains' error catching
  app.use(function(req, res, next) {
    // create a domain for this request
    var domain = require('domain').create();
    // handle errors on this domain
    domain.on('error', function(err) {
      console.error('DOMAIN ERROR CAUGHT\n', err.stack);
      try {
        // failsafe shutdown in 5 seconds
        setTimeout(function() {
          console.error('Failsafe shutdown.');
          process.exit(1);
        }, 5000);
        // disconnect from the cluster

        var worker = require('cluster').worker;
        if (worker) worker.disconnect();
        // stop taking new requests
        server.close();
        try {
          // attempt to use Express error route
          next(err);
        } catch (err) {
          // if Express error route failed, try
          // plain Node response
          console.error('Express error mechanism failed.\n', err.stack);
          res.statusCode = 500;
          res.setHeader('content-type', 'text/plain');
          res.end('Server error.');
        }
      } catch (err) {
        console.error('Unable to send 500 response.\n', err.stack);
      }
    });
    // add the request and response objects to the domain
    domain.add(req);
    domain.add(res);
    // execute the rest of the request chain in the domain
    domain.run(next);
  });


  /**

   SETUP LOGGING

   **/

  switch (app.get('env')) {
    case 'development':
      // compact, colorful dev logging
      app.use(require('morgan')('dev'));
      break;
    case 'production':
      // module 'express-logger' supports daily log rotation
      app.use(require('express-logger')({
        path: __dirname + '/log/requests.log'
      }));
      break;
  }


  /*

   *
   *
   * Init Routes
   *
   *
   */

  app.use(busboy());

  /**
   *
   * CALL STATIC FOLDERS BEFORE ROUTER
   *
   */
  //Static folder
  app.use(
    express.static('public')
  );


  //Setup parallel loading of Gitlab data
  function parallel(middlewares) {
    return function(req, res, next) {
      async.each(middlewares, function(mw, cb) {
        mw(req, res, cb);
      }, next);
    };
  }

  app.use(parallel([
    gitlabProjects,
    gitlabUsers
  ]));

  routes.initialize(app, new express.Router());


  /*

   *
   *
   * Setup view engine
   *
   *
   */
  var handlebars = require('express3-handlebars')
    .create({
      defaultLayout: 'main'
    });

  app.engine('handlebars', handlebars.engine);
  app.set('view engine', 'handlebars');

  app.set('port', process.env.PORT || 3000);

  /**
   TESTING CLUSTERING
   **/

  // app.use(function(req, res, next) {
  //     var cluster = require('cluster');
  //     if (cluster.isWorker) console.log('Worker %d received request',
  //         cluster.worker.id);
  // });

  return app;

};
