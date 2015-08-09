/**
 * Created by danielxiao on 15/1/27.
 */

/**
 * 对应页面index.html
 */

(function() {
  var controller = angular.module('app.controller', ['common.service']);

  controller.controller('AppCtrl', ['$scope', '$rootScope', '$location', 'APPConst', 'APPGlobalVal', 'errorService', 'loadingService', 'dialogService', 'ipCookie',
    function AppCtrl($scope, $rootScope, $location, APPConst, APPGlobalVal, errorService, loadingService, dialogService, ipCookie) {

      /*========== Scope Models ==================================================*/

      $scope.isLoading = false;

      $scope.errorMessage = '';

      /*========== Scope Functions ==================================================*/

      /*========== Listeners ==================================================*/

      /*========== Watches ==================================================*/

      // 监控加载状态
      $scope.$watch(function() {
        return loadingService.isLoading();
      }, function(newVal) {
        if ($scope.isLoading !== newVal) {
          $scope.isLoading = newVal;
        }
      });

      // 监控错误信息状态
      $scope.$watch(function() {
        return errorService.errorMessage;
      }, function(newVal) {
        if (!newVal) return;

        $scope.errorMessage = newVal;
      });

      $scope.$on('$routeChangeStart', function() {
      });

      /*========== Private Functions ==================================================*/

      function _init() {
      }

      _init();

    }
  ]);

})();
