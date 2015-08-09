/**
 * Created by danielxiao on 15/1/28.
 */

(function() {

  angular.module('demo.controller').controller('DemoListCtrl', ['$scope', 'dialogService', 'demoRestService',

    function DemoListCtrl($scope, dialogService, demoRestService) {

      /*========== Scope Models ==================================================*/

      /*========== Scope Functions ==================================================*/

      /**
       * 显示详细信息
       */
      $scope.showDetail = function() {
        dialogService.alert('TODO');
      };

      /*========== Listeners ==================================================*/

      $scope.$on('$routeChangeSuccess', function() {
        _init();
      });

      /*========== Watches ==================================================*/

      /*========== Private Functions ==================================================*/

      /**
       * 查询列表开发流程
       * @private
       */
      function _searchListDevFlow() {
        _.extend($scope, {

          // 1. 定义查询条件
          searchParams: {
            searchKeyword: ''
          },

          // 2. 定义分页配置
          pagerOptions: {
            totalItems: 0,
            pageNum: 1,
            pageSize: 10
          },

          // 3. 定义显示列表数据
          listData: [],

          // 4. 查询方法
          search: function(isResetPageNum) {
            var self = this;

            if (isResetPageNum) self.pagerOptions.pageNum = 1;

            demoRestService.queryAccounts(self.searchParams.searchKeyword, self.pagerOptions.pageNum, self.pagerOptions.pageSize).success(function(data) {
              self.listData = data.items;
              self.pagerOptions.totalItems = data.total;
            });
          },

          // 5. 选择特性（全选/取消选选）
          selectFeature: {
            isSelectedAll: false,
            /**
             * 全选/取消全选
             */
            selectAll: function() {
              var self = this;
              _.each($scope.listData, function(item) {
                item.checked = self.isSelectedAll;
              });
            },
            /**
             * 选择/取消选择某一项
             */
            selectItem: function(checked) {
              var self = this;
              if (checked) {
                // 判断当前所有项是否已选中，如果是，则全选
                var foundItem = _.find($scope.listData, function(item) { return !item.checked; });
                if (!foundItem) {
                  self.isSelectedAll = true; // 全选
                }
              } else {
                self.isSelectedAll = false; // 取消全选
              }
            }
          }
        });
      }

      function _init() {
        _searchListDevFlow();

        $scope.search();
      }

    }
  ]);

})();