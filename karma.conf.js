const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  const suite = (config.suite && typeof config.suite === 'string') ? config.suite : false;

  if (suite) {
    config.set({
      client: {
        args: ['--grep', suite]
      }
    });
  }

  const fileMask = 'test/**/*test.js';
  const files = [fileMask];
  const preprocessors = {};
  preprocessors[fileMask] = ['webpack', 'sourcemap'];

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    client: {
      mocha: {
        reporter: 'html',
        ui: 'qunit',
      },
    },

    // list of files / patterns to load in the browser
    files: files,


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: preprocessors,


    webpack: Object.assign({}, webpackConfig(), {
      devtool: 'inline-source-map',
    }),

    webpackMiddleware: {
      noInfo: true,
      watchOptions: {
        poll: true
      }
    },


    // list of files to exclude
    exclude: [],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeNoSandboxHeadless'],

    customLaunchers: {
      ChromeNoSandboxHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          // See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
          '--headless',
          '--disable-gpu',
          // Without a remote debugging port, Google Chrome exits immediately.
          ' --remote-debugging-port=9222',
        ],
      },
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
