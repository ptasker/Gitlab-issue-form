var gitlab = require('./gitlab_init');

module.exports = function(req, res, next) {
  gitlab.groups.listMembers( process.env.gitlab_group_id, function (users) {
    req.app.locals.users = users;
    next();
  });
}
