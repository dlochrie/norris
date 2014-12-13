goog.provide('norris.guestbook.GuestBookController');

goog.require('goog.array');



/**
 * GuestBook Controller.
 * @param {!angular.Scope} $scope The current controller $scope.
 * @param {!norris.guestbook.GuestBookController} guestBookService
 *     The Guestbook Service.
 * @constructor
 * @ngInject
 * @export
 */
norris.guestbook.GuestBookController = function($scope, guestBookService) {
  /**
   * Reference to Injected Services.
   * @type {!Object.<string, !Object>}
   * @private
   */
  this.ij_ = {
    scope: $scope,
    guestbook: guestBookService
  };

  // Initialize the controller.
  this.init_();
};


/**
 * Initializes default values for the controller.
 * @private
 */
norris.guestbook.GuestBookController.prototype.init_ = function() {
  var ij = this.ij_,
      scope = ij.scope,
      guestbook = ij.guestbook;

  // Get the initial guest list.
  scope['guests'] = this.getGuests();
};


/**
 * Updates the current list of guests.
 * @return {!Array.<!Object>} The current guest list.
 * @export
 */
norris.guestbook.GuestBookController.prototype.getGuests = function() {
  return this.ij_.guestbook.getGuests();
};


/**
 * Adds a new cat.
 * @export
 */
norris.guestbook.GuestBookController.prototype.addGuest = function() {
  var scope = this.ij_.scope;
  var model = angular.copy(scope['editGuest']);
  scope['guests'].push(model);
  scope['editGuest'] = {};
};


/**
 * Removes a cat.
 * @param {number} index The index at which to remove the cat.
 * @export
 */
norris.guestbook.GuestBookController.prototype.removeGuest = function(index) {
  var scope = this.scope_;
  goog.array.removeAt(scope['guests'], index);
};
