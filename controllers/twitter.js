var client = require('../config/mongo_client')
    , request = require('request')
    , Tokens = require('../models/tokens')
    , passport = require('passport')
    , oauth = require('../config/oauth')
    , Twit = require('twit')
    , TwitterStrategy = require('passport-twitter').Strategy
    , Q = require('q')
    , Jobs = require('../models/jobs')
    , User = require('../models/users');

//https://github.com/ttezel/twit
//https://dev.twitter.com/rest/reference/get/search/tweets


var T = new Twit({
    consumer_key: oauth.twitter.consumerKey
    , consumer_secret: oauth.twitter.consumerSecret
    , access_token: oauth.twitter.accessToken
    , access_token_secret: oauth.twitter.accessTokenSecret
})


var tweets = {
    showTokens: function (req, res) {
        var TwitterToken = Tokens.TwitterToken;
        TwitterToken.find({userId: 'u1-fnck'}, function (err, token) {
                res.json(token);
            }
        )
    },

    getTweets: function (req, res) {

        //
        //  search twitter for all tweets containing the word 'banana' since Nov. 11, 2011
        //

        //T.get('search/tweets', { q: 'petetasker', count: 100 }, function(err, data, response) {
        //	console.log(data)
        //});

        //Promises!


        /**
         *
         *
         * Q package for promises
         * https://www.npmjs.com/package/q
         *
         * Example:
         * https://github.com/basicallydan/q-examples/blob/master/request-with-processing.js
         *
         */
        var d = Q.defer();

        T.get('statuses/user_timeline', {screen_name: 'petetasker', count: 2}, function (err, data, response) {


            if (err) {
                var error = new Error('Something went wrong trying to get Tweets');
                error.innerError = err;
                throw error;
            }

            //return tweet data if no error
            d.resolve(data);

        });

        //Return a promise
        return d.promise;
    },

    processTweets: function(tweets){

        var d = Q.defer();
        var i = 0;
        var numPoints = 0;

        if (tweets) {

            //console.log(tweets);

            var formattedTweets = [];
            var promises = [];
            var processed_data = [];

            tweets.forEach(function (status) {

                console.log( status );





                //var deferred = Q.defer();
                //
                //twitter.embed(status.id_str, embedOpts, function (embed) {
                //    formattedTweets.push(embed.html);
                //    deferred.resolve();
                //});
                //
                //promises.push(deferred.promise);
            });



        }

        d.resolve(processed_data);

        return d.promise;


    },
    saveTweetData : function(){


        var U = User;

        console.log("HERE!");



    },


    runCall: function(req, res){

        this.getTweets(req,res)
            .then(this.processTweets)
            .then(this.saveTweetData)
            .fail(function (error) {
                console.log('Something went wrong: ' + error.message);
            });

    }
};


module.exports = tweets;