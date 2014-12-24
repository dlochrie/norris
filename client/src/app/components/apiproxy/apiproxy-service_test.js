goog.require('goog.object');

describe('apiProxyService', function() {
  var apiProxy, httpBackend, modelName, modelData;

  beforeEach(module('norris.apiproxy'));

  beforeEach(inject(function($httpBackend, $q, apiProxyService) {
    httpBackend = $httpBackend,
    apiProxy = apiProxyService;
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should add a new post', function() {
    modelName = 'widget';
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
       modelName = undefined;
       modelData = null;

       // Assert that an HTTP POST with bad data returns a promise.
       httpBackend.expectPOST('/api/' + modelName, modelData).respond(400, '');
       var promise = apiProxy.add(modelName, modelData);
       // The promise should have both "error" and "success" methods.
       expect(goog.object.containsKey(promise, 'error'));
       expect(goog.object.containsKey(promise, 'success'));
       httpBackend.flush();
     });

  it('should get all posts', function() {
    // Assert that an HTTP POST is made for the model with the data defined.
    modelName = 'widget';
    httpBackend.expectGET('/api/' + modelName).respond(200, '');
    apiProxy.all(modelName);

    // Assert that an HTTP POST is made when the data and model is changed.
    modelName = 'gadget';
    httpBackend.expectGET('/api/' + modelName).respond(200, '');
    apiProxy.all(modelName);
    httpBackend.flush();
  });

  it('should return a promise when getting the posts fails', function() {
    var testCases = [null, undefined, 0, 1, 'string', [], {}],
        promise;

    // For each invalid URL path, make sure that a promise is still returned.
    goog.array.forEach(testCases, function(test) {
      httpBackend.expectGET('/api/' + test).respond(400, 'Bad Request');
      var promise = apiProxy.all(test);
      expect(goog.object.containsKey(promise, 'error'));
      expect(goog.object.containsKey(promise, 'success'));
      httpBackend.flush();
    });
  });
});
