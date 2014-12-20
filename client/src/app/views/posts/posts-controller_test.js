describe('PostsController', function() {
  var ctrl, scope, httpBackend, stateSpy;

  beforeEach(module('norris.posts'));
  beforeEach(module('ui.router'));

  beforeEach(inject(function(
      $rootScope, $controller, $q, $httpBackend, apiProxyService) {
        httpBackend = $httpBackend,
        scope = $rootScope;

        // Emulate a returned promise in the ApiProxy service.
        spyOn(apiProxyService, 'add').and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve('Remote call result');
          return deferred.promise;
        });

        // Create a spy so that we can verify state transitions.
        stateSpy = jasmine.createSpy('state');
        var mockStateService = {
          transitionTo: stateSpy
        };

        httpBackend.when('POST', '/api/posts').respond(true);
        httpBackend.when('GET', '/api/posts').respond(true);

        ctrl = $controller('PostsController', {
          $scope: scope,
          $state: mockStateService
        });
      }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('when initializing', function() {
    it('should initialize and set the first quote on the scope', function() {
      expect(scope.message).toBe(null);
      expect(goog.typeOf(scope.posts)).toBe('array');
      expect(scope.posts.length).toBe(0);
      expect(scope.editRow).toEqual(
          {'title': null, 'category': null, 'body': null});

      // Assert that the UI Router navigated to the "show" page.
      expect(stateSpy).toHaveBeenCalledWith('posts.show');

      // Flush pending requests.
      httpBackend.flush();
    });
  });

  describe('when performing crud', function() {
    it('should add a post and clear the editRow object', function() {
      var newRow = scope['editRow'] =
          {'title': 'foo', 'category': 'bar', 'body': 'baz'};
      ctrl.addPost();

      // Call $apply so that the promises can be resolved.
      scope.$apply();

      // Assert that the first element of the array is the new row, and that
      // editRow object is cleared out.
      expect(scope.posts.shift()).toEqual(newRow);
      expect(scope.editRow).toEqual({});

      // Assert that the UI Router navigated to the "show" page.
      expect(stateSpy).toHaveBeenCalledWith('posts.show');

      // Flush pending requests.
      httpBackend.flush();
    });

    it('should not add a post with invalid or missing params', function() {
      httpBackend.flush();
    });
  });
});
