goog.provide('norris.app');

goog.require('norris.cats.module');
goog.require('norris.quotes.module');


/**
 * The application's root module. This is the entry point into the application.
 */
norris.app.module = angular.module('norris', [
  norris.cats.module.name,
  norris.quotes.module.name
]);
