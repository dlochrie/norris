goog.provide('norris.auth.UserService');



/**
 * User service
 * @param {!angular.$http} $http The Angular HTTP Service.
 * @constructor
 * @ngInject
 * @export
 */
norris.auth.UserService = function($http) {
  this.http_ = $http;
};


/**
 * Get a user
 * @param {string} userId
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.UserService.prototype.get = function(userId) {
  var url = '/api/users/' + userId;
  return this.http_({url: url, method: 'GET'});
};


/**
 * Get all users
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.UserService.prototype.getAll = function() {
  var url = '/api/users/';
  return this.http_({url: url, method: 'GET'});
};


/**
 * Create a new user
 * @param {!Object} user
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.UserService.prototype.create = function(user) {
  var url = '/api/users/';
  return this.http_({url: url, method: 'POST'}, user);
};


/**
 * Update a user
 * @param {!Object} user
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.UserService.prototype.update = function(user) {
  var url = '/api/users/' + userId;
  return this.http_({url: url, method: 'PUT'}, user);
};


/**
 * Remove a user
 * @param {string} userId
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.UserService.prototype.remove = function(userId) {
  var url = '/api/users/' + userId;
  return this.http_({url: url, method: 'DELETE'});
};
