goog.provide('norris.cats.CatsController');

goog.require('goog.array');



/**
 * Cats Controller.
 * @param {!angular.Scope} $scope The current controller $scope.
 * @constructor
 * @ngInject
 * @export
 */
norris.cats.CatsController = function($scope) {
  /**
   * Scope reference.
   * @type {!angular.Scope}
   * @private
   */
  this.scope_ = $scope;

  // Initialize the controller.
  this.init_();
};


/**
 * Initializes default values for the controller.
 * @private
 */
norris.cats.CatsController.prototype.init_ = function() {
  // Get the initial cats list.
  this.getCats();

  /**
   * Initialize the form with an empty cat object.
   */
  this.scope_['editCat'] = {name: null, color: null};
};


/**
 * Updates the current list of cats.
 * @export
 */
norris.cats.CatsController.prototype.getCats = function() {
  this.scope_['cats'] = norris.cats.CatsController.DEFAULT_CATS_LIST_;
};


/**
 * Adds a new cat if one exists.
 * @export
 */
norris.cats.CatsController.prototype.addCat = function() {
  var scope = this.scope_;
  var model = angular.copy(scope['editCat']);
  if (model.name && model.color) {
    scope['cats'].push(model);
    scope['editCat'] = {name: null, color: null};
  }
};


/**
 * Removes a cat.
 * @param {number} index The index at which to remove the cat.
 * @export
 */
norris.cats.CatsController.prototype.removeCat = function(index) {
  if (goog.isNumber(index) && !isNaN(index)) {
    var scope = this.scope_;
    goog.array.removeAt(scope['cats'], index);
  }
};


/**
 * The default cats list.
 * @const {!Array.<!Object>}
 * @private
 */
norris.cats.CatsController.DEFAULT_CATS_LIST_ = [
  {name: 'Morris', color: 'Orange'},
  {name: 'Spades', color: 'Black'}
];
