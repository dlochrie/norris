goog.provide('norris.apiproxy.ApiProxyService');



/**
 * The ApiProxy Service.
 * @param {!angular.$http} $http The Angular HTTP Service.
 * @constructor
 * @ngInject
 * @export
 */
norris.apiproxy.ApiProxyService = function($http) {
  this.http_ = $http;
};


/**
 * Adds a Resource for a given model.
 * @param {string} modelName The name of the model to add a resource to.
 * @param {!Object} modelData The content of the model.
 * @return {!angular.$q.Promise} Promise containing the response.
 * @export
 */
norris.apiproxy.ApiProxyService.prototype.add = function(
    modelName, modelData) {
  return this.http_.post('/api/' + modelName, modelData);
};


/**
 * Fetches all records for a give model.
 * @param {string} modelName The name of the model to fetch records for.
 * @return {!angular.$q.Promise} Promise containing the response.
 * @export
 */
norris.apiproxy.ApiProxyService.prototype.all = function(modelName) {
  return this.http_.get('/api/' + modelName);
};
