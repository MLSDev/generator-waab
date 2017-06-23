const webpack = require('webpack');
const path = require('path');

const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

const getPublicPath = (basePath) => {
  return (basePath === '/') ? '' : basePath
};

module.exports = function (dirName, envConstants, env) {
  return {
    context: path.resolve(dirName, "src"),
    entry: {
      main: "./index.ts"
    },
    output: {
      path: path.resolve(dirName, "dist"),
      publicPath: getPublicPath(envConstants.template.basePath)
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: [
            path.resolve(dirName, "src/app"),
            path.resolve(dirName, "src/index")
          ],
          exclude: [
            /vendor|node_modules/,
            /\.spec\.ts$/
          ],
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: path.resolve(dirName, "tsconfig.webpack.json")
              }
            },
            {
              loader: 'angular2-template-loader'
            }
          ]
        },
        {
          test: /\.styl$/,
          include: path.resolve(dirName, "src/app"),
          use: [
            {
              loader: 'to-string-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: env !== 'production'
              }
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
                },
                sourceMap: env !== 'production'
              }
            },
            {
              loader: 'stylus-loader',
              options: {
                'resolve url': true,
                sourceMap: env !== 'production',
                import: [
                  path.resolve(dirName, "src/styles/variables.styl")
                ]
              }
            }
          ]
        },
        {
          test: /\.pug$/,
          include: path.resolve(dirName, "src/app"),
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
          test: /\.(svg|ttf|eot|woff|woff2)$/,
          exclude: path.resolve(dirName, "src/public/images"),
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      ]
    },
    resolve: {
      modules: [
        "node_modules"
      ],
      extensions: [".ts", ".js", ".json", ".css"],
      moduleExtensions: ["-module"]
    },
    plugins: [
      new CheckerPlugin(),
      new WebpackCleanupPlugin(),
      new webpack.DefinePlugin({
        'APP_CONST': JSON.stringify(envConstants.app),
        'ENV': JSON.stringify(env)
      }),
      // new webpack.ProvidePlugin({}),
      new HtmlWebpackPlugin({
        constants: envConstants.template,
        template: path.resolve(dirName, "src/index.html")
      }),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        path.resolve(dirName, 'src')
      ),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: module => {
          if(module.resource && (/^.*\.(css)$/).test(module.resource)) {
            return false;
          }
          return /node_modules/.test(module.resource) || /app\/vendor/.test(module.resource)
        }
      }),
      new CopyWebpackPlugin([
        { from: 'public/favicon/*'},
        { from: 'public/locales/*'},
        { from: 'meta/' + env + '.txt', to: 'meta/robots.txt'}
      ])
    ]
  }
}