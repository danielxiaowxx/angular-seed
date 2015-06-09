/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('RechargeCtrl', ['$scope', '$location', 'dialogService', 'buyerRestService',

        function RechargeCtrl($scope, $location, dialogService, buyerRestService) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.rechargeAmount;

            /*========== Scope Functions ==================================================*/

            $scope.submit = function () {
                dialogService.confirm('Are you sure to submit a recharge request?').then(function() {
                    buyerRestService.submitRechargeRequest($scope.rechargeAmount)
                        .success(function (data) {
                            $location.url('/gmc-pay/recharge-completed?requestId=' + data.requestId + '#transferOnline');
                        });
                });
            }

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
