/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('MyAccountCtrl', ['$scope', 'gmcPayConstants', 'buyerRestService',

        function MyAccountCtrl($scope, gmcPayConstants, buyerRestService) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.records = [];

            $scope.money = undefined;

            $scope.transactionTypes = gmcPayConstants.transactionTypes;

            /*========== Scope Functions ==================================================*/

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _searchRecordList() {
                buyerRestService.searchTransactionRecords({}, 6, 1)
                    .success(function(data) {
                        $scope.records = data.items;
                    })
            }

            function _statAccountMoney() {
                buyerRestService.statAccountMoney()
                    .success(function(data) {
                        $scope.money = data;
                    })
            }

            function _init() {
                _searchRecordList();
                _statAccountMoney();
            }

        }
    ]);

})();
