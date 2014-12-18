goog.provide('norris.auth.AuthService');



/**
 * The Auth service.
 * @param {!angular.$cookieStore} $cookieStore The Angular Cookie Store Service.
 * @param {!Object} sessionService
 * @param {!Object} userService
 * @param {!Object.<string,!Object>} ACCESS_LEVELS
 * @param {!Object.<string,!Object>} ACCESS_ROLES
 * @constructor
 * @ngInject
 * @export
 */
norris.auth.AuthService = function($cookieStore, sessionService, userService,
    ACCESS_LEVELS, ACCESS_ROLES) {
  /**
   * Reference to Injected Services.
   * @type {!Object.<string, !Object>}
   * @private
   */
  this.ij_ = {
    cookieStore: $cookieStore,
    sessionService: sessionService,
    userService: userService,
    ACCESS_ROLES: ACCESS_ROLES,
    ACCESS_LEVELS: ACCESS_LEVELS
  };

  /**
   * User access levels
   * @type {!Object.<string, !Object>}
   */
  this.levels = ACCESS_LEVELS;

  /**
   * User access roles
   * @type {!Object.<string,!Object>}
   */
  this.roles = ACCESS_ROLES;


  /**
   * Remove the current user cookie
   */
  this.ij_.cookieStore.remove('user');


  /**
   * The current user (defaults to empty username with `public` role)
   * @type {!Object}
   */
  this.currentUser = {
    username: '',
    role: this.roles['public']
  };
};


/**
 * Updates the current user object
 * @param {!Object} user
 * @return {!Object}
 * @private
 */
norris.auth.AuthService.prototype.setCurrentUser_ = function(user) {
  return angular.extend(this.currentUser, user);
};


/**
 * Checks to see if the user is authorized for this level.
 * @param {!Object.<string,number>} level
 * @param {!Object.<string,(number|number)>} role
 * @return {boolean} whether or not the user is authorized
 * @export
 */
norris.auth.AuthService.prototype.authorize = function(level, role) {
  if (role === undefined) {
    role = this.currentUser.role;
  }
  return !!(level.bitMask & role.bitMask);
};


/**
 * Checks to see if a `user` is logged in.
 * @param {!Object} user
 * @return {boolean}
 * @export
 */
norris.auth.AuthService.prototype.isLoggedIn = function(user) {
  var ACCESS_ROLES = this.ij_.ACCESS_ROLES;
  if (user === undefined) {
    user = this.currentUser;
  }
  return user.role.title === ACCESS_ROLES.user.title ||
      user.role.title === ACCESS_ROLES.admin.title;
};


/**
 * Registers a new user.
 * @param {!Object} user
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.AuthService.prototype.register = function(user) {
  return this.ij_.userService.create(user).then(this.setCurrentUser_);
};


/**
 * Logs a user in.
 * @param {string} username
 * @param {string} password
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.AuthService.prototype.login = function(username, password) {
  return this.ij_.sessionService.get(username, password).then(
      this.setCurrentUser_);
};


/**
 * Logs a user out.
 * @return {!angular.$http.HttpPromise}
 * @export
 */
norris.auth.AuthService.prototype.logout = function() {
  // get the username for the current user
  var userId = this.currentUser.id;
  // send request to remove the user's session
  return this.ij_.sessionService.remove(userId).then(goog.bind(function() {
    this.setCurrentUser_({username: '', role: this.roles['public']});
  }, this));
};
