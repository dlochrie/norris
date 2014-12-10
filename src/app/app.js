goog.provide('norris.app');

goog.require('norris.cats.module');
goog.require('norris.quotes.module');
goog.require('norris.templates');


/**
 * Definition for the application root module. This is the entry point into
 * the application.
 */
norris.app.module = angular.module('norris', [
  norris.cats.module.name,
  norris.quotes.module.name
]).run(norris.templates);
