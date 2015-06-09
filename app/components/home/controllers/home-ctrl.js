/**
 * Created by danielxiao on 15/1/28.
 */

(function() {

    angular.module('bvo-home.controller').controller('HomeCtrl', ['$scope',

        function HomeCtrl($scope) {

            /*========== Widget Events ==================================================*/

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