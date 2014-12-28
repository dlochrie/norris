/**
 * The protractor configuration.
 * @type {Object}
 */
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',

  capabilities: {
    'browserName': 'chrome'
  },

  specs: ['**/*_spec.js'],

  suites: {
    cats: 'views/**/cats_spec.js'
  },

  jasmineNodeOpts: {
    showColors: true
  }
};
