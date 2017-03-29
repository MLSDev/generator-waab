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
      chunkFilename: "[id].js",
    },

    module: {
      rules: [
        {
          test: /\.styl$/,
          include: path.resolve(dirName ,'src/styles'),
          use: extractStyles.extract(stylusLoaders)
        },
        {
          test: /\.css$/,
          use: extractVendorStyles.extract(cssLoaders)
        }
      ],

    },

    devtool: "cheap-module-source-map",
    
    plugins: [
      extractStyles,
      extractVendorStyles
    ],

    profile: true
  }
}