/**
 * Karma Runner configuration.
 * To update, modify the constants down below, but do not change method logic.
 * @param {!Object} config The Karma configuration object.
 */
module.exports = function(config) {
  // Configure Karma with the KarmaConfig Class.
  var configObj = new KarmaConfig(config);
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
  settings.frameworks = ['jasmine'];
  settings.files = KarmaConfig.FILE_DEPENDENCIES_;
  settings.preprocessors = this.getPreprocessors_();
  settings.reporters = ['progress', 'coverage'];
  settings.coverageReporter = {
    type: 'html',
    dir: 'test/unit/coverage/'
  };
  settings.port = 9876;
  settings.colors = true;
  settings.logLevel = this.config_.LOG_ERROR;
  settings.autoWatch = true;
  settings.browsers = ['Chrome'];
  settings.singleRun = false;

  /**
   * NG HTML Preprocessor Settings. Helps to create modules to use in testing. If you are "serving" your partials from
   * a directory that is different from you "store" them locally, then you might want to change the "stripPrefix" and
   * "prependPrefix" settings accordingly. For help, see the Karma Debug console in chrome.
   * @type {{stripPrefix: string, prependPrefix: string}}
   */
  settings.ngHtml2JsPreprocessor = {
    stripPrefix: 'src/app/',
    prependPrefix: 'partials/'
  };

  // Pass the settings configuration to Karma.
  this.config_.set(settings);
};


/**
 * Creates and returns an object containing the required preprocessors for this configuration.
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
KarmaConfig.CLOSURE_LIB_PATH_ = 'vendor/closure-library/closure/goog/';


/**
 * Path to the Google Closure base.js file.
 * @const {string}
 * @private
 */
KarmaConfig.CLOSURE_BASE_ = KarmaConfig.CLOSURE_LIB_PATH_ + 'base.js';


/**
 * Path to the Google Closure deps.js file.
 * @const {string}
 * @private
 */
KarmaConfig.CLOSURE_DEPS_ = KarmaConfig.CLOSURE_LIB_PATH_ + 'deps.js';


/**
 * Path to the local Angular Library.
 * @const {string}
 * @private
 */
KarmaConfig.ANGULAR_LIB_PATH_ = 'vendor/angular/';


/**
 * Path to the main Angular JS file.
 * @const {string}
 * @private
 */
KarmaConfig.ANGULAR_MIN_ = KarmaConfig.ANGULAR_LIB_PATH_ + 'angular.min.js';


/**
 * Path to the Angular Mocks JS file. Required for testing.
 * @const {string}
 * @private
 */
KarmaConfig.ANGULAR_MOCKS_ = KarmaConfig.ANGULAR_LIB_PATH_ + 'angular-mocks.js';


/**
 * Path Pattern for source files that are NOT test files.
 * @const {string}
 * @private
 */
KarmaConfig.SOURCE_FILES_PATH_ = 'src/app/**/!(*_test).js';


/**
 * Path to the Angular application main app.js file.
 * @const {string}
 * @private
 */
KarmaConfig.SOURCE_FILES_APP_PATH_ = 'src/app/app.js';


/**
 * Path pattern the files that are not the application main path.
 * @const {string}
 * @private
 */
KarmaConfig.SOURCE_FILES_NON_APP_PATH_ = 'src/app/**/!(app).js';


/**
 * File dependencies for the Karma Runner.
 * USE CAUTION: The order is extremely important here. Use the Karma Debug option in the browser for troubleshooting.
 * @const {Array.<string|Object>}
 * @private
 */
KarmaConfig.FILE_DEPENDENCIES_ = [
  KarmaConfig.CLOSURE_BASE_,
  KarmaConfig.CLOSURE_DEPS_,
  KarmaConfig.ANGULAR_MIN_,
  KarmaConfig.ANGULAR_MOCKS_,
  KarmaConfig.SOURCE_FILES_NON_APP_PATH_,
  KarmaConfig.SOURCE_FILES_APP_PATH_,
  {pattern: KarmaConfig.CLOSURE_LIB_PATH_ + '**/*.js', included: false},
  'src/app/**/*.html'
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
  {key: 'src/app/**/*.html', values: 'ng-html2js'}
];
