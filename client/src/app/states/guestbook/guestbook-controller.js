goog.provide('norris.guestbook.GuestBookController');

goog.require('goog.array');



/**
 * GuestBook Controller.
 * @param {!norris.guestbook.GuestBookController} guestBookService The
 *     Guestbook Service.
 * @constructor
 * @ngInject
 * @export
 */
norris.guestbook.GuestBookController = function(guestBookService) {
  /**
   * Reference to Injected Guestbook Service.
   * @type {{norris.guestbook.GuestBookController}
   * @private
   */
  this.guestbook_ = guestBookService;

  /**
   * Model for adding/editing guests.
   * @type {{name: string, age: number, occupation: string}}
   */
  this.editGuest = {};

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
  this.guests = this.guestbook_.getGuests();
};


/**
 * Adds a new cat.
 * @export
 */
norris.guestbook.GuestBookController.prototype.addGuest = function() {
  var model = angular.copy(this.editGuest);
  if (model && model.name && model.age && model.occupation) {
    this.guests.push(model);
    this.editGuest = {};
  }
};


/**
 * Removes a cat.
 * @param {number} index The index at which to remove the cat.
 * @export
 */
norris.guestbook.GuestBookController.prototype.removeGuest = function(index) {
  if (goog.isNumber(index) && !isNaN(index)) {
    goog.array.removeAt(this.guests, index);
  }
};
