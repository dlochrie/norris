goog.provide('norris.auth.SessionService');

goog.require('goog.crypt');
goog.require('goog.crypt.Sha1');



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
 * @param {string} email
 * @param {string} password
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.SessionService.prototype.get = function(email, password) {
  // create an instance of sha1
  var sha1 = new goog.crypt.Sha1();
  // update with password
  sha1.update(password);
  // digest password hash and convert to hexadecimal
  var hash = goog.crypt.byteArrayToHex(sha1.digest());

  console.log('password', password, 'hash', hash);

  // submit request for session
  return this.http_.post('/api/sessions', {email: email, password: hash});
};


/**
 * Removes a session for a given user (ie.logout)
 * @param {string} userId The id of the user to be signed out
 * @return {!angular.$http.HttpPromise} Promise containing the response.
 * @export
 */
norris.auth.SessionService.prototype.remove = function(userId) {
  return this.http_.delete('/api/sessions/' + userId);
};
