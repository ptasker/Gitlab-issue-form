var facebook = require('../controllers/facebook'),
    User = require('../models/users');

module.exports = {

    addAccessToken: function (type, accessToken, user) {

        var query
            , user_data;

        switch (type) {

            case 'facebook':
                query = {
                    auth_data: [{
                        facebook_id: user.id,
                        facebook_access_token: accessToken
                    }]
                };

                user_data = {

                    fullname: user.displayName,
                    auth_data: [{
                        facebook_id: user.id,
                        facebook_access_token: accessToken
                    }]

                };

                break;

            case 'twitter':

                query = {
                    auth_data: [{
                        twitter_id: user._json.id_str,
                        twitter_access_token: accessToken
                    }]
                };

                user_data = {

                    fullname: user._json.name,
                    auth_data: [{
                        twitter_id: user._json.id_str,
                        twitter_access_token: accessToken
                    }]

                };

                break;
        }


        //Check if we have the User's Facebook ID AND accessToken. It not, add em


        var options = {upsert: true};

        //Build in Mongoose query. Find a record and if it doesn't exist, add it.
        User.findOneAndUpdate(query, user_data, options, function (err, record, raw) {

            // console.log(err, record, raw);

            console.log(record.auth_data[0]);

        });

    }
};
