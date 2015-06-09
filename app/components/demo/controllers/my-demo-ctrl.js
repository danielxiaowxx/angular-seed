/**
 * Created by danielxiao on 15/1/28.
 */

(function() {

    angular.module('demo.controller').controller('MyDemoCtrl', ['$scope',

        function MyDemoCtrl($scope) {

            /*========== Scope Models ==================================================*/

            /*========== Scope Functions ==================================================*/

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _init() {
            }

        }
    ]);

})();