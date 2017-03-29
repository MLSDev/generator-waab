const webpackMerge = require('webpack-merge');

module.exports = function(env) {
  const appConfigs = require('./config/app/' + env + '.js');

  const baseConfig = require('./config/base')(__dirname, appConfigs, env);
  const envConfig = require('./config/builder/' + env + '.js')(__dirname);

  return webpackMerge(baseConfig, envConfig)
};

