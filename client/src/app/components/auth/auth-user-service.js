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
 * Gets a user object
 * @param {string} userId
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.UserService.prototype.get = function(userId) {
  return this.http_.get('/api/users/' + userId);
};


/**
 * Gets all users
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.UserService.prototype.getAll = function() {
  return this.http_.get('/api/users/');
};


/**
 * Creates a new user
 * @param {!Object} user
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.UserService.prototype.create = function(user) {
  return this.http_.post('/api/users/', user);
};


/**
 * Updates a user
 * @param {!Object} user
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.UserService.prototype.update = function(user) {
  return this.http_.put('/api/users/' + user.id, user);
};


/**
 * Removes a user
 * @param {string} userId
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.UserService.prototype.remove = function(userId) {
  return this.http_.delete('/api/users/' + userId);
};
