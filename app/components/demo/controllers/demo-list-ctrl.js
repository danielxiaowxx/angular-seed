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