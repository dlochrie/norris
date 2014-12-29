goog.provide('norris.auth');
goog.provide('norris.auth.module');

goog.require('norris.auth.Access');
goog.require('norris.auth.AuthService');
goog.require('norris.auth.SessionService');
goog.require('norris.auth.UserService');



/**
 * The authentication module definition.
 * @return {!angular.Module}
 */
norris.auth.module = angular.module('norris.auth', ['ngCookies']).
    service('authService', norris.auth.AuthService).
    service('sessionService', norris.auth.SessionService).
    service('userService', norris.auth.UserService).
    constant('ACCESS_LEVELS', norris.auth.Access.LEVELS).
    constant('ACCESS_ROLES', norris.auth.Access.ROLES).
    run(norris.auth.test);


/**
 *
 * @param {!norris.auth.AuthService} authService
 * @param {!norris.auth.SessionService} sessionService
 * @param {!Object} ACCESS_LEVELS
 * @param {!Object} ACCESS_ROLES
 * @ngInject
 */
norris.auth.test = function(authService, sessionService, ACCESS_LEVELS, ACCESS_ROLES) {
  sessionService.get('Brian', 'abc123');
  console.log(authService.currentUser);
  console.log('authorized', authService.authorize(ACCESS_LEVELS['admin'],
      ACCESS_ROLES['public']));
};
