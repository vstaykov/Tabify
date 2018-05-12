var path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    eventpage: "./src/event-page.js",
    popup: "./src/popup.js"
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
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
        loader: "babel-loader",
        options: {
          presets: ["env", "react"]
        }
      }
    }]
  }
};
