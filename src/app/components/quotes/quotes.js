goog.provide('norris.quotes.module');

goog.require('norris.quotes.QuotesDirective');
goog.require('norris.quotes.QuotesService');


/**
 * The Quotes module.
 */
norris.quotes.module = angular.module('norris.quotes', []).
    controller('QuotesController', norris.quotes.QuotesController).
    directive('quotesGenerator', norris.quotes.QuotesDirective).
    service('QuotesService', norris.quotes.QuotesService);
