const merge = require("webpack-merge");
const common = require("./webpack.config.common.js");
const UglufyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new UglufyJSPlugin({
      sourceMap: true
    })
  ]
});

