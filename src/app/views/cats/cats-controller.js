goog.provide('norris.cats.CatsController');



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
  // Get the initial cats list...
  this.getCats();

  /**
   * Initialize the form with an empty cat object.
   * @expose
   */
  this.scope_.editCat = {name: null, color: null};
};


/**
 * Updates the current list of cats.
 * @export
 */
norris.cats.CatsController.prototype.getCats = function() {
  /** @expose */
  this.scope_.cats = norris.cats.CatsController.DEFAULT_CATS_LIST_;
};


/**
 * Adds a new empty cat field.
 * @export
 */
norris.cats.CatsController.prototype.addCat = function() {
  var scope = this.scope_;
  var model = angular.copy(scope.editCat);
  scope.cats.push(model);
  scope.editCat = {name: null, color: null};
};


/**
 * The default cats list.
 * @const {!Array.<{!Object}>}
 * @private
 */
norris.cats.CatsController.DEFAULT_CATS_LIST_ = [
  {name: 'Morris', color: 'Orange'},
  {name: 'Spades', color: 'Black'}
];
