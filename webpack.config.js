const webpack = require('webpack');
const env = process.env.NODE_ENV;

const config = {
  entry: './src/emailcorrect.js',
  output: {
    path: './dist/',
    filename: 'emailcorrect.min.js',
    library: 'EmailCorrect',
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
  plugins: [],
  eslint: {
    configFile: '.eslintrc',
  },
};

if (env === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: false,
      warnings: false,
    },
  }));
}

module.exports = config;
