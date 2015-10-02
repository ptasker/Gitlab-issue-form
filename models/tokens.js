// Load required packages
var mongoose = require('mongoose');

// Define our token schema
var TokenSchema = new mongoose.Schema({
    value: { type: String, required: true },
    userId: { type: String, required: true },
    clientId: { type: String, required: true }
});

// Define our token schema
var TwitterTokenSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    token: { type: String, required: true },
    tokenSecret: { type: String, required: true },
    profile: { type: Object, required: true }
});


TwitterTokenSchema.statics.findOrCreate = function (filters, cb) {
    User = this;
    this.find(filters, function (err, results) {
        if (results.length == 0) {
            var newUser = new User();
            newUser.facebookId = filters.facebookId;
            newUser.save(function (err, doc) {
                cb(err, doc)
            });
        } else {
            cb(err, results[0]);
        }
    });
};

// Define our token schema
var FacebookTokenSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    profile: { type: Object, required: true }
});

// Export the Mongoose model
module.exports = {
    TwitterTokenSchema:TwitterTokenSchema,
  TwitterToken: mongoose.model('TwitterToken', TwitterTokenSchema),
  FacebookToken: mongoose.model('FacebookToken', FacebookTokenSchema)
} 

//implement a strong hashing scheme for the access token

//FacebookStrategy  accessToken, refreshToken, profile,
//TwitterStrategy token, tokenSecret, profile
//InstagramStrategy accessToken, refreshToken, profile,