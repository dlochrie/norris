goog.require('goog.array');


describe('QuotesController', function() {
  var ctrl, scope;
  var quoteList = norris.quotes.QuotesController.NORRIS_QUOTES_;

  beforeEach(module('norris.quotes'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope;
    ctrl = $controller('QuotesController', {$scope: scope});
  }));

  it('should initialize and set the first quote on the scope', function() {
    var quote = ctrl.scope_.quote;
    expect(goog.typeOf(quote)).toBe('string');
    expect(goog.array.contains((quoteList, quote)));
  });

  it('should get a new quote', function() {
    var quote = ctrl.getNewQuote();
    expect(goog.typeOf(quote)).toBe('string');
    expect(goog.array.contains((quoteList, quote)));
  });

  it('should always return a different quote than the previous one',
     function() {
       var original = angular.copy(
       norris.quotes.QuotesController.NORRIS_QUOTES_);
       norris.quotes.QuotesController.NORRIS_QUOTES_ = ['Test 1', 'Test 2'];

       // To test for recursion, which might not happen every time, we attempt
       // a couple iterations until recursion is detected through the Sinon spy.
       var recursive = false;
       while (recursive === false) {
         sinon.spy(ctrl, 'getNewQuote');
         scope.quote = norris.quotes.QuotesController.NORRIS_QUOTES_[0];
         ctrl.getNewQuote();
         if (ctrl.getNewQuote.callCount > 1) {
           recursive = true;
         }

         // Restore the method, release the spy for the next iteration.
         ctrl.getNewQuote.restore();
       }

       // Restore the original quotes list.
       norris.quotes.QuotesController.NORRIS_QUOTES_ = original;
     });

  it('should update the current quote', function() {
    ctrl.updateQuote();
    var currentQuote = ctrl.scope_.quote;
    expect(goog.array.contains((norris.quotes.QuotesController.NORRIS_QUOTES_,
        currentQuote)));

    // Assert that updating the quote will result in a new quote not equal to
    // the current one.
    ctrl.updateQuote();
    expect(ctrl.scope_.quote).not.toEqual(currentQuote);
  });
});
