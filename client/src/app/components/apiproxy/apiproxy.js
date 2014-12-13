goog.provide('norris.apiproxy.module');

goog.require('norris.apiproxy.ApiProxyService');


/**
 * The apiproxy module definition.
 */
norris.apiproxy.module = angular.module('norris.apiproxy', []).
    service('apiProxyService', norris.apiproxy.ApiProxyService);
