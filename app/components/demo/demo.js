/**
 * Created by danielxiao on 15/6/9.
 */

/**
 * Created by danielxiao on 15/1/27.
 */

(function() {

    // 声明模块控制器
    angular.module('demo.controller', []);

    // 声明模块
    var module = angular.module('demo', ['demo.controller', 'ui.bootstrap', 'plupload.directive']);

    /**
     * constants
     */
    module.constant('demoConstants', {
    });

    /**
     * config
     */
    module.config(['$routeProvider',
        function config($routeProvider) {

            $routeProvider
                .when('/demo/my-demo', {
                    templateUrl: 'demo/partials/my-demo.tpl.html',
                    controller: 'MyDemoCtrl'
                })
                .when('/demo', {redirectTo: '/demo/my-demo'});
        }
    ]);

})();

