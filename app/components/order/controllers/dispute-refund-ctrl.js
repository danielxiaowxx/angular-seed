/**
 * Created by danielxiao on 15/1/29.
 */

(function() {

    angular.module('buyer-order.controller').controller('DisputeRefundCtrl', ['$scope', 'buyerOrderConstants', 'buyerRestService',

        function DisputeRefundCtrl($scope, buyerOrderConstants, buyerRestService) {

            var searchStatus = null; // 查询的纠纷订单状态

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.i18nData = buyerOrderConstants.i18nData;


            $scope.orderList = [];
            $scope.statusStatData = undefined;

            // 常量
            $scope.disputeStatus = buyerOrderConstants.disputeStatus;

            // 查询条件
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
                pageSize: 5
            }

            /*========== Scope Functions ==================================================*/

            $scope.searchOrderList = function() {

                var searchCondiction = {
                    status: searchStatus
                };
                searchCondiction[$scope.searchType] = $scope.searchKeyword;

                buyerRestService.searchDisputeOrders(searchCondiction, $scope.pagerOptions.pageNum, $scope.pagerOptions.pageSize)
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

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _countOrdersByStatus() {
                buyerRestService.countDisputeOrdersByStatus()
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
