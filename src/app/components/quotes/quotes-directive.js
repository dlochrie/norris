goog.provide('norris.quotes.QuotesDirective');

goog.require('goog.math');


/**
 * The Quotes Directive. Displays a random message each time it is triggered.
 * @return {!angular.Directive} Directive definition object.
 */
norris.quotes.QuotesDirective = function() {
  return {
    scope: true,
    restrict: 'A',
    templateUrl: 'partials/quotes/quotes.html',
    link: linkFn,
    controller: norris.quotes.QuotesController
  };
};


/**
 * Link Function for the Quotes Directive.
 * @param {!angular.Scope} scope The directive's scope.
 * @param {!angular.JQLite} element The html element.
 * @param {!angular.Attributes} attrs The directive's attributes.
 * @param {!norris.quotes.QuotesController} The Quotes Controller.
 */
function linkFn(scope, element, attrs, ctrl) {
  ctrl.updateQuote();
}



/**
 * Controller for the Quotes Directive.
 * @param {!angular.Scope} $scope The directive's scope.
 * @constructor
 * @ngInject
 */
norris.quotes.QuotesController = function($scope) {
  this.ij_ = {
    scope: $scope
  };
};


/**
 * Updates the current quote.
 */
norris.quotes.QuotesController.prototype.updateQuote = function() {
  console.log('Updating Quote...');
  var quotes = norris.quotes.QuotesController.NORRIS_QUOTES_;
  var length = quotes.length;
  var index = goog.math.randomInt(length);
  this.ij_.scope.quote = quotes[index];
};


/**
 * List of Chuck Norris Quotes, thanks to
 * http://codesqueeze.com/the-ultimate-top-25-chuck-norris-the-programmer-jokes/
 * @const {!Array.<string>}
 * @private
 */
norris.quotes.QuotesController.NORRIS_QUOTES_ = [
  'When Chuck Norris throws exceptions, it’s across the room.',
  'All arrays Chuck Norris declares are of infinite size, because ' +
      'Chuck Norris knows no bounds.',
  'Chuck Norris doesn’t have disk latency because the hard drive knows to ' +
      'hurry the hell up.',
  'Chuck Norris writes code that optimizes itself.',
  'Chuck Norris can’t test for equality because he has no equal.',
  'Chuck Norris doesn’t need garbage collection because he doesn’t call ' +
      '.Dispose(), he calls .DropKick().',
  'Chuck Norris’s first program was kill -9.',
  'Chuck Norris burst the dot com bubble.',
  'All browsers support the hex definitions #chuck and #norris for the ' +
      'colors black and blue.',
  'MySpace actually isn’t your space, it’s Chuck’s (he just lets you use it).',
  'Chuck Norris can write infinite recursion functions…and have them return.',
  'Chuck Norris can solve the Towers of Hanoi in one move.',
  'The only pattern Chuck Norris knows is God Object.',
  'Chuck Norris finished World of Warcraft.',
  'Project managers never ask Chuck Norris for estimations…ever.',
  'Chuck Norris doesn’t use web standards as the web will conform to him.',
  '“It works on my machine” always holds true for Chuck Norris.',
  'Whiteboards are white because Chuck Norris scared them that way.',
  'Chuck Norris doesn’t do Burn Down charts, he does Smack Down charts.',
  'Chuck Norris can delete the Recycling Bin.',
  'Chuck Norris’s beard can type 140 wpm.',
  'Chuck Norris can unit test entire applications with a single assert.',
  'Chuck Norris doesn’t bug hunt as that signifies a probability of failure, ' +
      'he goes bug killing.',
  'Chuck Norris’s keyboard doesn’t have a Ctrl key because nothing controls ' +
      ' Chuck Norris.',
  'When Chuck Norris is web surfing websites get the message “Warning: ' +
      'Internet Explorer has deemed this user to be malicious or dangerous. ' +
      ' Proceed?”.'
];
