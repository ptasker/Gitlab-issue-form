/**

 CONNECT TO MONGODB
 ==============================

 Run:

 mongod --dbpath .

 If you're running Mongo locally

Remote 

mongo ds033449.mongolab.com:33449/funnelcake -u highroaddev -p Highroad!2k12

 **/

var dbConfig = require('./db.js');
var mongoose = require('mongoose');
var User = require('../models/users');

var db = mongoose.connection;

db.on('error', console.error);


mongoose.connect(dbConfig.url);
