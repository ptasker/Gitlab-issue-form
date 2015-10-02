var controller = require('../controllers/front')
    , flash = require('connect-flash');


module.exports.initialize = function (app, router) {

    router.get('/', controller.index);


    router.get('/epic-fail', function (req, res) {
        process.nextTick(function () {
            throw new Error('Kaboom!');
        });
    });




    app.use('/', router);

    app.use(function (req, res) {

        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found');

    });

// custom 500 page
    app.use(function (err, req, res, next) {
        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
    });


};
