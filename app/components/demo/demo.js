
/**
 * Created by danielxiao on 15/1/27.
 */

(function() {

  // 声明模块控制器
  angular.module('demo.service', ['common.service']);
  angular.module('demo.controller', ['demo.service']);

  // 声明模块
  var module = angular.module('demo', ['demo.controller', 'ui.bootstrap', 'plupload.directive']);

  /**
   * constants
   */
  module.constant('demoConstants', {});

  /**
   * config
   */
  module.config(['$routeProvider',
    function config($routeProvider) {

      $routeProvider
        .when('/demo/demo-list', {
          templateUrl: 'demo/partials/demo-list.tpl.html',
          controller : 'DemoListCtrl'
        })
        .when('/demo', {redirectTo: '/demo/demo-list'});
    }
  ]);

})();

