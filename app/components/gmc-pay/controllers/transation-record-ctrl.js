/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('TransactionRecordCtrl', ['$scope', 'gmcPayConstants', 'buyerRestService',

        function TransactionRecordCtrl($scope, gmcPayConstants, buyerRestService) {

            var isInit = true; // 用于防止初始时多次请求

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.records = [];

            $scope.moneyStat = undefined;

            $scope.transactionTypes = gmcPayConstants.transactionTypes;

            $scope.searchCondition = {
                type: -1,
                fundFlow: -1
            }

            $scope.pagerOptions = {
                totalItems: 0,
                pageNum: 1,
                pageSize: 10
            }

            /*========== Scope Functions ==================================================*/

            $scope.searchRecordList = function() {
                buyerRestService.searchTransactionRecords($scope.searchCondition, $scope.pagerOptions.pageSize, $scope.pagerOptions.pageNum)
                    .success(function(data) {
                        isInit = false;
                        $scope.pagerOptions.totalItems = data.total;
                        $scope.records = data.items;
                    })
            }

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            $scope.$watch('searchCondition.type', function(newVal) {
                if (!newVal || isInit) return;
                $scope.pagerOptions.pageNum = 1;
                $scope.searchRecordList();
            });

            $scope.$watch('searchCondition.fundFlow', function(newVal) {
                if (!newVal || isInit) return;
                $scope.pagerOptions.pageNum = 1;
                $scope.searchRecordList();
            });

            /*========== Private Functions ==================================================*/

            function _statTransactionMoney() {
                buyerRestService.statTransactionMoney()
                    .success(function(data) {
                        $scope.moneyStat = data;
                    })
            }

            function _init() {
                $scope.searchRecordList();

                _statTransactionMoney();
            }

        }
    ]);

})();
