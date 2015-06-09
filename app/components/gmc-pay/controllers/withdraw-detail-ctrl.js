/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('WithdrawDetailCtrl', ['$scope', '$routeParams', 'gmcPayConstants', 'buyerRestService',

        function WithdrawDetailCtrl($scope, $routeParams, gmcPayConstants, buyerRestService) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.processingStatus = gmcPayConstants.processingStatus;

            $scope.withdrawInfo = undefined;

            $scope.requestIdValid = false;

            $scope.requestId;

            /*========== Scope Functions ==================================================*/

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _getWithdrawRequestDetail(requestId) {
                buyerRestService.getWithdrawRequestDetail(requestId)
                    .success(function (data) {
                        $scope.requestIdValid = true;
                        $scope.withdrawInfo = data;
                    });
            }

            function _init() {
                $scope.requestId = $routeParams.requestId;
                if ($scope.requestId) {
                    _getWithdrawRequestDetail($scope.requestId);
                }
            }

        }
    ]);

})();
