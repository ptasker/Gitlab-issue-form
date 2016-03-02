require('dotenv').config();

// Connection to Gitlab
var gitlab = require('gitlab')({
  url: 'https://gitlab.com/api/v3',
  token: process.env.gitlab_api_key
});

module.exports = gitlab;
