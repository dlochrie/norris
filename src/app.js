goog.provide('norris');
goog.require('norris.cats.catCtrl');

angular.module('norris', ['ngRoute']);

angular.module('norris').
    controller('norris.cats.catCtrl', norris.cats.catCtrl);
