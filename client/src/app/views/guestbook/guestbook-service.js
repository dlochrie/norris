goog.provide('norris.guestbook.GuestBookService');



/**
 * The GuestBook Service.
 * @constructor
 * @ngInject
 * @export
 */
norris.guestbook.GuestBookService = function() {
  /**
   * Initialize a new Guest List.
   * @type {!Array.<!Object>}
   * @private
   */
  this.guests_ = norris.guestbook.GuestBookService.PREVIOUS_GUESTS_;
};


/**
 * Retrieves the current guest list.
 * @return {!Array.<!Object>} The current guest list.
 * @export
 */
norris.guestbook.GuestBookService.prototype.getGuests = function() {
  return this.guests_;
};


/**
 * List of previous guests.
 * @const {!Array.<!Object>}
 * @private
 */
norris.guestbook.GuestBookService.PREVIOUS_GUESTS_ = [
  {'name': 'Elvis Presley', 'age': 54, 'occupation': 'Musician'},
  {'name': 'John F. Kennedy', 'age': 42, 'occupation': 'President'},
  {'name': 'Marilyn Monroe', 'age': 24, 'occupation': 'Actress'},
  {'name': 'LeBron James', 'age': 30, 'occupation': 'Athelete'},
  {'name': 'Neil Armstrong', 'age': 42, 'occupation': 'Astronaut'}
];
