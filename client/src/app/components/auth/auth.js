goog.provide('norris.auth.module');

goog.require('norris.auth.AuthService');
goog.require('norris.auth.SessionService');
goog.require('norris.auth.UserService');


/**
 * The authentication module definition.
 * @return {!angular.Module}
 */
norris.auth.module = angular.module('norris.auth', []).
    service('norris.auth.authService', norris.auth.AuthService).
    service('norris.auth.sessionService', norris.auth.SessionService).
    service('norris.auth.userService', norris.auth.UserService);
