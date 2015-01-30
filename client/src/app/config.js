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
};
