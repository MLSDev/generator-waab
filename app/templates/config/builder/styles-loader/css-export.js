module.exports = function (minimize, sourceMap) {
  return {
    fallback: "style-loader",
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: !!minimize,
          'resolve url': true,
          sourceMap: !!sourceMap
        }
      }
    ]
  }
};
