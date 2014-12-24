goog.require('goog.object');

describe('apiProxyService', function() {
  var apiProxy, httpBackend, deferred;

  beforeEach(module('norris.apiproxy'));

  beforeEach(inject(function($httpBackend, $q, apiProxyService) {
    httpBackend = $httpBackend,
    apiProxy = apiProxyService;
    deferred = $q.defer();
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should add a new post', function() {
    var modelName = 'widget',
        modelData = {foo: 'bar'};

    // Assert that an HTTP POST is made for the model with the data defined.
    httpBackend.expectPOST('/api/' + modelName, modelData).respond(201, '');
    apiProxy.add(modelName, modelData);

    modelName = 'gadget';
    modelData = {baz: 'qux'};

    // Assert that an HTTP POST is made when the data and model is changed.
    httpBackend.expectPOST('/api/' + modelName, modelData).respond(201, '');
    apiProxy.add(modelName, modelData);
    httpBackend.flush();
  });

  it('should attempt to add a post with bad data and return a promise',
      function() {
    var modelName = undefined,
        modelData = null;

    // Assert that an HTTP POST with bad data returns a promise.
    httpBackend.expectPOST('/api/' + modelName, modelData).respond(400, '');
    var promise = apiProxy.add(modelName, modelData);
    expect(goog.object.containsKey(promise, 'error'));
    expect(goog.object.containsKey(promise, 'success'));

    httpBackend.flush();
  });

  it('should get all posts', function() {
    // TODO(dlochrie): Please implement.
  });
});
