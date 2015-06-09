/**
 * Created by danielxiao on 15/1/29.
 */

(function() {

    angular.module('buyer-order.controller').controller('OrderDetailCtrl', ['$scope', '$route', '$routeParams', '$timeout', 'buyerOrderConstants', 'dialogService', 'buyerRestService',

        function OrderDetailCtrl($scope, $route, $routeParams, $timeout, buyerOrderConstants, dialogService, buyerRestService) {

            var orderId;

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.i18nData = buyerOrderConstants.i18nData;

            $scope.orderDetail = undefined;

            $scope.orderStatus = buyerOrderConstants.orderStatus;

            $scope.disputeStatus = buyerOrderConstants.disputeStatus;

            /*========== Scope Functions ==================================================*/

            /**
             * 取消订单
             */
            $scope.cancelOrder = function() {
                dialogService.confirm($scope.i18nData.sureCancelOrder).then(function() {
                    buyerRestService.cancelOrder(orderId)
                        .success(function() {
                            $route.reload();
                        });
                });
            }

            $scope.extendProcessingTime = function() {
                alert('TODO');
            }

            $scope.extendConfirmTime = function() {
                alert('TODO');
            }

            $scope.confirmDelivery = function() {
                dialogService.confirm($scope.i18nData.sureConfirmDelivery).then(function() {
                    buyerRestService.confirmReceive(orderId)
                        .success(function() {
                            $route.reload();
                        });
                });
            }

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _getOrderDetail(orderId) {
                buyerRestService.getOrderDetail(orderId)
                    .success(function(data) {
                        $scope.orderDetail = data;

                        if (data.deadline) {
                            $timeout(function() {
                                $scope.$broadcast('timer-start');
                            });
                        }
                    });
            }

            function _init() {
                orderId = $routeParams.orderId;
                _getOrderDetail(orderId);
            }
        }
    ]);

})();
