const paths = require("./../paths");

module.exports = {
  entry: {
    backgroundscript: ["babel-polyfill", "./src/background-script.js"],
    popup: "./src/popup.js",
    options: ["babel-polyfill", "./src/options.js"]
  },
  output: {
    filename: "[name].bundle.js",
    path: paths.distFolder
  },
  module: {
    rules: [{
      enforce: "pre",
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "eslint-loader"
      }
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  }
};
