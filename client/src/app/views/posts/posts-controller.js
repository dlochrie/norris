goog.provide('norris.posts.PostsController');



/**
 * Posts Controller.
 * @param {!angular.Scope} $scope The current controller $scope.
 * @param {!ui.router.$state} $state The ui-router state service.
 * @param {!norris.apiproxy.ApiProxyService} apiProxyService
 *     The ApiProxy Service.
 * @constructor
 * @ngInject
 * @export
 */
norris.posts.PostsController = function($scope, $state, apiProxyService) {
  /**
   * Reference to Injected Services.
   * @type {!Object.<string, !Object>}
   * @private
   */
  this.ij_ = {
    scope: $scope,
    state: $state,
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

  // // Get the initial posts.
  // this.getPosts_();

  // // Set the initial view as the 'show' view.
  // // TODO(dlochrie): See about contributing to:
  // // https://github.com/google/closure-compiler/blob/master/contrib/
  // // externs/angular_ui_router.js
  // // ...which should help with the propery renaming here...
  // $state['transitionTo']('posts.show');

  this.init_();
};


/**
 * Model name.
 * @type {string}
 * @private
 */
norris.posts.PostsController.MODULE_NAME_ = 'posts';


/**
 * Initialize the controller.
 * @private
 */
norris.posts.PostsController.prototype.init_ = function() {
  // Get the initial posts.
  this.getPosts_();

  // Set the initial view as the 'show' view.
  // TODO(dlochrie): See about contributing to:
  // https://github.com/google/closure-compiler/blob/master/contrib/...
  // ...externs/angular_ui_router.js
  // Adding to the extens can help out in the property renaming.
  this.ij_.state['transitionTo']('posts.show');
};


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
      scope = ij.scope,
      state = ij.state;

  var post = angular.copy(scope['editRow']);
  apiProxy.add(norris.posts.PostsController.MODULE_NAME_, post).
      then(function() {
        // Add the post to the current array and report the success.
        scope['message'] = 'Success!';
        scope['posts'].push(post);
        // Clear the model so the form will be empty.
        scope['editRow'] = {};
        // Go to the 'show' view.
        state['transitionTo']('posts.show');
      }, function() {
        scope['message'] = 'Could not add the post. Please try again.';
      });
};
