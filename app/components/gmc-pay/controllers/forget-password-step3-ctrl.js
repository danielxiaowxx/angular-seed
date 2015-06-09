/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('ForgetPasswordStep3Ctrl', ['$scope', 'buyerRestService',

        function ForgetPasswordStep3Ctrl($scope, buyerRestService) {

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
