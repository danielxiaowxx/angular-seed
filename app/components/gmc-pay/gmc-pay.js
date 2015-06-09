/**
 * Created by danielxiao on 15/1/27.
 *
 * 需要$root.accountInfo.email, $root.accountInfo.displayName 信息
 */

(function() {

    // 声明模块
    angular.module('gmc-pay.controller', ['buyer.service']);


    var module = angular.module('gmc-pay', ['gmc-pay.controller', 'validation.match', 'ipCookie', 'ngMask', 'gm.formValid']);

    module.constant('gmcPayConstants', {
        transactionTypes: {
            pay: 3,
            recharge: 1,
            withdraw: 2,
            refund: 4
        },

        // 处理状态
        processingStatus: {
            successful: 4,
            processing: 2,
            failed: -1
        },

        // cookie 设置
        cookieOption: {
            path:'/',
            domain:'.globalmarket.com'
        }
    });

    /**
     * config
     */
    module.config(['$routeProvider',
        function config($routeProvider) {

            $routeProvider
                .when('/gmc-pay/login', {
                    templateUrl: 'gmc-pay/partials/gmcpay-login.tpl.html',
                    controller: 'GMCPayLoginCtrl'
                })
                .when('/gmc-pay/introduce', {
                    templateUrl: 'gmc-pay/partials/gmcpay-introduce.tpl.html',
                    controller: 'GMCpayIntroduceCtrl'
                })
                .when('/gmc-pay/active-gmcpay', {
                    redirectTo: '/gmc-pay/active-gmcpay/step1'
                })
                .when('/gmc-pay/active-gmcpay/step1', {
                    templateUrl: 'gmc-pay/partials/active-gmcpay-step1.tpl.html',
                    controller: 'ActiveGmcpayStep1Ctrl'
                })
                .when('/gmc-pay/active-gmcpay/step2', {
                    templateUrl: 'gmc-pay/partials/active-gmcpay-step2.tpl.html',
                    controller: 'ActiveGmcpayStep2Ctrl'
                })
                .when('/gmc-pay/active-gmcpay/step3', {
                    templateUrl: 'gmc-pay/partials/active-gmcpay-step3.tpl.html',
                    controller: 'ActiveGmcpayStep3Ctrl'
                })
                .when('/gmc-pay/my-account', {
                    templateUrl: 'gmc-pay/partials/my-account.tpl.html',
                    controller: 'MyAccountCtrl'
                })
                .when('/gmc-pay/transaction-record', {
                    templateUrl: 'gmc-pay/partials/transaction-record.tpl.html',
                    controller: 'TransactionRecordCtrl'
                })
                .when('/gmc-pay/recharge', {
                    templateUrl: 'gmc-pay/partials/recharge.tpl.html',
                    controller: 'RechargeCtrl'
                })
                .when('/gmc-pay/recharge-completed', {
                    templateUrl: 'gmc-pay/partials/recharge-completed.tpl.html',
                    controller: 'RechargeCompletedCtrl'
                })
                .when('/gmc-pay/recharge/recharge-detail', {
                    templateUrl: 'gmc-pay/partials/recharge-detail.tpl.html',
                    controller: 'RechargeDetailCtrl'
                })
                .when('/gmc-pay/withdraw', {
                    redirectTo: '/gmc-pay/withdraw/step1'
                })
                .when('/gmc-pay/withdraw/step1', {
                    templateUrl: 'gmc-pay/partials/withdraw-step1.tpl.html',
                    controller: 'WithdrawCtrl'
                })
                .when('/gmc-pay/withdraw/step2', {
                    templateUrl: 'gmc-pay/partials/withdraw-step2.tpl.html',
                    controller: 'WithdrawVerifyPaymentCtrl'
                })
                .when('/gmc-pay/withdraw/step3', {
                    templateUrl: 'gmc-pay/partials/withdraw-step3.tpl.html',
                    controller: 'WithdrawCompletedCtrl'
                })
                .when('/gmc-pay/withdraw/withdraw-detail', {
                    templateUrl: 'gmc-pay/partials/withdraw-detail.tpl.html',
                    controller: 'WithdrawDetailCtrl'
                })
                .when('/gmc-pay/security-center', {
                    templateUrl: 'gmc-pay/partials/security-center.tpl.html',
                    controller: 'SecurityCenterCtrl'
                })
                .when('/gmc-pay/forget-password/', {
                    redirectTo: '/gmc-pay/forget-password/step1'
                })
                .when('/gmc-pay/forget-password/step1', {
                    templateUrl: 'gmc-pay/partials/reset-password-step1.tpl.html',
                    controller: 'ForgetPasswordStep1Ctrl'
                })
                .when('/gmc-pay/forget-password/step2', {
                    templateUrl: 'gmc-pay/partials/reset-password-step2.tpl.html',
                    controller: 'ForgetPasswordStep2Ctrl'
                })
                .when('/gmc-pay/forget-password/step3', {
                    templateUrl: 'gmc-pay/partials/reset-password-step3.tpl.html',
                    controller: 'ForgetPasswordStep3Ctrl'
                })
                .when('/gmc-pay', {redirectTo: '/gmc-pay/my-account'});
        }
    ]);


    module.run(['$rootScope', '$location', 'md5',
        function run($rootScope, $location, md5) {
            $rootScope.$on('$routeChangeStart', function() {
                var viewPath = arguments[1].$$route ? arguments[1].$$route.originalPath : null;
                if (viewPath && viewPath.indexOf('/gmc-pay') == 0) {
                    if (window.userInfo) {
                        if (viewPath.indexOf('/gmc-pay/active-gmcpay') >= 0) { // 激活URL
                            if (window.userInfo[md5.createHash('isActive')] != md5.createHash(userInfo.email)) { // GMCpay已激活
                                $location.url('/gmc-pay/my-account'); // 已激活跳到我的账号
                            }
                        } else { // 非激活URL
                            if (window.userInfo[md5.createHash('isActive')] == md5.createHash(userInfo.email)) { // GMCpay未激活
                                $location.url('/gmc-pay/introduce'); // 未激活跳到介绍页面
                            }
                        }
                    }
                }
            });
    }]);

})();
