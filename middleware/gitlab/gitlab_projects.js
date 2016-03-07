var gitlab = require('./gitlab_init');
require('dotenv').config();

module.exports = function(req, res, next) {
  gitlab.projects.all({}, function(projects) {
    var group_id = process.env.gitlab_group_id;

    var out = [];

    //Only list projects in the approved group as set in the .env file
    for (var i in projects) {
      project = projects[i];
      if (project.namespace.id == group_id) {
        out.push(project);
      }
    }

    req.app.locals.projects = out;
    next();
  });
}
