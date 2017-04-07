const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WebpackChunkHash = require("webpack-chunk-hash");
const imageminLoader = require('imagemin-webpack').imageminLoader;
const ImageminWebpackPlugin = require('imagemin-webpack').ImageminWebpackPlugin;
const ImageminGifsicle = require('imagemin-gifsicle');
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminPngquant = require('imagemin-pngquant');

const plugins = [
  ImageminGifsicle(),
  ImageminMozjpeg(),
  ImageminPngquant({
    speed: 10
  })
];

const stylusLoaders = require('./styles-loader/stylus-export')('minimize');
const cssLoaders = require('./styles-loader/css-export')('minimize');

const extractStyles = new ExtractTextPlugin('main.[contenthash].css');
const extractVendorStyles = new ExtractTextPlugin('vendor.[contenthash].css');

module.exports = function (dirName) {
  return {
    output: {
      filename: "[name].[chunkhash].js",
      chunkFilename: "[chunkhash].js"
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
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          include: path.resolve(dirName, "src/public/images"),
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[path][name].[ext]'
              }
            },
            {
              loader: imageminLoader,
              options: {
                plugins
              }
            }
          ]
        }
      ]
    },

    plugins: [
      extractStyles,
      extractVendorStyles,
      new UglifyJsPlugin({
        beautify: false,
        output: {
          comments: false
        }, //prod
        mangle: {
          screw_ie8: true
        }, //prod
        compress: {
          screw_ie8: true,
          warnings: false,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
          negate_iife: false
        }
      }),
      new webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),
      new ImageminWebpackPlugin({
        imageminOptions: {
          plugins
        }
      })
    ]
  }
}