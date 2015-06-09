/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('buyer-order.controller').controller('MyCouponsCtrl', ['$scope',

        function MyCouponsCtrl($scope) {

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