goog.provide('norris.posts.PostsController');



/**
 * Posts Controller.
 * @param {!angular.Scope} $scope The current controller $scope.
 * @param {!norris.apiproxy.ApiProxyService} apiProxyService
 *     The ApiProxy Service.
 * @constructor
 * @ngInject
 * @export
 */
norris.posts.PostsController = function($scope, apiProxyService) {
  /**
   * Reference to Injected Services.
   * @type {!Object.<string, !Object>}
   * @private
   */
  this.ij_ = {
    scope: $scope,
    apiProxy: apiProxyService
  };

  /**
   * Message to display after requests.
   * @type {string}
   */
  $scope['message'] = null;

  /**
   * Posts form data model
   * @type {!Object.<string, string, string>}
   */
  $scope['editRow'] = {'title': null, 'postegory': null, 'body': null};

  /**
   * Initialize the Posts' list.
   * @type {!Array}
   */
  $scope['posts'] = [];

  // Get the initial posts.
  this.getPosts_();
};


/**
 * Model name.
 * @type {string}
 * @private
 */
norris.posts.PostsController.MODULE_NAME_ = 'posts';


/**
 * Updates the current list of posts.
 * @private
 */
norris.posts.PostsController.prototype.getPosts_ = function() {
  var scope = this.ij_.scope;

  this.ij_.apiProxy.all(norris.posts.PostsController.MODULE_NAME_).
      then(function(posts) {
        scope['posts'] = posts.data || [];
      }, function() {
        scope['message'] = 'There was an error getting Posts.';
      });
};


/**
 * Adds a new post.
 * @export
 */
norris.posts.PostsController.prototype.addPost = function() {
  var ij = this.ij_,
      apiProxy = ij.apiProxy,
      scope = ij.scope;

  var post = angular.copy(scope['editRow']);
  apiProxy.add(norris.posts.PostsController.MODULE_NAME_, post).
      then(function() {
        // Add the post to the current array and report the success.
        scope['message'] = 'Success!';
        scope['posts'].push(post);
        // Clear the model so the form will be empty.
        scope['editRow'] = {};
      }, function() {
        scope['message'] = 'Could not add the post. Please try again.';
      });
};
