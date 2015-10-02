/**
 * Created by petertasker on 15-03-05.
 */
var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var userChildSocialSchema = new mongoose.Schema({

	facebook_id: String,
	twitter_id: String,
	facebook_access_token: String,
	twitter_access_token: String

});

var userSchema = new mongoose.Schema({

    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    fullname: String,
    gender: String,
    address: String,
    auth_data: [userChildSocialSchema]
    
});


// Bcrypt middleware
userSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};


mongoose.model("User", userSchema);
var User =  mongoose.model("User");

module.exports = User;