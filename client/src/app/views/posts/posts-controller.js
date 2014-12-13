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
   * Model name.
   * @const {string}
   * @private
   */
  this.modelName_ = 'posts';

  /**
   * @type {string} Message to display after requests.
   */
  $scope['message'] = null;

  $scope['editRow'] = {'title': null, 'postegory': null, 'body': null};

  /**
   * Initialize the Posts' list.
   */
  $scope['posts'] = [];

  // Get the initial posts.
  this.getPosts_();
};


/**
 * Updates the current list of posts.
 * @private
 */
norris.posts.PostsController.prototype.getPosts_ = function() {
  var scope = this.ij_.scope,
      self = this;
  this.ij_.apiProxy.all(this.modelName_).then(function(posts) {
    scope['posts'] = posts.data || [];
  }, function() {
    self.scope_['message'] = 'There was an error getting Posts.';
  });
};


/**
 * Adds a new post.
 * @export
 */
norris.posts.PostsController.prototype.addPost = function() {
  var ij = this.ij_,
      apiProxy = ij.apiProxy,
      scope = ij.scope,
      self = this;

  var post = angular.copy(scope['editRow']);
  apiProxy.add(this.modelName_, post).then(function() {
    // Add the post to the current array and report the success.
    scope['message'] = 'Success!';
    scope['posts'].push(post);
    // Clear the model so the form will be empty.
    scope['editRow'] = {};
  }, function() {
    scope['message'] = 'Could not add the post. Please try again.';
  });
};
