const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill', // emulates ES2015 environment for browsers on runtime
    resolve('src', 'es6', 'index.js') // app entry point
  ],
  output: {
    filename: 'bundle.js',
    path: resolve('dist'), // full path to output folder
    libraryTarget: 'umd',
    library: 'myUmdApp' // namespace or object name where everything will be exported on
  },
  resolve: {
    extensions: ['.js'] // allows js and jsx file import without specifying the full file extension
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: resolve('src','es6'),
        loader: ['babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      sourceMap: true,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ]
}
