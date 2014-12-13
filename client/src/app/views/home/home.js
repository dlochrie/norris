goog.provide('norris.home.module');

goog.require('norris.home.HomeController');


/**
 * The home module.
 * @return {!angular.Module}
 */
norris.home.module = angular.module('norris.home', []).
    controller('HomeController', norris.home.HomeController);
