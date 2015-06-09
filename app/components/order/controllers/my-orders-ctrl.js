/**
 * Created by danielxiao on 15/1/28.
 */

(function() {

    angular.module('buyer-order.controller').controller('MyOrdersCtrl', ['$scope', '$route', 'buyerOrderConstants', 'dialogService', 'buyerRestService',

        function MyOrdersCtrl($scope, $route, buyerOrderConstants, dialogService, buyerRestService) {

            var searchStatus = 0; // 查询的订单状态

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.i18nData = buyerOrderConstants.i18nData;

            $scope.orderList = [];
            $scope.statusStatData = undefined;

            // 常量
            $scope.orderStatus = buyerOrderConstants.orderStatus;

            // 查询条件
            $scope.searchStatus = 0;
            $scope.searchType = 'orderNO';
            $scope.searchKeyword = '';

            // 搜索类型
            $scope.searchTypes = [
                {
                    value: 'orderNO',
                    label: $scope.i18nData.orderNO
                },
                //{
                //    value: 'manuName',
                //    label: $scope.i18nData.manufacturer
                //},
                {
                    value: 'productName',
                    label: $scope.i18nData.productName
                }
            ];

            $scope.pagerOptions = {
                totalItems: 0,
                pageNum: 1,
                pageSize: 10
            }

            /*========== Scope Functions ==================================================*/

            $scope.searchOrderList = function() {

                var searchCondiction = {
                    status: searchStatus
                };
                searchCondiction[$scope.searchType] = $scope.searchKeyword;

                buyerRestService.searchOrderList(searchCondiction, $scope.pagerOptions.pageNum, $scope.pagerOptions.pageSize)
                    .success(function(data) {
                        $scope.pagerOptions.totalItems = data.total;
                        $scope.orderList = data.items;
                    })
            }

            /**
             * 切换查询订单状态
             * @param status
             */
            $scope.switchOrderStatus = function(status) {
                searchStatus = status;

                // 清空搜索关键字
                $scope.searchKeyword = '';

                // reset pager
                $scope.pagerOptions.pageNum = 1;

                $scope.searchOrderList();
            }

            /**
             * 取消订单
             */
            $scope.cancelOrder = function(orderId) {
                dialogService.confirm($scope.i18nData.sureCancelOrder).then(function() {
                    buyerRestService.cancelOrder(orderId)
                        .success(function() {
                            $route.reload();
                        });
                });
            }

            /**
             * 确认收货
             * @param orderId
             */
            $scope.confirmDelivery = function(orderId) {
                if (window.confirm('By clicking "Confirm", you are confirming that you have received your order in good condition. Globalmarket will proceed to release payment to the manufacturer.\n\n Note:After you confirm, you will not to be able to open dispute for this order. So only confirm the delivery when you are satisfied with the condition of your order.')) {
                    buyerRestService.confirmReceive(orderId)
                        .success(function() {
                            $route.reload();
                        });
                }
            }

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _countOrdersByStatus() {
                buyerRestService.countOrdersByStatus()
                    .success(function(data) {
                        $scope.statusStatData = data;
                    });
            }

            function _init() {
                _countOrdersByStatus();
            }

        }
    ]);

})();
