goog.provide('norris.app');

goog.require('norris.cats.module');
goog.require('norris.config');
goog.require('norris.guestbook.module');
goog.require('norris.posts.module');
goog.require('norris.quotes.module');
goog.require('norris.templates');


/**
 * Definition for the application root module. This is the entry point into
 * the application.
 */
norris.app.module = angular.module('norris', [
  'ui.router',
  norris.cats.module.name,
  norris.guestbook.module.name,
  norris.posts.module.name,
  norris.quotes.module.name
]).config(norris.config).
    run(norris.templates);
