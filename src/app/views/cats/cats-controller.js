goog.provide('norris.cats.CatsController');



/**
 * Cats Controller.
 * @param {!angular.Scope} $scope The current controller $scope.
 * @constructor
 * @ngInject
 */
norris.cats.CatsController = function($scope) {
  $scope.cats = [
    {name: 'Morris', color: 'Orange'},
    {name: 'Spades', color: 'Black'}
  ];
  console.log('scope', $scope);
  console.log('cats', this.cats);
};
