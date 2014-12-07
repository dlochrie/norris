describe('QuotesController', function() {
  var ctrl;

  beforeEach(module('norris.quotes'));

  beforeEach(inject(function($controller) {
    ctrl = $controller;
    console.log('ctrl', ctrl, $controller);
  }));

  it('should initialize and set the first quote on the scope', function() {
    console.log('nothing.');
  });
});
