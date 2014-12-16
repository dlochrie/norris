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
  // Get the initial guest list.
  this.updateGuestList();
};


/**
 * Updates the current list of guests from the list in the service.
 * @export
 */
norris.guestbook.GuestBookController.prototype.updateGuestList = function() {
  var scope = this.ij_.scope;
  scope['guests'] = this.ij_.guestbook.getGuests();
};


/**
 * Adds a new cat.
 * @export
 */
norris.guestbook.GuestBookController.prototype.addGuest = function() {
  var scope = this.ij_.scope;
  var model = angular.copy(scope['editGuest']);
  if (model && model.name && model.age && model.occupation) {
    scope['guests'].push(model);
    scope['editGuest'] = {};
  }
};


/**
 * Removes a cat.
 * @param {number} index The index at which to remove the cat.
 * @export
 */
norris.guestbook.GuestBookController.prototype.removeGuest = function(index) {
  var scope = this.ij_.scope;
  if (goog.isNumber(index) && !isNaN(index)) {
    goog.array.removeAt(scope['guests'], index);
  }
};
