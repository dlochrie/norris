goog.require('goog.array');


describe('QuotesDirective', function() {
  var scope, el, initialQuote;

  beforeEach(module('norris.quotes'));
  beforeEach(module('partials/components/quotes/quotes.html'));

  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    el = $compile('<div quotes-generator></div>')(scope);
    scope.$digest();

    initialQuote = el.find('p').eq(0).html();
  }));

  it('should render with a header and a quote', function() {
    var headerText = el.find('h3').eq(0).html();
    expect(headerText).toEqual('Random Chuck Norris Quote');
    expect(goog.array.contains(norris.quotes.QuotesController.NORRIS_QUOTES_,
        initialQuote)).toBe(true);
  });

  it('should update the quote when the button is pressed', function() {
    // Emulate a user clicking the button.
    var button = el.find('button').eq(0);
    button.triggerHandler('click');

    // Assert that a new quote was generated.
    var newQuote = el.find('p').eq(0).html();
    expect(newQuote).not.toEqual(initialQuote);
  });
});
