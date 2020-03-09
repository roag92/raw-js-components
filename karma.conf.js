var isDocker = require('is-docker')();
var puppeteer = require('puppeteer');

process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine', 'sinon'],
    browsers: ['ChromeCustom'],
    files: ['src/components/**/*.js', 'tests/**/*spec.js'],
    autoWatch: false,
    singleRun: true,
    customLaunchers: {
      ChromeCustom: {
        base: 'ChromeHeadless',
        flags: isDocker ? ['--no-sandbox'] : [],
      },
    },
  });
};
