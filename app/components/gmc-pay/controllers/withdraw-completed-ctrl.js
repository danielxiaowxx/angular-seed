/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('WithdrawCompletedCtrl', ['$scope', '$routeParams', 'buyerRestService',

        function WithdrawCompletedCtrl($scope, $routeParams, buyerRestService) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

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

            function _getBriefWithdrawRequestInfo(requestId) {
                buyerRestService.getBriefWithdrawRequestInfo(requestId)
                    .success(function (data) {
                        $scope.requestIdValid = true;
                        $scope.withdrawInfo = data;
                    });
            }

            function _init() {
                $scope.requestId = $routeParams.requestId;
                if ($scope.requestId) {
                    _getBriefWithdrawRequestInfo($scope.requestId);
                }
            }

        }
    ]);

})();
