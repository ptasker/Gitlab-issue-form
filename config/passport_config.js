/**
 * Created by petertasker on 15-03-24.
 */
var passport = require('passport')
    , TwitterStrategy = require('passport-twitter').Strategy
    , FacebookStrategy = require('passport-facebook').Strategy
    , LocalStrategy = require('passport-local').Strategy
    , authController = require('../controllers/auth')
    , oauth = require('./oauth')
    , User = require('../models/users')
    , Tokens = require('../models/tokens');


passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


/**


 LOCAL AUTH STRATEGY


 **/
var localAuth = new LocalStrategy(function (username, password, done) {
    User.findOne({username: username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: 'Unknown user ' + username});
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) return done(err);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid password'});
            }
        });
    });
});


/**


 TWITTER AUTH STRATEGY


 **/


var twitterAuth = new TwitterStrategy({
        consumerKey: oauth.twitter.consumerKey,
        consumerSecret: oauth.twitter.consumerSecret,
        callbackURL: oauth.twitter.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Facebook profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Facebook account with a user record in your database,
            // and return that user instead.

            console.log(profile);
            console.log(accessToken);

            authController.addAccessToken('twitter', accessToken, profile);

            return done(null, profile);
        });
    }
);

/**


 FACEBOOK AUTH STRATEGY


 **/


var facebookAuth = new FacebookStrategy({
        clientID: oauth.facebook.clientID,
        clientSecret: oauth.facebook.clientSecret,
        callbackURL: oauth.facebook.callbackURL
    },

    function (accessToken, refreshToken, profile, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // To keep the example simple, the user's Facebook profile is returned to
            // represent the logged-in user.  In a typical application, you would want
            // to associate the Facebook account with a user record in your database,
            // and return that user instead.

            // console.log(profile);
            console.log(accessToken);

            authController.addAccessToken('facebook', accessToken, profile);

            return done(null, profile);
        });
    }
);


/**


 GOOGLE (YOUTUBE) AUTH STRATEGY


 **/

/**


 INSTAGRAM AUTH STRATEGY


 **/

var social_passports = {
    localConfig: localAuth,
    twitterConfig: twitterAuth,
    facebookConfig: facebookAuth
    //Google
    //Instagram
}

module.exports = social_passports;
