/**
 * Created by danielxiao on 15/1/27.
 */

(function() {

  var app = angular.module('app', [
    'ngRoute', 'LocalStorageModule', 'pasvaz.bindonce', 'ipCookie',
    'app.controller',
    'common.service',
    'app.mock', // TODO Daniel: 开发环境才用
    'demo'
  ]);

  /**
   * 定义全局常量
   */
  app.constant('APPConst', {
    config: {}
  });

  /**
   * 全局变量
   */
  app.value('APPGlobalVal', {});

  /**
   * config
   */
  app.config(['$httpProvider', '$locationProvider', '$routeProvider', 'APPConst',
    function config($httpProvider, $locationProvider, $routeProvider, APPConst) {

      $httpProvider.interceptors.push('httpInterceptor');

      $locationProvider.html5Mode(false);
      $locationProvider.hashPrefix('!');

      $routeProvider.otherwise({redirectTo: '/demo'});
    }
  ]);

  /**
   * run
   */
  app.run(['$http', '$rootScope',
    function($http, $rootScope) {
      $http.defaults.headers.post['Content-Type'] = 'application/json';

      // 登陆后账号信息存放在这里
      $rootScope.accountInfo = {};

      // 环境配置信息
      $rootScope.envConfig = {};

    }
  ]);

})();
