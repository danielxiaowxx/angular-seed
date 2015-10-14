/**
 * Created by danielxiao on 15/8/9.
 */

(function() {

  var serviceModule = angular.module('demo.service');

  serviceModule.constant('demoServiceConst', {
    backendContext: '/demoRestService'
  });

  serviceModule.factory('demoRestService', ['utilService', 'demoServiceConst',
      function demoRestService(utilService, demoServiceConst) {

        return {
          queryAccounts: function(keyword, pageNum, pageSize) {
            return utilService.httpPost(demoServiceConst.backendContext + '/demo/queryAccounts.gm', {
              keyword: keyword,
              pageNum: pageNum,
              pageSize: pageSize
            });
          }
        };

      }]
  );

})();