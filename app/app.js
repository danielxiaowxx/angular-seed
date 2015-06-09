/**
 * Created by danielxiao on 15/1/27.
 */

(function () {

    var app = angular.module('app', [
        'ngRoute', 'LocalStorageModule', 'pasvaz.bindonce', 'ipCookie',
        'app.controller', 'app.service',
        'bvo-home', 'buyer-order', 'gmc-pay'
    ]);

    /**
     * 定义全局常量
     */
    app.constant('APPConst', {
        Config: {
            backendContext: 'bvo-backend-end' // 后端服务context
        },
        LocalStorage: {
            prefix: 'bvo',
            key: {
                selectedLanguage: 'selectedLanguage'
            }
        },
        FullMainUrls: [ // 需要全内容区域展示的URL
            '/gmc-pay/login',
            '/gmc-pay/introduce',
            '/gmc-pay/active-gmcpay/step1',
            '/gmc-pay/active-gmcpay/step2',
            '/gmc-pay/active-gmcpay/step3',
            '/gmc-pay/forget-password/step1',
            '/gmc-pay/forget-password/step2',
            '/gmc-pay/forget-password/step3',
            '/gmc-pay/withdraw/step3'
        ]
    });

    /**
     * 全局变量
     */
    app.value('APPGlobalVal', {
    });

    /**
     * config
     */
    app.config(['$httpProvider', '$locationProvider', '$routeProvider', 'APPConst', 'localStorageServiceProvider',
        function config($httpProvider, $locationProvider, $routeProvider, APPConst, localStorageServiceProvider) {

            $httpProvider.interceptors.push('httpInterceptor');

            localStorageServiceProvider.setPrefix(APPConst.LocalStorage.prefix);

            $locationProvider.html5Mode(false);
            $locationProvider.hashPrefix('!');

            $routeProvider.otherwise({redirectTo: '/order'});
        }
    ]);

    /**
     * run
     */
    app.run(['$http', '$rootScope',
        function ($http, $rootScope) {
            $http.defaults.headers.post['Content-Type'] = 'application/json';

            window.userInfo = window.userInfo || {}; // 防止错误

            // 登陆后账号信息存放在这里
            $rootScope.accountInfo = {
                displayName: userInfo.accountName,
                email: userInfo.email
            };

            // 环境配置信息
            $rootScope.envConfig = {
                fileHost: sysEnvConfig.fileHost,
                portalHost: sysEnvConfig.portalHost,
                orderHelperAcc: window.sysEnvConfig.orderHelperAcc,
                orderHelperAccCN: window.sysEnvConfig.orderHelperAccCN,
                channelConfig: window.sysEnvConfig.channelConfig
            };

            $rootScope.displayCurrency = function(currency) {
                switch (currency) {
                    case 'USD':
                        return 'US $';
                    case 'CNY':
                        return '￥';
                    default:
                        return 'US $';
                }
            }

        }
    ]);

})();
