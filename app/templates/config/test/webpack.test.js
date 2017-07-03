const path = require('path');

const DefinePlugin = require('webpack/lib/DefinePlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = function (rootDir) {
  const appConfigs = require('../constants/local');
  const env = 'test';

  return {
    devtool: 'inline-source-map',

    resolve: {

      extensions: ['.ts', '.js'],
      modules: [path.resolve(rootDir, "src"), 'node_modules']
    },

    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            path.resolve(rootDir, "node_modules/rxjs"),
            path.resolve(rootDir, "node_modules/@angular")
          ]
        },

        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              query: {
                sourceMap: false,
                inlineSourceMap: true,
                compilerOptions: {
                  removeComments: true
                },
                // Temporary solution until new version of rx.js. Current version is 5.4.1
                noStrictGenericChecks: false,
                skipLibCheck: true
                // End
              },
            },
            {
              loader: 'angular2-template-loader'
            }
          ]
        },
        {
          test: /\.styl$/,
          include: path.resolve(rootDir, "src"),
          use: [
            {
              loader: 'raw-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('autoprefixer')({
                      browsers: 'last 2 versions'
                    })
                  ];
                }
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                'resolve url': true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: 'css-loader',
              options: {
                'resolve url': true
              }
            }
          ]
        },
        {
          test: /\.pug$/,
          include: path.resolve(rootDir, "src/app"),
          use: [
            {
              loader: 'apply-loader'
            },
            {
              loader: 'pug-loader'
            }
          ]
        },
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: path.resolve(rootDir, "src"),
          exclude: [
            /\.(spec)\.ts$/,
            /node_modules/
          ]
        }
      ]
    },

    plugins: [
      new DefinePlugin({
        'APP_CONST': JSON.stringify(appConfigs.app),
        'ENV': JSON.stringify(env)
      }),
      new ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
        path.resolve(rootDir, 'src')
      )
    ],

    performance: {
      hints: false
    },
    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }
  };
}