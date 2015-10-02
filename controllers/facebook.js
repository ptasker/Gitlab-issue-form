var User = require('../models/users'),
    _ = require('underscore'),
FB = require("fb");

module.exports = {
	getPosts :function( req, res ) {

        // console.log(req.user.id);

        var out = 'd';

        User.findOne({'auth_data.facebook_id': req.user.id}, function(err, doc){

            // console.log(doc.auth_data[0].facebook_id);

            var fbid = doc.auth_data[0].facebook_id;
            // var access_token = doc.auth_data[0].facebook_access_token;
            var access_token = "CAACEdEose0cBAFPnnwT0KbLIYx7bAP8QzxFEITllojWLYKAOPZCOdwp96vnaOU1CsVYr1xZCKjMPAkbQl8EZAGWZC7kueW1ThGzUwtK9PI8uc5ZCLmicv7PtXvMJpEeckGdQlNzDIIumoGWGIfLZBZCOFXnHVZAGfTnyqJHSZCCio4Sibki62IFytWm3njW5g9EYDLpDDDqRMFmusiqma35uiwQ8fnYbYwKsZD";

            //console.log(access_token);

            FB.setAccessToken(access_token);

            FB.api('/v2.3/me/feed', function (api_res) {
            	if(!api_res || api_res.error) {
            		console.log(!res ? 'error occurred' : api_res.error);
            		return;
            	}

                console.log(api_res);

                //out = '';
                //
                //_.each(api_res, function(ele, i){
                //
                //    var d = JSON.parse(ele);
                //    out += '<p>'+d.name+'</p>';
                //
                //});
                //
                //res.render( 'dashboard', {'fbdata' : out, user : req.user} );

            });

        });


    }
}

