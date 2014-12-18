goog.provide('norris.auth.SessionService');

goog.require('goog.crypt.Md5');



/**
 * Used to get or delete a user session (ie. login/logout)
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
 * @param {string} username
 * @param {string} password
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.SessionService.prototype.get = function(username, password) {
  // create an instance of sha1
  var md5 = new goog.crypt.Md5();
  // update with password
  md5.update(password);
  // digest password hash
  var hash = md5.digest();
  // submit request for session
  return this.http_.post('/api/sessions', {username: username, password: hash});
};


/**
 * Removes a session for a given user (ie.logout)
 * @param {string} userId The username of the user to be signed out
 * @return {!angular.$http.HttpPromise} Promise containing the response.
 * @export
 */
norris.auth.SessionService.prototype.remove = function(userId) {
  return this.http_.delete('/api/sessions/' + userId);
};
