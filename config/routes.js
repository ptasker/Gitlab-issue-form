var controller = require('../controllers/front')
    , flash = require('connect-flash');

module.exports.initialize = function (app, router) {

    router.get('/', controller.index);
    router.post('/create', controller.createIssue);
    router.post('/milestones', controller.getMilestones);
    router.post('/createmilestone', controller.createMilestone);
    router.get('/gitlab-group', controller.getGitlabGroupID);
    router.get('/error', function(req, res){
        res.status(500);

    });

    app.use('/', router);

    app.use(function (req, res) {
        res.status(404);
        res.render('404');
    });

// custom 500 page
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });

};
