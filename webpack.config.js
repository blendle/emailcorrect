const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  debug: true,
  entry: './index.js',
  output: {
    path: '.',
    filename: 'emailcorrect.min.js',
    library: 'emailcorrect',
    libraryTarget: 'umd',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  eslint: {
    configFile: '.eslintrc',
  },
};
