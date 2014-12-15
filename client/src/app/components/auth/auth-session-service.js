goog.provide('norris.auth.SessionService');



/**
 * Session service used to get or delete a user session (ie. login/logout)
 * @param {!angular.$http} $http The Angular HTTP Service.
 * @constructor
 * @ngInject
 * @export
 */
norris.auth.SessionService = function($http) {
  this.http_ = $http;
};


/**
 * Fetches a session for a given user (ie.login)
 * @param {!string} userId
 * @param {!string} password
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.SessionService.prototype.get = function(userId, password) {
  return this.http_({url: '/api/sessions', method: 'POST'},
      {userId: userId, password: password});
};


/**
 * Removes a session for a given user (ie.logout)
 * @param {!string} userId The id of the user to be signed out
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.SessionService.prototype.remove = function(userId) {
  return this.http_({url: '/api/sessions/' + userId, method: 'DELETE'});
};
