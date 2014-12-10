goog.provide('norris.app');

goog.require('norris.cats.module');
goog.require('norris.quotes.module');


/**
 * Definition for the application root module. This is the entry point into
 * the application.
 */
norris.app.module = angular.module('norris', [
  'ngRoute',
  norris.cats.module.name,
  norris.quotes.module.name
]).config(Router);



/**
 * Router for the application.
 * @param {!angular.$routeProvider} $routeProvider The Angular Route service.
 * @constructor
 * @ngInject
 * @export
 */
function Router($routeProvider) {
  $routeProvider.when('/cats', {
    templateUrl: 'partials/views/cats/catview.html',
    controller: 'CatViewController',
    controllerAs: 'catViewCtrl'
  });
}
