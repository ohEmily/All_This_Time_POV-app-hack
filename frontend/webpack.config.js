var webpack = require("webpack");

module.exports = function() {
  return {
    context: __dirname,
    cache: false,
    entry: {
      "entry": ["./src/scripts/js/entry.js"],
      "components": ["./src/scripts/js/components.js"]
    },
    output: {
      path: __dirname+'/www/',
      filename: "./scripts/js/[name].min.js", 
      chunkFilename: "./scripts/js/main.min-[chunkhash].js"
    },
    module: {
      loaders: [
        {test: /\.(js|jsx)$/, loader: "jsx-loader"},
        {test: /\.css$/, loader: "style!css" },
        {test: /\.(jpg|png)$/, loader: "url?limit=10000" }
      ]
    },
    plugins: [
      new webpack.BannerPlugin("*/", {raw: true}),
      new webpack.BannerPlugin("Developer: Simon Lindsay / @simonlindsay", {raw: true}),
      new webpack.BannerPlugin("/*", {raw: true}),
      // new webpack.optimize.DedupePlugin(),
      // new webpack.optimize.UglifyJsPlugin()
    ]
  }
};