goog.provide('norris.quotes.quotesDirective');

goog.require('norris.quotes.QuotesController');


/**
 * The Quotes Directive. Displays a random message each time it is triggered.
 * @return {!angular.Directive} Directive definition object.
 */
norris.quotes.quotesDirective = function() {
  return {
    scope: true,
    restrict: 'A',
    templateUrl: 'partials/quotes/quotes.html',
    controller: norris.quotes.QuotesController,
    controllerAs: 'quotesCtrl'
  };
};
