module.exports = function (config) {
  const configuration = require('./config/test/karma.conf.js')(__dirname, config);

  config.set(configuration)
};
