var mongoose = require('mongoose');

var FeedSchema = new mongoose.Schema({
    type: String,
    jobs: String

});
var TwitterJobSchema = new mongoose.Schema({
    type: String,
    term: String

});
var FacebookJobSchema = new mongoose.Schema({
    type: String,
    term: String

});
var YoutubeJobSchema = new mongoose.Schema({
    type: String,
    term: String

});

var CommonJobSchema = new mongoose.Schema({
    type: String,
    term: String
});


var TwineResultSchema = new mongoose.Schema({
    id: Number,
    media_key: Number,
    feed_id: Number, //67288
    from_user_name: String, //"wearehighroad",
    from_full_name: String, //"High Road",
    profile_url: String, //"https://instagramimages-a.akamaihd.net/profiles/profile_248897771_75sq_1352343427.jpg",
    media_type_id: Number,//2,
    perma_link: String,//"confirmed-at-the-canadagoose-i",
    source: String,// "Instagram",
    official_brand_url: String,//"http://instagram.com",
    votes: Number,//22,
    image_width : Number, // 640,
    image_height: Number,// 640,
    status: Number,//1,
    created_at: Date,//Epoch time stamp -- >  1426192283,
    description: String,//"Confirmed at the @CanadaGoose_Inc Spring 2015 event: these spring jackets will keep you dry in a rain shower! ‪ #‎AskAnyoneWhoKnows",
    target_url: String,//"https://instagram.com/p/0JCI8BK1HF/",
    image_url: String,//"http://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11055616_1386281378356896_1961833170_n.jpg",
    is_retweet: Boolean,//false,
    images: [
        {
            url: String,//"http://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11055616_1386281378356896_1961833170_n.jpg",
            type: String,//"primary",
            height: Number,//640,
            width: Number//640
        }
    ],
    network: {
        id: Number,//1,
        brand_url: String,//"http://instagram.com",
        css_class: String,// "instagram",
        name: String// "Instagram"
    },
    sentiment: {
        name: String, // "Negative",
        id : Number, //3
    },
    layout: {
        id: Number,//1,
        name: String, //"Full",
        css: String//"layout-full"
    }
});


var ResultSchema = new mongoose.Schema({
    id: Number, //OUR ID
    feed_id: Number, //THEIR ID
    from_user_name: String, //"wearehighroad",
    from_full_name: String, //"High Road",
    profile_url: String, //"https://instagramimages-a.akamaihd.net/profiles/profile_248897771_75sq_1352343427.jpg",
    media_type_id: Number,//2,
    perma_link: String,//"confirmed-at-the-canadagoose-i",
    source: String,// "Instagram",
    official_brand_url: String,//"http://instagram.com",
    votes: Number,//22,
    image_width : Number, // 640,
    image_height: Number,// 640,
    status: Number,//1,
    created_at: Date,//Epoch time stamp -- >  1426192283,
    description: String,//"Confirmed at the @CanadaGoose_Inc Spring 2015 event: these spring jackets will keep you dry in a rain shower! ‪ #‎AskAnyoneWhoKnows",
    target_url: String,//"https://instagram.com/p/0JCI8BK1HF/",
    image_url: String,//"http://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11055616_1386281378356896_1961833170_n.jpg",
    is_retweet: Boolean,//false,
    images: [
        {
            url: String,//"http://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11055616_1386281378356896_1961833170_n.jpg",
            type: String,//"primary",
            height: Number,//640,
            width: Number//640
        }
    ],
    network: {
        css_class: String,// "instagram",
        name: String// "Instagram"
    },
    layout: {
        id: Number,//1,
        name: String, //"Full",
        css: String//"layout-full"
    }
});



var TwitterJob = mongoose.model('TwitterJob', CommonJobSchema);
var FacebookJob = mongoose.model('FacebookJob', CommonJobSchema);
var YoutubeJob = mongoose.model('YoutubeJob', CommonJobSchema);

exports.getTwitterJobs = TwitterJob;

exports.createTwitterJob = function () {

    TwitterJob.create({

        type: 'MainFeed',
        term: 'wearehighroad'

    }, function (err, twitterJob) {

        var strOutput;

        if (err) {
            
            console.log(err);
            strOutput = err;

        } else {
            
            console.log(twitterJob);
            strOutput = twitterJob.term;
        }
    
    });
  
}


exports.createJob = function (req, res) {
    
    console.log(req.params.term + '  ' + req.parpams.type);
}