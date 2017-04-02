var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')

var extractLess = new ExtractTextPlugin({
  filename: "[name].css"
});

var htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html'
});


var config = {
  devtool: 'source-map',
  entry: [
    './src/index.js',
    './src/less/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: extractLess.extract({
        use: [{
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }],
        fallback: "style-loader"
      })
    }]
  },
  plugins: [
    htmlPlugin,
    extractLess
  ]
}

module.exports = config;
