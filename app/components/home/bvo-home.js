/**
 * Created by danielxiao on 15/1/28.
 */

(function() {

    // 声明模块
    angular.module('bvo-home.service', []);
    angular.module('bvo-home.controller', ['bvo-home.service']);


    var module = angular.module('bvo-home', ['bvo-home.controller']);

    /**
     * config
     */
    module.config(['$routeProvider',
        function config($routeProvider) {

            $routeProvider
                .when('/home', {
                    templateUrl: 'bvo-home/partials/home.tpl.html',
                    controller: 'HomeCtrl'
                });
        }
    ]);

})();
