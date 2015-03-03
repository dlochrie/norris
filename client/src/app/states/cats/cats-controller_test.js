goog.require('goog.array');

describe('CatsController', function() {
  var ctrl, scope;

  beforeEach(module('norris.cats'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope;
    ctrl = $controller('CatsController', {$scope: scope});
  }));

  describe('when initializing', function() {
    it('should initialize and set the first quote on the scope', function() {
      var cats = ctrl.scope_.cats;
      expect(goog.typeOf(cats)).toBe('array');
      expect(cats).toEqual(norris.cats.CatsController.DEFAULT_CATS_LIST_);
    });
  });

  describe('when performing crud', function() {
    var cats, cat;

    beforeEach(function() {
      cats = ctrl.scope_.cats =
          angular.copy(norris.cats.CatsController.DEFAULT_CATS_LIST_);
    });

    it('should add a cat and clear the editCat model', function() {
      cat = scope.editCat = {name: 'Foo', color: 'Bar'};
      ctrl.addCat();
      expect(cats).toContain(cat);
      expect(scope.editCat).toEqual({name: null, color: null});
    });

    it('should NOT add a cat if either the name or color is missing',
        function() {
         var testCases = [
           {name: 'Foo', color: null},
           {name: null, color: 'Bar'},
           {name: undefined, color: null}
         ];

         goog.array.forEach(testCases, function(test) {
           scope.editCat = test;
           ctrl.addCat();
           expect(cats).not.toContain(test);
         });
       });

    it('should remove a cat', function() {
      var last = cats.length - 1;
      expect(cats).toContain(cats[last]);
      expect(cats.length).toBe(2);
      // Assert that the cat at the last index can be removed.
      ctrl.removeCat(last);
      expect(cats).not.toContain(last);
      expect(cats.length).toBe(1);
      // Assert that the last one can be removed.
      ctrl.removeCat(0);
      expect(cats.length).toBe(0);
    });

    it('should NOT remove a cat at a non-existent index', function() {
      var testCases = [3, null, undefined, NaN, 'string', {}, []];
      goog.array.forEach(testCases, function(test) {
        ctrl.removeCat(test);
        expect(cats.length).toBe(2);
      });
    });
  });
});
