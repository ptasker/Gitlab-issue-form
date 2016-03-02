var gitlab = require('./gitlab_init');

module.exports = function(req, res, next) {
  gitlab.projects.all({}, function(projects) {
    req.app.locals.projects = projects;
    next();
  });
}
