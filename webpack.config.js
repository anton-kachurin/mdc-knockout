var path = require('path');

const PATH = path.resolve(__dirname, 'dist');
const PUBLIC_PATH = '/dist/';

module.exports = {
  entry: './src/material-components-knockout.js',
  output: {
    filename: 'mdc-knockout.js',
    path: PATH,
    publicPath: PUBLIC_PATH
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map'
};
