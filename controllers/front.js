    /**

      =============================================

      Main controller for the views of the app

      =============================================

      **/


     var request = require('request');


      module.exports = {

        index: function (req, res) {

            var gitlab = require('gitlab');

            // Connection
            var gitlab = require('gitlab')({
                url:   'https://gitlab.com/api/v3',
                token: 'qb3ZBd7xzNm_HWzg3jRX'
            });

            //var client = gitlab.createPromise({
            //    api: 'https://gitlab.com/api/v3',
            //    privateToken: 'qb3ZBd7xzNm_HWzg3jRX'
            //});

            //console.log(client.projects.list({}));

            gitlab.projects.all({ }, function (projects) {
                console.log(projects);

                var that = this;

                that.projects = projects;

                gitlab.groups.listMembers(227762, function(users){


                    console.log(users);
                    res.render('home', {
                        "projects" : that.projects,
                        "users" : users
                    });

                });



            });





          
        },



        createuserform : function(req, res){

         res.render('userform');

       },

       createuser : function ( req, res ){

        if (req.body.username == ""
          || req.body.fullname == ""
          || req.body.email == ""
          || req.body.password == "") {

          res.render('userform', {msg: "Please fill out all the fields."});

        return;
      }



    },

    json: function (req, res) {

      res.json({ user: 'tobi' });

    },

    jsonp: function (req, res) {

      res.jsonp({ user: req.params.name });

    },


  };