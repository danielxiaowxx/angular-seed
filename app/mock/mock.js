/**
 * Created by danielxiao on 15/8/9.
 */

(function() {

  var mockModule = angular.module('app.mock', ['demo.service']);

  mockModule.config(['$provide', function config($provide) {
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
  }]);

  mockModule.run(['$httpBackend', 'demoServiceConst', function run($httpBackend, demoServiceConst) {

    // 版本一：简单地返回固定不变的结果
    //$httpBackend.whenPOST(demoServiceConst.backendContext +  '/demo/queryAccounts.gm').respond(Mock.demo.queryAccounts);
    // 版本二：根据查询条件返回不同的结果
    $httpBackend.whenPOST(demoServiceConst.backendContext +  '/demo/queryAccounts.gm').respond(function(method, url, data) {
      data = JSON.parse(data);
      var items = _.filter(Mock.demo.queryAccounts.items, function(item) {
        return !data.keyword || item.name.toLowerCase().indexOf(data.keyword.toLowerCase()) >= 0;
      });
      var result = {
        items: items,
        total: items.length
      };
      return [200, result, {}];
    });

    // ... 在此处根据需要添加自己的拦截规则去使用mock数据

    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenGET().passThrough();
  }]);

})();

/**
 * Mock 数据
 */
var Mock = {

  demo: {
    queryAccounts: {
      items: [
        {
          id: 1,
          name: 'daniel',
          sex: 'man',
          phone: '88888888',
          email: 'daniel@gm.com'
        },
        {
          id: 2,
          name: 'sarah',
          sex: 'women',
          phone: '66666666',
          email: 'sarah@gm.com'
        }
      ],
      total: 2
    }
  }

  // ... 将mock json数据定义在此
};
