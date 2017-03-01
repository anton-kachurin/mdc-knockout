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
          options: {
            presets: ['es2015']
          }
        }
      ]
    },
    devtool: IS_PROD ? false : 'source-map'
  }
};
