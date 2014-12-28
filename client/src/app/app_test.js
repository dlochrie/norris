goog.require('goog.array');
goog.require('goog.string');

describe('Router', function() {
  var scope, state, location, link, homePath;

  beforeEach(module('norris'));
  beforeEach(module('ui.router'));

  beforeEach(inject(function($rootScope, $location, $state, $templateCache) {
    scope = $rootScope;
    location = $location;
    state = $state;

    // The root, or home path.
    homePath = '/';
  }));

  /**
   * Tests that a url resolves to a matched ui-router state. Emulates a browser
   * location change, and checks that the $state is updated.
   * @param  {string} url The url to test.
   */
  function testUrl(url) {
    // Strip the hash from the string, if there is one.
    var url = goog.string.remove(url, '#');
    location.url(url);
    scope.$apply();
    expect(state.current.url).toEqual(url);
  }

  it('should respond with the home view', function() {
    link = state.href('home');
    expect(link).toEqual('#/');
    testUrl(link);
  });

  it('should respond with the cats view', function() {
    link = state.href('cats');
    expect(link).toEqual('#/cats');
    testUrl(link);
  });

  it('should respond with the guestbook view', function() {
    link = state.href('guestbook');
    expect(link).toEqual('#/guestbook');
    testUrl(link);
  });

  it('should respond with the posts view', function() {
    link = state.href('posts');
    expect(link).toEqual('#/posts');
    testUrl(link);
  });

  it('should redirect to the home page with an invalid url', function() {
    var testCases = [undefined, null, 0, 1, '', '///'];
    goog.array.forEach(testCases, function(url) {
      location.url(url);
      scope.$apply();
      expect(state.current.url).toEqual(homePath);
    });
  });
});
