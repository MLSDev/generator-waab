module.exports = function (rootDir, config) {
  const testWebpackConfig = require('./webpack.test.js')(rootDir);

  const configuration = {

    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],
    client: {
      captureConsole: false
    },

    files: [
      { pattern: rootDir + '/config/test/spec-bundle.js', watched: false },
      { pattern: rootDir + '/src/public/**/*', watched: false, included: false, served: true, nocache: false }
    ],

    proxies: {
      "/public/": "/src/public/"
    },

    preprocessors: {
      './config/test/spec-bundle.js': ['coverage', 'webpack', 'sourcemap']
    },

    webpack: testWebpackConfig,

    coverageReporter: {
      type: 'in-memory'
    },

    remapCoverageReporter: {
      'text-summary': null,
      json: './coverage/coverage.json',
      html: './coverage/html'
    },

    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },

    singleRun: true,
    
    reporters: ['progress', 'coverage', 'remap-coverage'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: [
      'ChromeHeadless'
    ],

    concurrency: Infinity
  };

  return configuration;
};
