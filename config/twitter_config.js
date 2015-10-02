var passport = require('passport')
   , TwitterStrategy = require('passport-twitter').Strategy
   , Tokens = require('../models/tokens')
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


//var User = mongoose.model('TwitterToken', Tokens.TwitterTokenSchema);


var twitterAuth = new TwitterStrategy({
    consumerKey: '1Ug4EQ7zYukjjq4bi74mcRicp',
    consumerSecret: 'NGaTjvqmN1EUbetLC7IL6njgrTc4RHNxeCXqwEnYyIq5J9oG2n',
    callbackURL: 'http://localhost:1337/auth/twitter/callback'
},
  function (token, tokenSecret, profile, done) {
    Tokens.TwitterToken.findOrCreate({ 'userId': 'u1-fnck' }, function (err, result) {
        if (result) {
            result.token = token;
            result.tokenSecret = tokenSecret;
            result.profile = profile;
            console.log('user updated');
            result.save(function (err, doc) {
                done(err, doc);
            });
        } else {
            done(err, result);
        }

});
    
    //var TwitterToken = new Tokens.TwitterToken();

    //TwitterToken.userId = 'u1-fnck';
    //TwitterToken.token = token;
    //TwitterToken.tokenSecret = tokenSecret;
    //TwitterToken.profile = profile;
    
    
    //console.log(TwitterToken);

    //TwitterToken.save(function (err) {
    //    if (err) // ...
    //        console.log('Twitter token Saved');
    //});
    
    return done; (null, profile);
});


passport.use(twitterAuth);

module.exports = passport;


