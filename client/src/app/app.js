goog.provide('norris.app');

goog.require('norris.cats.module');
goog.require('norris.guestbook.module');
goog.require('norris.posts.module');
goog.require('norris.quotes.module');
goog.require('norris.templates');


/**
 * Definition for the application root module. This is the entry point into
 * the application.
 */
norris.app.module = angular.module('norris', [
  'ui.router',
  norris.cats.module.name,
  norris.guestbook.module.name,
  norris.posts.module.name,
  norris.quotes.module.name
]).config(Router).
    run(norris.templates);



/**
 * Router for the application.
 * @param {!ui.router.$stateProvider} $stateProvider The $stateProvider service.
 * @param {!ui.router.$urlRouterProvider} $urlRouterProvider The
 *     $urlRouterProvider service.
 * @constructor
 * @ngInject
 * @export
 */
function Router($stateProvider, $urlRouterProvider) {
  // Set the default redirect for any missing route.
  $urlRouterProvider.otherwise('/');

  $stateProvider.
      state('home', {
        url: '/',
        templateUrl: 'views/home/home.html'
      }).
      state('cats', {
        url: '/cats',
        templateUrl: 'views/cats/cats.html',
        controller: 'CatsController',
        controllerAs: 'catsCtrl'
      }).
      state('guestbook', {
        url: '/guestbook',
        templateUrl: 'views/guestbook/guestbook.html',
        controller: 'GuestBookController',
        controllerAs: 'guestCtrl'
      }).
      state('posts', {
        url: '/posts',
        templateUrl: 'views/posts/posts.html',
        controller: 'PostsController',
        controllerAs: 'postsCtrl'
      }).
      state('posts.show', {
        templateUrl: 'views/posts/partials/show.html'
      }).
      state('posts.add', {
        templateUrl: 'views/posts/partials/add.html'
      });
}
