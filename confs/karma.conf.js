/**
 * Karma Runner configuration.
 * To update, modify the constants down below, but do not change method logic.
 * @param {!Object} config The Karma configuration object.
 * @return {!KarmaConfig} The populated karma config.
 */
module.exports = function(config) {
  return new KarmaConfig(config);
};



/**
 * Karma Configuration Class.
 * @param {!Object} config
 * @constructor
 */
function KarmaConfig(config) {
  /**
   * The Karma Configuration object.
   * @type {!Object.<string>}
   * @private
   */
  this.config_ = config;

  // Set up the Configuration for the Karma runner.
  this.init_();
}


/**
 * Initializes the Karma Configuration.
 * @private
 */
KarmaConfig.prototype.init_ = function() {
  var settings = {};
  settings.basePath = '';
  settings.frameworks = ['jasmine', 'sinon'];
  settings.files = KarmaConfig.FILE_DEPENDENCIES_;
  settings.preprocessors = this.getPreprocessors_();
  settings.reporters = ['progress', 'coverage'];
  settings.coverageReporter = {
    type: 'html',
    dir: '../client/coverage/unit/'
  };
  settings.port = 9876;
  settings.colors = true;
  settings.logLevel = this.config_.LOG_ERROR;
  settings.autoWatch = true;
  settings.browsers = ['Chrome'];
  settings.singleRun = false;

  /**
   * NG HTML Preprocessor Settings. Helps to create modules to use in testing.
   * If you are "serving" your partials from a directory that is different
   * from you "store" them locally, then you might want to change the
   * "stripPrefix" and "prependPrefix" settings accordingly. For help, see the
   * Karma Debug console in chrome.
   * @type {{stripPrefix: string, prependPrefix: string}}
   */
  settings.ngHtml2JsPreprocessor = {
    stripPrefix: '.*/client/src/app/',
    prependPrefix: ''
  };

  // Pass the settings configuration to Karma.
  this.config_.set(settings);
};


/**
 * Creates and returns an object containing the required preprocessors for this
 * configuration.
 * @private
 * @return {!Object.<string, string>} The preprocessors object.
 */
KarmaConfig.prototype.getPreprocessors_ = function() {
  var preprocessors = {};
  KarmaConfig.PREPROCESSORS_.forEach(function(p) {
    preprocessors[p.key] = p.values;
  });
  return preprocessors;
};


/**
 * Path to the Google Closure Library.
 * @const {string}
 * @private
 */
KarmaConfig.CLOSURE_LIB_PATH_ = '../client/closure-library/closure/goog/';


/**
 * Base path to the application.
 * @type {string}
 * @private
 */
KarmaConfig.APPLICATION_PATH_ = '../client/src/app/';


/**
 * Path Pattern for source files that are NOT test files. These are the files
 * we check for test coverage.
 * @const {string}
 * @private
 */
KarmaConfig.SOURCE_FILES_PATH_ = KarmaConfig.APPLICATION_PATH_ +
    '**/!(*_test).js';


/**
 * Path pattern for partials. This is the SOURCE path, and not the
 * DESTINATION path.
 * @const {string}
 * @private
 */
KarmaConfig.PARTIALS_PATH_SOURCE_PATH_ =
    KarmaConfig.APPLICATION_PATH_ + '**/*.html';


/**
 * Base Path to the third-party libraries.
 * @const {string}
 * @private
 */
KarmaConfig.THIRD_PARTY_PATH_ = '../client/third-party/';


/**
 * Path to the local Angular Library.
 * @const {string}
 * @private
 */
KarmaConfig.ANGULAR_LIB_PATH_ = KarmaConfig.THIRD_PARTY_PATH_ + 'angular/';


/**
 * Path to all third-party libraries.
 * @const {string}
 * @private
 */
KarmaConfig.THIRD_PARTY_LIBRARIES_ =
    KarmaConfig.THIRD_PARTY_PATH_ + '**/*.js';


/**
 * Path to the generated tmeplate-cache file.
 * @type {string}
 * @private
 */
KarmaConfig.TEMPLATE_CACHE_ =
    '../client/template-cache/generated/template-cache.js';


/**
 * File dependencies for the Karma Runner.
 * USE CAUTION: The order is extremely important here. Use the Karma Debug
 * option in the browser for troubleshooting.
 * @const {Array.<string|Object>}
 * @private
 */
KarmaConfig.FILE_DEPENDENCIES_ = [
  KarmaConfig.CLOSURE_LIB_PATH_ + 'base.js',
  KarmaConfig.CLOSURE_LIB_PATH_ + 'deps.js',
  KarmaConfig.ANGULAR_LIB_PATH_ + 'angular.min.js',
  {
    pattern: KarmaConfig.ANGULAR_LIB_PATH_ + 'angular.min.js.map',
    included: false
  },
  KarmaConfig.ANGULAR_LIB_PATH_ + 'angular-mocks.js',
  KarmaConfig.THIRD_PARTY_PATH_ + '**/*.js',
  KarmaConfig.TEMPLATE_CACHE_,
  KarmaConfig.APPLICATION_PATH_ + '**/!(app).js',
  KarmaConfig.APPLICATION_PATH_ + 'app.js',
  KarmaConfig.APPLICATION_PATH_ + 'app_test.js',
  {pattern: KarmaConfig.CLOSURE_LIB_PATH_ + '**/*.js', included: false},
  KarmaConfig.PARTIALS_PATH_SOURCE_PATH_
];


/**
 * Preprocessors for the Karma Configuration.
 * Closure dependencies can be resolved using the karma-closure module.
 * "ng-html2js" pre-caches our html and serves them as a JS module.
 * @const {!Array.<!Object(key, value)>}
 * @private
 */
KarmaConfig.PREPROCESSORS_ = [
  {key: KarmaConfig.CLOSURE_DEPS_, values: ['closure']},
  {key: KarmaConfig.SOURCE_FILES_PATH_, values: ['coverage']},
  {key: KarmaConfig.PARTIALS_PATH_SOURCE_PATH_, values: 'ng-html2js'}
];
