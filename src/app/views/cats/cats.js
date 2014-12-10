goog.provide('norris.cats.module');

goog.require('norris.cats.CatsController');


/**
 * The cats module.
 */
norris.cats.module = angular.module('norris.cats', []).
    controller('CatViewController', norris.cats.CatsController);
