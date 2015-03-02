/**
 * Template Cache generator. Generates a stringified version of each html/jade
 * template in order to reduce Ajax requests to the server for them.
 * File content is compressed and written to a template-cache.js file.
 *
 * Usage:
 *
 * 1. First, update the file paths in the constants at the end of this file.
 * 2. Run the following command:
 *
 *     node bin/template-cache.js
 *
 * Running this command should generate a new template cache file.
 */
var util = require('util'),
    fs = require('fs'),
    glob = require('glob'),
    jade = require('jade'),
    minify = require('html-minifier').minify;



/**
 * Constructor for the TemplateCache class.
 * @constructor
 */
function TemplateCache() {
  /**
   * List of templates to cache.
   * @private {!Array}
   */
  this.templates_ = [];

  /**
   * List of files (html, jade) to process.
   * @private {!Array.<string>}
   */
  this.fileList_ = [];

  // Start the process.
  this.init_();
}


/**
 * Initializes the template-cache generation process.
 * @private
 */
TemplateCache.prototype.init_ = function() {
  var self = this;
  glob(TemplateCache.SOURCE_FILE_GLOB_PATTERN_, function(err, files) {
    // Register the fileList.
    self.fileList_ = files;

    // Kick the process off.
    self.processFiles_(self.fileList_.shift());
  });
};


/**
 * Reads a template file, extracts and formats its contents, and adds it to the
 * templates array to be processed later.
 * @param {string} file The file/template to read and format.
 * @param {!Function} done The callback to fire when done.
 * @private
 */
TemplateCache.prototype.readFile_ = function(file, done) {
  var self = this;
  fs.readFile(file, 'utf8', function(err, content) {
    if (!err) {
      content = self.formatContent_(file, content);
      file = file.replace(/client\/src\/app\/(.*?)$/, '$1');
      // If the file was a jade file, fix the extension.
      file = file.replace(/^(.*?)\.jade/, '$1.html');
      self.templates_.push(
          util.format(TemplateCache.ENTRY_REPLACEMENT_STRING_, file, content));
      done();
    } else {
      done(err);
    }
  });
};


/**
 * Creates a new template entry based on the file's name and the file's content.
 * The template entry is based on the REPLACEMENT_STRING constant.
 * @param {string} file The file that contains the content to format.
 * @param {string} content The text of the file to format.
 * @return {string} The updated and formatted content.
 * @private
 */
TemplateCache.prototype.formatContent_ = function(file, content) {
  var output;
  if (TemplateCache.isJadeFile_(file)) {
    output = jade.render(content);
  } else {
    output = minify(content, {collapseWhitespace: true});
  }

  // TODO(dlochrie): What are we doing here? What are we replacing?
  return output.replace(/'/g, '\\\'');
};


/**
 * Writes out the template-cache file, wrapping it with the contents from the
 * wrapper file.
 * @private
 */
TemplateCache.prototype.writeOutJSFile_ = function() {
  var templates = this.templates_,
      header = TemplateCache.GENERATED_FILE_HEADER_;
  fs.readFile(TemplateCache.TEMPLATE_CACHE_WRAPPER_, 'utf8',
      function(err, content) {
        if (!err) {
          content = util.format(content, header, templates.join('\r\r  '));
          fs.writeFile(TemplateCache.TEMPLATE_CACHE_OUT_FILE_, content);
          console.log(util.format('Template Cache written to %s.\n',
              TemplateCache.TEMPLATE_CACHE_OUT_FILE_));
        } else {
          console.log('The process failed:\n\t', err);
        }
      });
};


/**
 * Processes each file in serially. If at any point a file fails to be
 * processed, the whole process fails.
 * @param {string} file The File to process.
 * @private
 */
TemplateCache.prototype.processFiles_ = function(file) {
  var self = this;
  if (file) {
    this.readFile_(file, function(err) {
      if (!err) {
        self.processFiles_(self.fileList_.shift());
      } else {
        console.log('The process failed:\n\t', err);
      }
    });
  } else {
    // Now we can write out the file!!!
    this.writeOutJSFile_();
  }
};


/**
 * Determines whether the file is a jade file or now (based on the file
 * extension).
 * @param {string} file The file to test.
 * @private
 * @return {Boolean} Whether the file is a jade file or not.
 */
TemplateCache.isJadeFile_ = function(file) {
  return file.split('.').pop() === 'jade';
};


/**
 * Root/Base path to the template-cache directory.
 * @const
 * @private {string}
*/
TemplateCache.TEMPLATE_CACHE_DIR_ = 'client/template-cache/';


/**
 * Path to the template-cache wrapper file.
 * @const
 * @private {string}
 */
TemplateCache.TEMPLATE_CACHE_WRAPPER_ =
    TemplateCache.TEMPLATE_CACHE_DIR_ + 'template-cache.js.tpl';


/**
 * Path to the final generated file.
 * @const
 * @private {string}
 */
TemplateCache.TEMPLATE_CACHE_OUT_FILE_ =
    TemplateCache.TEMPLATE_CACHE_DIR_ + 'generated/template-cache.js';


/**
 * Replacement string for template-cache entries. The first placeholder
 * represents the file, and the second represents the (formatted) content.
 * @const
 * @private {string}
 */
TemplateCache.ENTRY_REPLACEMENT_STRING_ = "$templateCache.put('%s','%s');";


/**
 * The glob pattern matching template files.
 * @const
 * @private {string}
 */
TemplateCache.SOURCE_FILE_GLOB_PATTERN_ = 'client/src/app/**/*.{jade,html}';


/**
 * File header for the generated file. Explains that the file is generated.
 * @const
 * @private {string}
 */
TemplateCache.GENERATED_FILE_HEADER_ = '/**\n * DO NOT EDIT THIS FILE: IT IS ' +
    'GENERATED BY THE TEMPLATE CACHE GENERATOR.\n */';


// Start the process.
new TemplateCache();
