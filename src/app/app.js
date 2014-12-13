goog.provide('norris.app');

goog.require('norris.cats.module');
goog.require('norris.guestbook.module');
goog.require('norris.home.module');
goog.require('norris.posts.module');
goog.require('norris.quotes.module');
goog.require('norris.templates');


/**
 * Definition for the application root module. This is the entry point into
 * the application.
 */
norris.app.module = angular.module('norris', [
  'ngRoute',
  norris.cats.module.name,
  norris.guestbook.module.name,
  norris.home.module.name,
  norris.posts.module.name,
  norris.quotes.module.name
]).config(Router).
    run(norris.templates);



/**
 * Router for the application.
 * @param {!angular.$routeProvider} $routeProvider The Angular Route service.
 * @constructor
 * @ngInject
 * @export
 */
function Router($routeProvider) {
  $routeProvider.
      when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeController',
        controllerAs: 'homeCtrl'
      }).
      when('/cats', {
        templateUrl: 'views/cats/cats.html',
        controller: 'CatsController',
        controllerAs: 'catsCtrl'
      }).
      when('/guestbook', {
        templateUrl: 'views/guestbook/guestbook.html',
        controller: 'GuestBookController',
        controllerAs: 'guestCtrl'
      }).
      when('/posts', {
        templateUrl: 'views/posts/posts.html',
        controller: 'PostsController',
        controllerAs: 'postsCtrl'
      });
}
