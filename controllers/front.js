/**

 =============================================

 Main controller for the views of the app

 =============================================

 **/


var request = require('request');

// Connection
var gitlab = require('gitlab')({
    url  : 'https://gitlab.com/api/v3',
    token: 'qb3ZBd7xzNm_HWzg3jRX'
});
var flash = require('connect-flash');

module.exports = {

    index: function (req, res) {

        gitlab.projects.all({}, function (projects) {

            console.log(projects);

            var that = this;

            that.projects = projects;

            gitlab.groups.listMembers(227762, function (users) {

                console.log(users);

                res.render('home', {
                    "projects": that.projects,
                    "users"   : users,
                    "msg" : req.flash('info')
                });

            });


        });


    },



    createIssue: function (req, res) {

        if (req.body.project == ""
            || req.body.title == ""
            || req.body.description == ""
            || req.body.assign == "") {

            req.flash('info', 'Please complete all the fields');
            res.redirect(303, '/');


        } else {

            var pid = req.body.project;

            var params = {
                id : pid,
                title: req.body.title,
                description: req.body.description,
                assignee_id: req.body.assign
            };


            gitlab.issues.create(pid, params, function(err, resp){
                console.log(err, resp);

                //res.render('home', {msg: "Issue submitted"});

                req.flash('info', "Issue submitted");
                res.redirect(303, '/');

            });

        }
    },


    createuserform: function (req, res) {

        res.render('userform');

    },

    json: function (req, res) {

        res.json({user: 'tobi'});

    },

    jsonp: function (req, res) {

        res.jsonp({user: req.params.name});

    },


};