goog.provide('norris.cats.module');

goog.require('norris.cats.CatsController');


/**
 * The cats module.
 * @return {!angular.Module}
 */
norris.cats.module = angular.module('norris.cats', []).
    controller('CatsController', norris.cats.CatsController);
