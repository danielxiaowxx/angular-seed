/**
 * Created by danielxiao on 15/1/27.
 */

/**
 * 对应页面index.html
 */

(function() {
    var controller = angular.module('app.controller', ['app.service']);

    controller.controller('AppCtrl', ['$scope', '$rootScope', '$location', 'APPConst', 'APPGlobalVal', 'errorService', 'loadingService', 'dialogService', 'ipCookie',
        function AppCtrl($scope, $rootScope, $location, APPConst, APPGlobalVal, errorService, loadingService, dialogService, ipCookie) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $rootScope.i18nData = $scope.i18nData = window.i18n.app;

            $scope.isLoading = false;

            $scope.errorMessage = '';

            $scope.isFullMain = false;

            // 导航菜单
            $scope.navMenus = [
                {
                    menuName: $scope.i18nData.order,
                    menuSubTitle: $scope.i18nData.smallOrder,
                    menuSubItems: [
                        {
                            name: $scope.i18nData.myOrders,
                            url: '/order/my-orders'
                        },
                        {
                            name: $scope.i18nData.disputeAndRefund,
                            url: '/order/dispute-refund'
                        },
                        //{
                        //    name: $scope.i18nData.myCoupons,
                        //    url: '/order/my-coupons',
                        //    tipNum: 4
                        //},
                        {
                            name: $scope.i18nData.addressBook,
                            url: '/order/address-book'
                        }
                    ]
                },
                {
                    menuName: $scope.i18nData.gmcPay,
                    menuSubTitle: $scope.i18nData.gmcPay,
                    menuSubItems: [
                        {
                            name: $scope.i18nData.myAccount,
                            url: '/gmc-pay/my-account'
                        },
                        {
                            name: $scope.i18nData.transactionRecord,
                            url: '/gmc-pay/transaction-record'
                        },
                        {
                            name: $scope.i18nData.recharge,
                            url: '/gmc-pay/recharge'
                        },
                        {
                            name: $scope.i18nData.withdraw,
                            url: '/gmc-pay/withdraw'
                        },
                        {
                            name: $scope.i18nData.securityCenter,
                            url: '/gmc-pay/security-center'
                        }
                    ]
                }
            ];

            // 选中的导航菜单
            $scope.selectedNavMenu;

            /*========== Scope Functions ==================================================*/

            /**
             * 切换导航菜单
             */
            $scope.changeMenu = function(menuItem, defaultSubItem) {
                // 更新选中样式
                _.each($scope.navMenus, function(item) {
                    item.selected = false;
                });
                menuItem.selected = true;

                $scope.selectedNavMenu = menuItem;

                // 有默认选择子菜单的情况，用于初始化
                if (defaultSubItem) {
                    _.some(menuItem.menuSubItems, function(subItem) {
                        if (subItem.url === defaultSubItem.url) {
                            subItem.active = true;
                            return true;
                        }
                    });
                } else { // 没有就打开第一个
                    $scope.openFunction(menuItem.menuSubItems[0]);
                }

            };

            /**
             * 打开功能模块
             */
            $scope.openFunction = function(subMenuItem) {
                // 更新选中样式
                _.each($scope.selectedNavMenu.menuSubItems, function(subItem) {
                    subItem.active = false;
                });
                subMenuItem.active = true;

                // 导航到指定模块
                $location.path(subMenuItem.url);
            };

            $scope.askQuestion = function() {
                if (window.FT) {
                    return window.FT.startChat(window.sysEnvConfig.orderHelperAcc);
                }
            };

            // 加载语言的方法
            $scope.loadLanguage = function(language) {
                if (language) {
                    // 将设置的language保存到cookie
                    ipCookie('bvo_language', language, {
                        path:'/',
                        domain:'.globalmarket.com'
                    });

                    // 刷新
                    location.reload();
                }
            };

            /*========== Listeners ==================================================*/

            /*========== Watches ==================================================*/

            // 监控加载状态
            $scope.$watch(function() {
                return loadingService.isLoading();
            }, function(newVal) {
                if ($scope.isLoading !== newVal) {
                    $scope.isLoading = newVal;
                }
            });

            // 监控错误信息状态
            $scope.$watch(function() {
               return errorService.errorMessage;
            }, function(newVal) {
                if (!newVal) return;

                if (newVal.indexOf('user not login') >= 0) { // 买家账号登录超时，重新登录
                    dialogService.alert('Login timeout, please login again').then(function() {
                        errorService.errorMessage = '';
                        location.href = $scope.$root.envConfig.channelConfig.signInUrl;
                    });
                }
                else if (newVal.indexOf('GMCpay not login') >= 0) { // 买家账号GMCPAY登录超时
                    errorService.errorMessage = '';
                    $location.url('/gmc-pay/login');
                }
                else if (newVal.indexOf('key is invalid') >= 0) { // 验证邮件key无效
                    dialogService.alert('key is invalid!').then(function() {
                        errorService.errorMessage = '';
                    });
                }
                else if (newVal.indexOf('GMCpay not active') >= 0) { // GMCPay未激活
                    $location.url('/gmc-pay/introduce');
                    errorService.errorMessage = '';
                }
                else if (newVal.indexOf('password is incorrect') >= 0) { // 登录密码无效
                    dialogService.alert('Login password is incorrect!').then(function() {
                        errorService.errorMessage = '';
                    });
                }
                else if (newVal.indexOf('payment password is incorrect') >= 0) { // 支付密码无效
                    dialogService.alert('Payment password is incorrect!').then(function() {
                        errorService.errorMessage = '';
                    });
                }
                else {
                    $scope.errorMessage = newVal;
                }
            });

            $scope.$on('$routeChangeStart', function() {
                // 控制是否要全内容区域显示模块内容（即隐藏掉菜单）
                var viewPath = arguments[1].$$route ? arguments[1].$$route.originalPath : null;
                if (viewPath) {
                    if (APPConst.FullMainUrls.indexOf(viewPath) >= 0) {
                        $scope.isFullMain = true;
                    } else {
                        $scope.isFullMain = false;
                    }
                }

                // 还没有选中菜单的情况，如GMCPAY激活后跳到GMCPAY的情况
                if (!$scope.selectedNavMenu) {
                    var initUrl = $location.path();
                    _.some($scope.navMenus, function(menuItem) {
                        var findOne = _.find(menuItem.menuSubItems, function(subItem) {
                            return initUrl.indexOf(subItem.url) >= 0;
                        });
                        if (findOne) {
                            $scope.changeMenu(menuItem, findOne);
                            return true;
                        }
                    });
                }

            });

            /*========== Private Functions ==================================================*/

            function _init() {

                // 初始化选中的菜单项
                var initUrl = $location.path();
                var hasMatch = false;
                _.some($scope.navMenus, function(menuItem) {
                    var findOne = _.find(menuItem.menuSubItems, function(subItem) {
                        return initUrl.indexOf(subItem.url) >= 0;
                    });
                    if (findOne) {
                        $scope.changeMenu(menuItem, findOne);
                        hasMatch = true;
                        return true;
                    }
                });

                if (!hasMatch && !initUrl) {
                    $scope.changeMenu($scope.navMenus[0]);
                }

            }

            _init();

        }
    ]);

})();
