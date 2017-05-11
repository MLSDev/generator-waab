module.exports = function (minimize, sourceMap) {
  return {
    fallback: "style-loader",
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: !!minimize,
          sourceMap: !!sourceMap
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
          sourceMap: !!sourceMap
        }
      },
      {
        loader: 'stylus-loader',
        options: {
          'resolve url': true,
          sourceMap: !!sourceMap
        }
      }
    ]
  };
};
