var controller = require('../controllers/front')
    , flash = require('connect-flash');


module.exports.initialize = function (app, router) {

    router.get('/', controller.index);
    router.post('/create', controller.createIssue);
    router.post('/milestones', controller.getMilestones);
    router.post('/createmilestone', controller.createMilestone);

    app.use('/', router);


    app.use(function (req, res) {
        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found...');

    });

// custom 500 page
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
    });
    
};
