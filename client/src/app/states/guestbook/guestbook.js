goog.provide('norris.guestbook.module');

goog.require('norris.guestbook.GuestBookController');
goog.require('norris.guestbook.GuestBookService');


/**
 * The guestbook module definition.
 * @return {!angular.Module}
 */
norris.guestbook.module = angular.module('norris.guestbook', []).
    controller('GuestBookController', norris.guestbook.GuestBookController).
    service('guestBookService', norris.guestbook.GuestBookService);
