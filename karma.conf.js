module.exports = function(config) {
    config.set({
      basePath: './',
      frameworks: ['jasmine'],
      browsers: ['ChromeHeadless'],
      files: [
          'src/components/**/*.js',
          'tests/**/*spec.js'
      ],
      autoWatch: false,
      singleRun: true
    });
  };