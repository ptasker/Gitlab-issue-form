var express = require("express"),
  bodyParser = require('body-parser'),
  flash = require('connect-flash'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  fs = require('fs'),
  _ = require('underscore'),
  formidable = require('formidable'),
  busboy = require('connect-busboy'),
  async = require('async'),
  expressValidator = require('express-validator'),
  routes = require('./routes');

require('dotenv').load();

/**

Setup middleware to load the Gitlab info we need to run the form.

*/

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

  app.use(expressValidator([]));

  app.use(flash());

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

  return app;

};
