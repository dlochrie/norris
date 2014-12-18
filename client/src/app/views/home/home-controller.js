goog.provide('norris.home.HomeController');



/**
 * Home Controller.
 * @param {!angular.$log} $log
 * @param {!angular.Scope} $scope The current controller $scope.
 * @param {!ui.bootstrap.$modal} $modal
 * @constructor
 * @ngInject
 * @export
 */
norris.home.HomeController = function($log, $scope, $modal) {
  /**
   * @param {!angular.Scope} $scope
   * @param {ui.bootstrap.modalInstance} $modalInstance
   * @constructor
   * @ngInject
   */
  this.modalController = function($scope, $modalInstance) {
    $scope['test'] = 'foo';

    $scope['ok'] = function() {
      $modalInstance.close('bar');
    };

    $scope['cancel'] = function() {
      $modalInstance.dismiss('cancel');
    };
  };

  /**
   * @type {!Object}
   */
  var modalOptions = {
    'scope': $scope,
    'size': 'md',
    'template': '<div class="modal-header">' +
        '<h3 class="modal-title">I\'m a modal!</h3>' +
        '</div><div class="modal-body">{{test}}</div>' +
        '<div class="modal-footer">' +
        '<button class="btn btn-primary" ng-click="ok()">OK</button>' +
        '<button class="btn btn-warning" ng-click="cancel()">Cancel</button>' +
        '</div>',
    'controller': this.modalController
  };

  /**
   * @type {!ui.bootstrap.modalInstance}
   */
  var modalInstance = $modal.open(modalOptions);
  modalInstance.opened.then(function() {
    $log.info('modal opened');
  });

  modalInstance.result.then(function(result) {
    $scope['test'] = result;
  }, function() {
    $log.info('Modal dismissed at: ' + new Date());
  });
};
