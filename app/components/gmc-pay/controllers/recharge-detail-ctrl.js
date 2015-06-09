/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('RechargeDetailCtrl', ['$scope', '$routeParams', 'gmcPayConstants', 'buyerRestService',

        function RechargeDetailCtrl($scope, $routeParams, gmcPayConstants, buyerRestService) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.processingStatus = gmcPayConstants.processingStatus;

            $scope.rechargeInfo = undefined;

            $scope.requestIdValid = false;

            $scope.requestId;

            /*========== Scope Functions ==================================================*/

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _getRechargeRequestDetail(requestId) {
                buyerRestService.getRechargeRequestDetail(requestId)
                    .success(function (data) {
                        $scope.requestIdValid = true;
                        $scope.rechargeInfo = data;
                    });
            }

            function _init() {
                $scope.requestId = $routeParams.requestId;
                if ($scope.requestId) {
                    _getRechargeRequestDetail($scope.requestId);
                }
            }

        }
    ]);

})();
