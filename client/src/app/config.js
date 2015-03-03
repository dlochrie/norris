goog.provide('norris.config');


/**
 * Router for the application.
 * @param {!ui.router.$stateProvider} $stateProvider The $stateProvider service.
 * @param {!ui.router.$urlRouterProvider} $urlRouterProvider The
 *     $urlRouterProvider service.
 * @ngInject
 * @export
 */
norris.config = function($stateProvider, $urlRouterProvider) {
  // Set the default redirect for any missing route.
  $urlRouterProvider.otherwise('/');

  $stateProvider.
      state('home', {
        url: '/',
        templateUrl: 'states/home/home.html'
      }).
      state('cats', {
        url: '/cats',
        templateUrl: 'states/cats/cats.html',
        controller: 'CatsController',
        controllerAs: 'catsCtrl'
      }).
      state('guestbook', {
        url: '/guestbook',
        templateUrl: 'states/guestbook/guestbook.html',
        controller: 'GuestBookController',
        controllerAs: 'guestCtrl'
      }).
      state('posts', {
        url: '/posts',
        templateUrl: 'states/posts/posts.html',
        controller: 'PostsController',
        controllerAs: 'postsCtrl'
      }).
      state('posts.show', {
        templateUrl: 'states/posts/partials/show.html'
      }).
      state('posts.add', {
        templateUrl: 'states/posts/partials/add.html'
      });
};
