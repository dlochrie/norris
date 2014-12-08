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

  it('should update the current quote', function() {
    ctrl.updateQuote();
    var currentQuote = ctrl.scope_.quote;
    expect(goog.array.contains((quoteList, currentQuote)));

    // Assert that updating the quote will result in a new quote not equal to the current one.
    ctrl.updateQuote();
    expect(ctrl.scope_.quote).not.toEqual(currentQuote);
  });
});
