goog.provide('norris.cats.module');

goog.require('norris.cats.CatsController');


/**
 * The cats module.
 */
norris.cats.module = angular.module('norris.cats', []).
    controller('CatsController', norris.cats.CatsController);
