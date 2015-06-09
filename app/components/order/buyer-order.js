/**
 * Created by danielxiao on 15/1/27.
 */

/**
 * Created by danielxiao on 15/1/28.
 *
 * 需要 user/sysEnvConfig.js 这个配置信息中的sysEnvConfig.fileHost信息
 * 需要 user/i18n.js 国际化信息中的window.i18n.buyerOrder对象
 *
 */

(function() {

    // 声明模块
    angular.module('buyer-order.controller', ['buyer.service', 'common.service']);

    var module = angular.module('buyer-order', ['buyer-order.controller', 'ui.bootstrap', 'timer', 'gm.talknow', 'plupload.directive', 'ui.select']);

    /**
     * constants
     */
    module.constant('buyerOrderConstants', {
        config: {
            fileUploadUrl: '/gmdms2/upload', // 产品上传路径
            imgServerUrl: sysEnvConfig.fileHost + '/piclib/' // 图片路径
        },
        orderStatus: {
            pending_payment: 20,
            processing: 40,
            shipping: 50,
            received: 60,
            refund_dispute: 70,
            cancel: 120
        },
        disputeStatus: {
            awaiting_response: 0,
            in_mediation: 13,
            approved: 3,
            canceled: -2,
            rejected: -1
            //refund_success:
        }
        ,
        i18nData: window.i18n.buyerOrder
    });

    /**
     * config
     */
    module.config(['$routeProvider',
        function config($routeProvider) {

            $routeProvider
                .when('/order/my-orders', {
                    templateUrl: 'buyer-order/partials/my-orders.tpl.html',
                    controller: 'MyOrdersCtrl'
                })
                .when('/order/my-orders/order-detail', {
                    templateUrl: 'buyer-order/partials/order-detail.tpl.html',
                    controller: 'OrderDetailCtrl'
                })
                .when('/order/dispute-refund', {
                    templateUrl: 'buyer-order/partials/dispute-refund.tpl.html',
                    controller: 'DisputeRefundCtrl'
                })
                .when('/order/dispute-refund/dispute-refund-detail', {
                    templateUrl: 'buyer-order/partials/dispute-refund-detail.tpl.html',
                    controller: 'DisputeRefundDetailCtrl'
                })
                .when('/order/my-orders/order-detail/feedback', {
                    templateUrl: 'buyer-order/partials/feedback.tpl.html',
                    controller: 'FeedbackCtrl'
                })
                .when('/order/address-book', {
                    templateUrl: 'buyer-order/partials/address-book.tpl.html',
                    controller: 'AddressBookCtrl'
                })
                .when('/order/my-coupons', {
                    templateUrl: 'buyer-order/partials/my-coupons.tpl.html',
                    controller: 'MyCouponsCtrl'
                })
                .when('/order', {redirectTo: '/order/my-orders'});
        }
    ]);

})();
