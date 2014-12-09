goog.provide('norris.quotes.module');

goog.require('norris.quotes.QuotesController');
goog.require('norris.quotes.quotesDirective');


/**
 * Definition for the Quotes module.
 */
norris.quotes.module = angular.module('norris.quotes', []).
    controller('QuotesController', norris.quotes.QuotesController).
    directive('quotesGenerator', norris.quotes.quotesDirective);
