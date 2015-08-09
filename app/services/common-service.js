/**
 * Created by danielxiao on 15/1/27.
 */

/**
 * User: Daniel
 * Date: 13-5-2
 * Time: 下午10:24
 */

(function() {

  var serviceModule = angular.module('common.service', []);

  serviceModule.constant('commonServiceConst', {
    httpDefaults: {}
  });

  /**
   * 拦截http response，统一进行错误处理
   */
  serviceModule.factory('httpInterceptor', ['$q', 'errorService', 'loadingService',
    function httpInterceptor($q, errorService, loadingService) {
      return {
        'request' : function(config) {
          loadingService.requestCount++;
          return config;
        },
        'response': function(response) {
          loadingService.requestCount--;
          response.data = response.data.result || response.data;
          return response;
        },

        'responseError': function(rejection) {
          loadingService.requestCount--;
          errorService.setError(rejection.data.message);
          return $q.reject(rejection);
        }
      };
    }
  ]);

  /**
   * 用于全局界面处理错误信息的服务
   */
  serviceModule.factory('errorService', [function errorService() {
    var serviceInstance = {
      errorMessage: null,
      setError    : function(msg) {
        this.errorMessage = msg;
      },
      clear       : function() {
        this.errorMessage = null;
      }
    };
    return serviceInstance;
  }]);

  /**
   * 用于处理全局loading提示显示
   */
  serviceModule.factory('loadingService', [function loadingService() {
    var serviceInstance = {
      requestCount: 0,
      isLoading   : function() {
        return this.requestCount > 0;
      }
    };
    return serviceInstance;
  }]);


  /**
   * 工具类服务
   */
  serviceModule.factory('utilService', ['$http', 'commonServiceConst', function utilService($http, commonServiceConst) {
    var serviceInstance = {
      /**
       * 安全执行方法，会判断是否在生命周期内
       * @param $scope
       * @param fn
       */
      safeApply: function($scope, fn) {
        var phase = $scope.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
          if (fn && (typeof(fn) === 'function')) {
            fn();
          }
        } else {
          $scope.$apply(fn);
        }
      },

      /**
       * 对service层的访问远程url的重复代码再封装。
       */
      httpPost: function (url, param, options) {
        return $http.post(url, param || {}, _.extend(commonServiceConst.httpDefaults, options));
      },

      /**
       * 对service层的访问远程url的重复代码再封装。
       */
      httpGet: function (url, param, options) {
        return $http.get(url, _.extend({params: param}, commonServiceConst.httpDefaults, options));
      }
    };
    return serviceInstance;
  }]);

  serviceModule.factory('dialogService', ['$modal', '$rootScope', function dialogService($modal, $rootScope) {
    var serviceInstance = {

      alert: function(message) {
        return showDialog(message, 'alert');
      },

      confirm: function(message) {
        return showDialog(message, 'confirm');
      }
    };

    function showDialog(message, type) {
      var modalInstance = $modal.open({
        templateUrl: 'service/dialog-reminder.html',
        controller : ['$scope', '$modalInstance', 'title', 'message', 'type', function($scope, $modalInstance, title, message, type) {
          $scope.title = title;
          $scope.message = message;
          $scope.isAlert = type == 'alert';

          $scope.ok = function() {
            $modalInstance.close();
          };
          $scope.cancel = function() {
            $modalInstance.dismiss();
          }
        }],
        size       : 'sm',
        backdrop   : 'static',
        keyboard   : false,
        resolve    : {
          type   : function() {
            return type;
          },
          title  : function() {
            return type == 'alert' ? 'Alert' : 'Confirm';
          },
          message: function() {
            return message;
          }
        }
      });

      return modalInstance.result;
    }

    return serviceInstance;
  }]);

  serviceModule.run(["$templateCache", function($templateCache) {
    $templateCache.put('service/dialog-reminder.html',
      '<div class="modal-header">' +
      '    <h3 class="modal-title">{{title}}</h3>' +
      '</div>' +
      '<div class="modal-body">{{message}}</div>' +
      '<div class="modal-footer text-center">' +
      '    <button class="btn btn-primary" ng-click="ok()">OK</button>' +
      '    <button ng-hide="isAlert" class="btn btn-warning" ng-click="cancel()">Cancel</button>' +
      '</div>'
    );
  }]);

})();