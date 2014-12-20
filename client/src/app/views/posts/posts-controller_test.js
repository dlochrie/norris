describe('PostsController', function() {
  var ctrl, scope, httpBackend, apiProxy, q, stateSpy;

  beforeEach(module('norris.posts'));
  beforeEach(module('ui.router'));

  beforeEach(inject(function(
      $rootScope, $controller, $q, $httpBackend, apiProxyService) {
        httpBackend = $httpBackend,
        scope = $rootScope,
        apiProxy = apiProxyService,
        q = $q;

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
    var deferred;

    beforeEach(function() {
      deferred = q.defer();
    });

    it('should get all posts', function() {
      // TODO(dlochrie): Pls implement.
      httpBackend.flush();
    });

    it('should add a post and clear the editRow object', function() {
      // Emulate a returned promise in the ApiProxy service.
      spyOn(apiProxy, 'add').and.callFake(function() {
        deferred.resolve();
        return deferred.promise;
      });

      var newRow = scope['editRow'] =
          {'title': 'foo', 'category': 'bar', 'body': 'baz'};
      ctrl.addPost();

      // Call $apply so that the promises can be resolved.
      scope.$apply();

      // Assert that the first element of the array is the new row, and that
      // editRow object is cleared out.
      expect(scope.posts.shift()).toEqual(newRow);
      expect(scope.editRow).toEqual({});
      expect(scope.message).toEqual('Success!');

      // Assert that the UI Router navigated to the "show" page.
      expect(stateSpy).toHaveBeenCalledWith('posts.show');

      // Flush pending requests.
      httpBackend.flush();
    });

    it('should not add a post with invalid or missing params', function() {
      // Emulate a returned promise in the ApiProxy service.
      spyOn(apiProxy, 'add').and.callFake(function() {
        deferred.resolve();
        return deferred.promise;
      });

      var testCases = [null, undefined, 0, 1, true, false, {}, [],
            {'title': 'foo', 'category': null, 'body': 'baz'}];

      goog.array.forEach(testCases, function(test) {
        scope['editRow'] = test;
        ctrl.addPost();

        // Call $apply so that the promises can be resolved.
        scope.$apply();

        // Assert that the editRow model was not added, and that a message is
        // displayed to the user.
        expect(scope.posts.length).toBe(0);
        expect(scope.editRow).toEqual(test);
        expect(scope.message).toEqual(
            'Some of the fields are invalid are missing.');

        // Assert that the UI Router navigated to the "show" page.
        expect(stateSpy).toHaveBeenCalledWith('posts.show');
      });

      httpBackend.flush();
    });

    it('should display an error when the post fails', function() {
      // Emulate a promise that fails/rejects the request.
      spyOn(apiProxy, 'add').and.callFake(function() {
        deferred.reject();
        return deferred.promise;
      });

      var newRow = scope['editRow'] =
          {'title': 'foo', 'category': 'bar', 'body': 'baz'};
      ctrl.addPost();

      // Call $apply so that the promises can be resolved.
      scope.$apply();

      // Assert that an http error updates the message with an error message.
      expect(scope.posts.length).toBe(0);
      expect(scope.editRow).toEqual(newRow);
      expect(scope.message).
          toEqual('A server error was encountered while adding the post.');

      // Assert that the UI Router navigated to the "show" page.
      expect(stateSpy).toHaveBeenCalledWith('posts.show');

      // Flush pending requests.
      httpBackend.flush();
    });
  });
});
