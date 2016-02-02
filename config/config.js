var convict = require('convict');
var config  = convict({
    env       : {
        doc    : 'The applicaton environment.',
        format : ['production', 'development', 'test'],
        default: 'development',
        env    : 'NODE_ENV',
        arg    : 'env'
    },
    cloudinary: {
        cloudname : 'dro6he6lr',
        api_key   : '848221614325287',
        api_secret: 'bx0PpkGT5lo3e74CuWIhMn29i_s'
    },
    gitlab    : {
        api_key: 'T_ur8iroyCYbRHP2uFcU'
    }
});
// load environment dependent configuration
//config.loadFile('./config/' + config.get('env') + '.json');

// validate
config.validate();

module.exports = config;