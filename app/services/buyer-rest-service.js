/**
 * Created by danielxiao on 15/2/1.
 */

(function() {

    var backendContext = '/buyerRestService'; // 后端上下文

    angular.module('buyer.service', ['angular-md5']).factory('buyerRestService', ['$http', 'md5',
            function buyerRestService($http, md5) {

                //
                // 订单
                //----------------------------------------------------------------------

                var orderMethods = {
                    /**
                     *
                     * 取得订单列表
                     * @param searchParams {orderNO:, manuName:, productName:, status:, }
                     * @param pageNum
                     * @param pageSize
                     * @returns {*}
                     */
                    searchOrderList: function(searchParams, pageNum, pageSize) {
                        return $http.get(backendContext + '/order/searchOrderList', {params: {
                            orderNO    : searchParams.orderNO,
                            manuName   : searchParams.manuName,
                            productName: searchParams.productName,
                            status     : searchParams.status,
                            pageSize   : pageSize,
                            pageNum    : pageNum
                        }});
                    },

                    /**
                     * 取得订单详情
                     * @param orderId
                     * @returns {*}
                     */
                    getOrderDetail: function(orderId) {
                        return $http.post(backendContext + '/order/getOrderDetail', {orderId: orderId});
                    },

                    /**
                     * 取消订单
                     * @param orderId
                     * @returns {*}
                     */
                    cancelOrder: function(orderId) {
                        return $http.post(backendContext + '/order/cancelOrder', {orderId: orderId});
                    },

                    /**
                     * 统计各种状态下的订单数量
                     * @returns {*}
                     */
                    countOrdersByStatus: function() {
                        return $http.get(backendContext + '/order/countOrdersByStatus');
                    },

                    /**
                     * 确认订单
                     * @param orderId
                     * @returns {*}
                     */
                    confirmReceive: function(orderId) {
                        return $http.post(backendContext + '/order/confirmReceive', {orderId:orderId});
                    },

                    /**
                     * 统计各种状态下的纠纷订单数量
                     */
                    countDisputeOrdersByStatus: function() {
                        return $http.get(backendContext + '/order/countDisputeOrdersByStatus');
                    },

                    /**
                     *
                     * 取得纠纷订单列表
                     * @param searchParams {orderNO:, manuName:, productName:, status:, }
                     * @param pageNum
                     * @param pageSize
                     * @returns {*}
                     */
                    searchDisputeOrders: function(searchParams, pageNum, pageSize) {
                        return $http.get(backendContext + '/order/searchDisputeOrders', {params: {
                            orderNO    : searchParams.orderNO,
                            manuName   : searchParams.manuName,
                            productName: searchParams.productName,
                            status     : searchParams.status,
                            pageSize   : pageSize,
                            pageNum    : pageNum
                        }});
                    },

                    /**
                     * 取得订单纠纷详细
                     * @param refundId
                     * @returns {HttpPromise}
                     */
                    getDisputeOrderDetail: function(refundId, orderId) {
                        return $http.post(backendContext + '/order/getDisputeOrderDetail', {refundId:refundId, orderId:orderId});
                    },

                    /**
                     * 提交退款申请
                     * @param orderId
                     * @param hasReceiveGoods
                     * @param refundReasonId
                     * @param isFullRefund
                     * @param refundAmount
                     * @param detail
                     * @param photos
                     * @returns {HttpPromise}
                     */
                    submitRefundRequest: function(orderId, hasReceiveGoods, refundReasonId, isFullRefund, refundAmount, detail, photos) {
                        return $http.post(backendContext + '/order/submitRefundRequest', {
                            orderId: orderId,
                            hasReceiveGoods: hasReceiveGoods,
                            refundReasonId: refundReasonId,
                            isFullRefund: isFullRefund,
                            refundAmount: refundAmount,
                            detail: detail,
                            photos: photos
                        });
                    },

                    /**
                     * 取消退款申请
                     * @param refundId
                     * @param orderId
                     * @returns {HttpPromise}
                     */
                    cancelRefundRequest: function(refundId, orderId) {
                        return $http.post(backendContext + '/order/cancelRefundRequest', {refundId:refundId, orderId:orderId});
                    },

                    /**
                     * 申请仲裁
                     * @param refundId
                     * @param orderId
                     * @returns {HttpPromise}
                     */
                    applyArbitration: function(refundId, orderId) {
                        return $http.post(backendContext + '/order/applyArbitration', {refundId:refundId, orderId:orderId});
                    },

                    /**
                     * 取得评价信息
                     * @param orderId
                     * @returns {HttpPromise}
                     */
                    getFeedbackDetail: function(orderId) {
                        return $http.post(backendContext + '/order/getFeedbackDetail', {orderId: orderId});
                    },

                    /**
                     * 提交产品评价
                     * @param orderId
                     * @param productsFeedback
                     * @returns {HttpPromise}
                     */
                    submitProductsFeedback: function(orderId, productsFeedback) {
                        return $http.post(backendContext + '/order/submitProductsFeedback', {orderId: orderId, productsFeedback: productsFeedback});
                    },

                    /**
                     * 提交厂家和物流的评价
                     * @param orderId
                     * @param serviceScore
                     * @param responseSpeedScore
                     * @param processingSpeedScore
                     * @param logisticScore
                     * @returns {HttpPromise}
                     */
                    submitManuAndLogisticFeedback: function(orderId, serviceScore, responseSpeedScore, processingSpeedScore, logisticScore) {
                        return $http.post(backendContext + '/order/submitManuAndLogisticFeedback', {orderId: orderId, serviceScore:serviceScore, responseSpeedScore:responseSpeedScore, processingSpeedScore:processingSpeedScore, logisticScore:logisticScore});
                    },

                    /**
                     * 取得所有的地址
                     * @returns {HttpPromise}
                     */
                    getAllAddresses: function() {
                        return $http.get(backendContext + '/order/getAllAddresses');
                    },

                    /**
                     * 保存地址
                     * addressInfo: {address: "sdfdsf", cityCode: "12312", cityId: 48780, contactName: "sdfsdf", countryCode: "ALB", districtCode: "ALB.1702", phone: "23123", tel: "1231231", telCode: 355, zip: "123213"}
                     * @returns {HttpPromise}
                     */
                    saveAddress: function(addressInfo) {
                        return $http.post(backendContext + '/order/saveAddress', {addressInfo: addressInfo});
                    },

                    /**
                     * 删除地址
                     * @param addressId
                     * @returns {HttpPromise}
                     */
                    deleteAddress: function(addressId) {
                        return $http.post(backendContext + '/order/deleteAddress', {addressId: addressId});
                    },

                    /**
                     * 设置默认地址
                     * @param addressId
                     * @returns {HttpPromise}
                     */
                    setDefaultAddress: function(addressId) {
                        return $http.post(backendContext + '/order/setDefaultAddress', {addressId: addressId});
                    }
                };

                //
                // 账号信息
                //----------------------------------------------------------------------

                var accountMethods = {};

                //
                // gmcpay
                //----------------------------------------------------------------------

                var gmcpayMethods = {

                    /**
                     * 登录GMC Pay
                     * @param password 买家账号的密码（非支付密码）
                     * @returns {HttpPromise}
                     */
                    login: function(password) {
                        return $http.post(backendContext + '/gmcpay/login', {password: md5.createHash(password || '')});
                    },

                    /**
                     * 初始化GMC Pay用户信息（注意，并未激活）
                     * @returns {HttpPromise}
                     */
                    initUserGMCPayInfo: function() {
                        return $http.get(backendContext + '/gmcpay/initUserGMCPayInfo');
                    },

                    /**
                     * 验证支付密码
                     * @param password
                     * @returns {HttpPromise}
                     */
                    verifyPayPassword: function(password) {
                        console.log(password, md5.createHash(password || ''));
                        return $http.post(backendContext + '/gmcpay/verifyPayPassword', {password: md5.createHash(password || '')});
                    },

                    /**
                     * 更新支付密码
                     *
                     * 可根据newPassword和oldPassword来更新
                     * 也可根据newPassword和key来更新
                     *
                     * @param newPassword
                     * @param oldPassword
                     * @parm key
                     * @returns {HttpPromise}
                     */
                    updatePayPassword: function(newPassword, oldPassword, key) {
                        return $http.post(backendContext + '/gmcpay/updatePayPassword', {oldPassword: oldPassword ? md5.createHash(oldPassword || '') : '', newPassword: newPassword ? md5.createHash(newPassword || '') : '', key: key});
                    },

                    /**
                     * 搜索交易记录
                     * @param searchCondition {type:, fundFlow:,}
                     * @param pageSize
                     * @param pageNum
                     * @returns {HttpPromise}
                     */
                    searchTransactionRecords: function(searchCondition, pageSize, pageNum) {
                        return $http.post(backendContext + '/gmcpay/searchTransactionRecords', {type: searchCondition.type, fundFlow: searchCondition.fundFlow, pageSize: pageSize, pageNum: pageNum});
                    },

                    /**
                     * 统计账号显示金额信息
                     * @returns {HttpPromise}
                     */
                    statAccountMoney: function() {
                        return $http.get(backendContext + '/gmcpay/statAccountMoney');
                    },

                    /**
                     * 统计交易记录金额信息
                     * @returns {HttpPromise}
                     */
                    statTransactionMoney: function() {
                        return $http.get(backendContext + '/gmcpay/statTransactionMoney');
                    },

                    /**
                     * 发送验证邮件
                     * @param type: withdraw=充值 activeGMCPay=激活GMCPay
                     * @returns {HttpPromise}
                     */
                    sendVerificationEmail: function (type) {
                        return $http.post(backendContext + '/gmcpay/sendVerificationEmail', {type: type});
                    },

                    /**
                     * 验证邮件链接
                     * @param type: withdraw=充值 activeGMCPay=激活GMCPay
                     */
                    verifyEmailLink: function(type, key) {
                        return $http.post(backendContext + '/gmcpay/verifyEmailLink', {type: type, key: key});
                    },

                    /**
                     * 取得验证提现相关信息
                     * @returns {HttpPromise}
                     */
                    getVerifyPaymentInfo: function () {
                        return $http.get(backendContext + '/gmcpay/getVerifyPaymentInfo');
                    },

                    /**
                     * 提交提现请求
                     * @param withdrawAmount
                     * @param cardId
                     * @param paymentPassword
                     * @param verifyCode
                     * @returns {HttpPromise}
                     */
                    submitWithdrawRequest: function(withdrawAmount, cardId, paymentPassword, verifyCode) {
                        return $http.post(backendContext + '/gmcpay/submitWithdrawRequest', {withdrawAmount: withdrawAmount, cardId: cardId, paymentPassword: md5.createHash(paymentPassword || ''), verifyCode: verifyCode});
                    },

                    /**
                     * 取得简要的提现信息
                     * @param requestId
                     * @returns {HttpPromise}
                     */
                    getBriefWithdrawRequestInfo: function (requestId) {
                        return $http.post(backendContext + '/gmcpay/getBriefWithdrawRequestInfo', {requestId: requestId});
                    },

                    /**
                     * 取得充值的详细信息
                     * @param requestId
                     * @returns {HttpPromise}
                     */
                    getWithdrawRequestDetail: function (requestId) {
                        return $http.post(backendContext + '/gmcpay/getWithdrawRequestDetail', {requestId: requestId});
                    },

                    /**
                     * 取得充值请求详情
                     * @param requestId
                     * @returns {HttpPromise}
                     */
                    getRechargeRequestDetail: function (requestId) {
                        return $http.post(backendContext + '/gmcpay/getRechargeRequestDetail', {requestId: requestId});
                    },

                    /**
                     * 提交充值请求
                     * @param amount
                     * @returns {HttpPromise}
                     */
                    submitRechargeRequest: function (amount) {
                        return $http.post(backendContext + '/gmcpay/submitRechargeRequest', {amount: amount});
                    },

                    /**
                     * 保存账号激活的相关信息
                     * @param password
                     * @param cardInfo {bankId:, cardAccountName:, cardAccountNO:, cardBankAddress:, cardSwiftCode:}
                     * @returns {HttpPromise}
                     */
                    saveActiveGMCPayInfo: function(password, key, cardInfo) {
                        return $http.post(backendContext + '/gmcpay/saveActiveGMCPayInfo', {password: md5.createHash(password || ''), key:key, cardInfo: cardInfo});
                    },


                    /**
                     * 取得GMCPAY的激活状态
                     * @returns {HttpPromise}
                     */
                    getGMCPayStatus: function() {
                        return $http.get(backendContext + '/gmcpay/getGMCPayStatus');
                    },

                    /**
                     * 取得在线银行列表
                     * @returns {HttpPromise}
                     */
                    getAllTransferOnlineBanks: function() {
                        return $http.get(backendContext + '/gmcpay/getAllTransferOnlineBanks');
                    }

                };

                return _.extend(orderMethods, accountMethods, gmcpayMethods);

            }]
    );

})();
