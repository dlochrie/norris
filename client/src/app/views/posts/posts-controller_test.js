goog.require('goog.array');

describe('PostsController', function() {
  var ctrl, scope;

  beforeEach(module('norris.posts'));
  beforeEach(module('ui.router'));

  beforeEach(module(function($stateProvider) {
    // TODO(dlochrie): Abstract this??? Mock this???
    $stateProvider.
      state('posts', {
        url: '/posts',
        templateUrl: 'views/posts/posts.html',
        controller: 'PostsController',
        controllerAs: 'postsCtrl'
      }).
      state('posts.show', {
        templateUrl: 'views/posts/partials/show.html'
      }).
      state('posts.add', {
        templateUrl: 'views/posts/partials/add.html'
      });
  }));

  beforeEach(inject(function($rootScope, $controller, $state) {
    scope = $rootScope;

    ctrl = $controller('PostsController', {
      $scope: scope,
      $state: $state
    });
  }));

  describe('when initializing', function() {
    it('should initialize and set the first quote on the scope', function() {
      expect(scope.message).toBe(null);
      expect(goog.typeOf(scope.posts)).toBe('array');
    });
  });

  describe('when performing crud', function() {
    // Pls implement.
  });
});
