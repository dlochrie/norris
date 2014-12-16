goog.provide('norris.posts.module');

goog.require('norris.apiproxy.module');
goog.require('norris.posts.PostsController');


/**
 * The posts module definition.
 * @return {!angular.Module}
 */
norris.posts.module = angular.module('norris.posts', [
  norris.apiproxy.module.name
]).
    controller('PostsController', norris.posts.PostsController);
