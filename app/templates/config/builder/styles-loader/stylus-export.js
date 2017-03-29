module.exports = function (minimize) {
  return {
    fallback: "style-loader",
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: !!minimize
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
  };
};
