const path = require('path');
const webpackConfig = require('./webpack.config')();
const sharedConfig = require('./karma.conf.js');

module.exports = function(config) {
  sharedConfig(config);

  config.set({
    files: [
      'test/unit/**/*test.js'
    ],

    preprocessors: {
      'test/unit/**/*test.js': ['webpack', 'sourcemap']
    },

    webpack: Object.assign({}, webpackConfig, {
      devtool: 'inline-source-map',
      module: Object.assign({}, webpackConfig.module, {
        // Cover source files when not debugging tests. Otherwise, omit coverage instrumenting to get
        // uncluttered source maps.
        loaders: webpackConfig.module.loaders.concat([{
          test: /\.js$/,
          include: path.resolve('./src'),
          exclude: /node_modules/,
          loader: 'istanbul-instrumenter-loader?+esModules',
          //query: {esModules: true},
        }]).filter(Boolean),
      }),
    }),

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {type: 'lcovonly', subdir: '.'},
        {type: 'json', subdir: '.', file: 'coverage.json'},
        {type: 'html'},
      ],
    },
  });
};
