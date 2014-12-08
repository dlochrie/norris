describe('QuotesDirective', function() {
  var scope, el;

  beforeEach(module('norris.quotes'));
  beforeEach(module('partials/components/quotes/quotes.html'));

  beforeEach(inject(function($compile, $rootScope) {
    scope = $rootScope;
    el = $compile('<div quotes-generator></div>')(scope);
    scope.$digest();
  }));

  it('should render with a header and a quote', function() {
    var headerText = el.find('h3').eq(0).html();
    expect(headerText).toEqual('Random Chuck Norris Quote');
    var randomQuote = el.find('p').eq(0).html();
    expect(goog.array.contains(norris.quotes.QuotesController.NORRIS_QUOTES_, randomQuote)).toBe(true);
  });

  it('should update the quote when the button is pressed', function() {
    expect(true).toBe(false);
  });
});