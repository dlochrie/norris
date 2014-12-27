goog.require('goog.array');


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
        stateSpy = sinon.spy();
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
      expect(stateSpy.calledWith('posts.show')).toBe(true);

      // Flush pending requests.
      httpBackend.flush();
    });
  });

  describe('when performing crud', function() {
    var deferred, mockAddPost, mockGetPosts, newPost, mockResponseObject;

    beforeEach(function() {
      // Create a deferred $q object for emulating promises.
      deferred = q.defer();

      // Provide mock/stubs for the apiProxy "add" and "all" methods.
      mockAddPost = sinon.stub(apiProxy, 'add');
      mockGetPosts = sinon.stub(apiProxy, 'all');

      // Emulate a response object.
      mockResponseObject = [{foo: 'bar'}, {baz: 'qux'}];

      // Create a valid new post.
      newRow = {title: 'foo', category: 'bar', body: 'baz'};
    });

    it('should get all posts', function() {
      // Tell the mock to respond with the mocked data.
      deferred.resolve({data: mockResponseObject});
      mockGetPosts.returns(deferred.promise);

      // Assert that there are no posts yet.
      expect(scope.posts).toEqual([]);

      // Make the request.
      ctrl.getPosts_();
      scope.$apply();

      // Assert the posts array is populated.
      expect(scope.posts).toEqual(mockResponseObject);
      expect(scope.message).toBe(null);
      httpBackend.flush();
    });

    it('should NOT get all posts when there is an error', function() {
      // Tell the mock to fail with a rejection.
      deferred.reject();
      mockGetPosts.returns(deferred.promise);

      // Assert that there are no posts yet.
      expect(scope.posts).toEqual([]);
      expect(scope.message).toBe(null);

      // Make the request.
      ctrl.getPosts_();
      scope.$apply();

      // Assert the posts array is still empty, and that an error message
      // is displayed.
      expect(scope.posts).toEqual([]);
      expect(scope.message).toBe('There was an error getting the Posts.');
      httpBackend.flush();
    });

    it('should add a post and clear the editRow object', function() {
      // Fake a successful response.
      deferred.resolve();
      mockAddPost.returns(deferred.promise);

      scope['editRow'] = newRow;
      ctrl.addPost();

      // Call $apply so that the promises can be resolved.
      scope.$apply();

      // Assert that the first element of the array is the new row, and that
      // editRow object is cleared out.
      expect(scope.posts.shift()).toEqual(newRow);
      expect(scope.editRow).toEqual({});
      expect(scope.message).toEqual('Success!');

      // Assert that the UI Router navigated to the "show" page.
      expect(stateSpy.calledWith('posts.show')).toBe(true);

      // Flush pending requests.
      httpBackend.flush();
    });

    it('should not add a post with invalid or missing params', function() {
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
        expect(stateSpy.calledWith('posts.show')).toBe(true);
      });

      httpBackend.flush();
    });

    it('should display an error when the post fails', function() {
      // Fake a failed response.
      deferred.reject();
      mockAddPost.returns(deferred.promise);

      scope['editRow'] = newRow;
      ctrl.addPost();

      // Call $apply so that the promises can be resolved.
      scope.$apply();

      // Assert that an http error updates the message with an error message.
      expect(scope.posts.length).toBe(0);
      expect(scope.editRow).toEqual(newRow);
      expect(scope.message).
          toEqual('A server error was encountered while adding the post.');

      // Assert that the UI Router navigated to the "show" page.
      expect(stateSpy.calledWith('posts.show')).toBe(true);

      // Flush pending requests.
      httpBackend.flush();
    });
  });
});
