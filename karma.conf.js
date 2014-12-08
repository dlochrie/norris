/**
 * Karma Runner configuration.
 */
var CLOSURE_LIB_PATH_ = 'vendor/closure-library/closure/goog/',
    CLOSURE_BASE_ = CLOSURE_LIB_PATH_ + 'base.js',
    CLOSURE_DEPS_ = CLOSURE_LIB_PATH_ + 'deps.js',
    ANGULAR_LIB_PATH_ = 'vendor/angular/',
    ANGULAR_MIN_ = ANGULAR_LIB_PATH_ + 'angular.min.js',
    ANGULAR_MOCKS_ = ANGULAR_LIB_PATH_ + 'angular-mocks.js';

// Set up the preprocessors. Closure dependencies can be resolved using
// the karma-closure module.
var PREPROCESSORS_ = {};
PREPROCESSORS_['src/**/*_test.js'] = ['closure', 'closure-iit'];
PREPROCESSORS_['src/**/!(*_test.js)'] = ['closure'];
PREPROCESSORS_['src/**/!(*_test.js)/**'] = ['closure'];
PREPROCESSORS_[CLOSURE_DEPS_] = ['closure-deps'];

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'closure'],

    // Files to load in the browser when testing. ORDER is extremely important.
    files: [
      CLOSURE_BASE_,
      ANGULAR_MIN_,
      ANGULAR_MOCKS_,
      {pattern: 'src/**/!(*_test.js)'},
      {pattern: 'src/**/!(*_test.js)/**'},
      {pattern: 'src/**/*_test.js'},
      {pattern: CLOSURE_DEPS_, included: false, served: false}
    ],

    // preprocess matching files before serving them to the browser
    preprocessors: PREPROCESSORS_,

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
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
