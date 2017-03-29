const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const stylusLoaders = require('./styles-loader/stylus-export')();
const cssLoaders = require('./styles-loader/css-export')();

const extractStyles = new ExtractTextPlugin('main.css');
const extractVendorStyles = new ExtractTextPlugin('vendor.css');

module.exports = function (dirName) {
  return {
    output: {
      filename: "[name].js",
      pathinfo: true,
      chunkFilename: "[id].js"
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
          enforce: 'pre',
          loader: 'tslint-loader',
          options: {
            configFile: path.resolve(dirName, 'tslint.json')
          }
        },
        {
          test: /\.styl$/,
          include: path.resolve(dirName ,'src/styles'),
          use: extractStyles.extract(stylusLoaders)
        },
        {
          test: /\.css$/,
          use: extractVendorStyles.extract(cssLoaders)
        }
      ]
    },

    devtool: "cheap-module-source-map",
    
    plugins: [
      extractStyles,
      extractVendorStyles
    ],

    devServer: {
      open: true,
      historyApiFallback: true
    },
    
    profile: true
  }
}