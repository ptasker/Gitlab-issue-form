/**

 =============================================

 Main controller for the views of the app

 =============================================

 **/


var request    = require('request');
var moment     = require('moment');
var busboy     = require('connect-busboy');
var formidable = require('formidable');

var cloudinary = require('cloudinary');
//Config for cloudinary
//http://cloudinary.com/documentation/node_image_manipulation#text_layers
//http://cloudinary.com/documentation/upload_images#text_layers
cloudinary.config({
    cloud_name: 'dro6he6lr',
    api_key   : '848221614325287',
    api_secret: 'bx0PpkGT5lo3e74CuWIhMn29i_s'
});


// Connection
var gitlab = require('gitlab')({
    url  : 'https://gitlab.com/api/v3',
    token: 'qb3ZBd7xzNm_HWzg3jRX'
});
var flash  = require('connect-flash');

module.exports = {

    index: function (req, res) {

        gitlab.projects.all({}, function (projects) {

            //console.log(projects);

            var that      = this;
            that.projects = projects;

            gitlab.groups.listMembers(227762, function (users) {

                res.render('home', {
                    "projects": that.projects,
                    "users"   : users,
                    "msg"     : req.flash('info'),
                    "status"  : req.flash('status')
                });

            });


        });


    },

    getMilestones: function (req, res) {

        var self = this;

        if (req.body.project_id == "") {
            req.flash('info', 'Please complete all the fields');
            res.redirect(303, '/');
        } else {


            var pid = req.body.project_id;

            console.log(pid);

            gitlab.projects.milestones.all(pid, function (milestones) {
                console.log("");
                console.log("=== Milestones ===");
                console.log(milestones);

                return res.json(milestones);
            });


        }

    },


    createIssue: function (req, res) {


        //File uploads

        var form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {


            if (fields.project == ""
                || fields.title == ""
                || fields.description == ""
                || fields.assign == "") {

                req.flash('info', 'Please complete all the fields');
                req.flash('status', "danger");
                res.redirect(303, '/');


            } else {


                if (err) return res.redirect(303, '/error');


                console.log(fields);

                console.log(files);


                var pid      = fields.project;
                var title    = fields.title;
                var time_due = fields.time;
                var desc     = fields.description;

                if (time_due) {
                    var time_str = '** Time Due: ' + time_due + '**';
                    title += " " + time_str;
                    desc         = time_str + '\n\n' + desc;
                }


                var params = {
                    id          : pid,
                    title       : title,
                    description : desc,
                    milestone_id: fields.milestone,
                    assignee_id : fields.assign
                };


                /*

                 If there's a screenshot, upload to cloudinary, then submit issue with link in it.

                 */
                if (files.screenshot.size > 0) {
                    try {

                        cloudinary.uploader.upload(files.screenshot.path, function (result) {

                                console.log(result);

                                if (!result.error) {
                                    var image_id = result.public_id;
                                    var image    = cloudinary.image(image_id + ".jpg");

                                    var image_str = '\n\n ![' + files.screenshot.name + '](' + result.url + ')';

                                    params.description += image_str;
                                }


                                gitlab.issues.create(pid, params, function (resp) {


                                    req.flash('info', "Issue submitted");
                                    req.flash('status', "success");
                                    res.redirect(303, '/');

                                });

                            }
                            , {public_id: "bugs/" + files.screenshot.name});

                    } catch (ex) {
                        console.log(ex);
                        console.log("Error uploading to cloudinary.");
                    }

                } else {

                    gitlab.issues.create(pid, params, function (resp) {


                        console.log(resp);
                        req.flash('info', "Issue submitted");
                        res.redirect(303, '/');

                    });
                }

            }
        });


    },

    createMilestone: function (req, res) {

        if (req.body.project_id == ""
            || req.body.milestone_title == ""
            || req.body.milestone_desc == ""
            || req.body.due_date == "") {

            req.flash('info', 'Please complete all the fields');

            return res.json("err");

        } else {

            var due_date = moment(req.body.due_date).format('YYYY-MM-DD');

            var params = {
                id         : req.body.project_id,
                title      : req.body.milestone_title,
                description: req.body.milestone_desc,
                due_date   : due_date
            };

            gitlab.projects.milestones.add(params.id, params.title, params.description, params.due_date, function (resp) {


                console.log(resp);
                return res.json(resp);

            });
        }
    },

    createuserform: function (req, res) {

        res.render('userform');

    }
    ,

    json: function (req, res) {

        res.json({user: 'tobi'});

    },

    jsonp: function (req, res) {

        res.jsonp({user: req.params.name});

    }
    ,


};