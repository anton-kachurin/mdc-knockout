var sharedConfig = require('./karma.conf.js');

module.exports = function(config) {
  sharedConfig(config);

  config.set({
    files: [
      'test/integration/**/*test.js'
    ],
    preprocessors: {
      'test/integration/**/*test.js': ['webpack', 'sourcemap']
    }
  });
};
