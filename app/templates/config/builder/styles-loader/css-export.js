module.exports = function (minimize) {
  return {
    fallback: "style-loader",
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: !!minimize,
          'resolve url': true
        }
      }
    ]
  }
};
