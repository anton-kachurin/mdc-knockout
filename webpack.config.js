var path = require('path');

const PATH = path.resolve(__dirname, 'dist');
const PUBLIC_PATH = '/dist/';

module.exports = env => {
  const IS_PROD = env === 'prod';

  return {
    entry: './src/material-components-knockout.js',
    output: {
      filename: 'mdc-knockout' + (IS_PROD ? '.min' : '') + '.js',
      path: PATH,
      publicPath: PUBLIC_PATH
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: ['es2015']
          }
        },
        {
          test: /templates.*\.html$/,
          loader: "babel-loader?presets[]=es2015!es6-template-string-loader"
        }
      ]
    },
    devtool: IS_PROD ? false : 'source-map'
  }
};
