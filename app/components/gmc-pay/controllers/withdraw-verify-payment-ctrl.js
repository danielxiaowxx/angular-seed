/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('WithdrawVerifyPaymentCtrl', ['$scope', '$routeParams', '$location', 'dialogService', 'buyerRestService',

        function WithdrawVerifyPaymentCtrl($scope, $routeParams, $location, dialogService, buyerRestService) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.verifyEmailLinkPass = false;

            $scope.provideWithdrawInfo = { // 需要提供的提现信息
                withdrawAmount: 0,
                actualWithdrawAmount: 0,
                cardId: 0,
                paymentPassword: '',
                verifyCode: ''
            };

            $scope.verifyPaymentInfo = undefined;

            $scope.verifyCodeImg = '/buyerRestService/gmcpay/getVerifyCode.jpg?type=withdraw';

            $scope.bankFee = 0;

            /*========== Scope Functions ==================================================*/

            $scope.changeActualAmount = function () {
                $scope.provideWithdrawInfo.actualWithdrawAmount =
                    ($scope.verifyPaymentInfo.balance - $scope.bankFee) > $scope.provideWithdrawInfo.withdrawAmount ?
                        $scope.provideWithdrawInfo.withdrawAmount - $scope.bankFee : $scope.verifyPaymentInfo.balance - $scope.bankFee;

                $scope.provideWithdrawInfo.actualWithdrawAmount = $scope.provideWithdrawInfo.actualWithdrawAmount < 0 ? 0 : $scope.provideWithdrawInfo.actualWithdrawAmount;
            }

            $scope.refreshVerifyCode = function() {
                $scope.verifyCodeImg = '/buyerRestService/gmcpay/getVerifyCode.jpg?type=withdraw&t=' + new Date().getTime();
            }

            $scope.submit = function() {
                dialogService.confirm('Are you sure to submit the withdraw request?').then(function() {
                    buyerRestService.submitWithdrawRequest($scope.provideWithdrawInfo.withdrawAmount, $scope.provideWithdrawInfo.cardId, $scope.provideWithdrawInfo.paymentPassword, $scope.provideWithdrawInfo.verifyCode)
                        .success(function(data) {
                            var errorMsg = '';
                            if (data.passwordError) {
                                errorMsg = 'Payment password is incorrect!';
                            } else if (data.verifyCodeError) {
                                errorMsg = 'Verification code is incorrect!';
                            }
                            if (errorMsg) {
                                dialogService.alert(errorMsg);
                            } else {
                                $location.url('/gmc-pay/withdraw/step3?requestId=' + data.requestId);
                            }
                        });
                });
            }

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            $scope.$watch('provideWithdrawInfo.cardId', function(newVal) {
                if (!newVal) return;

                // 更改手续费显示
                $scope.bankFee = _.find($scope.verifyPaymentInfo.cards, function (item) {
                    return item.cardId == newVal;
                }).cardBankFee;

                // 更改实际提取金额
                $scope.changeActualAmount();
            });

            /*========== Private Functions ==================================================*/

            function _getVerifyPaymentInfo() {
                buyerRestService.getVerifyPaymentInfo()
                    .success(function(data) {
                        $scope.verifyPaymentInfo = data;

                        // 默认选中的银行卡
                        var findOne = _.find($scope.verifyPaymentInfo.cards, function(item) { return item.isDefault; });
                        if (findOne) {
                            $scope.provideWithdrawInfo.cardId = findOne.cardId;
                        } else {
                            $scope.provideWithdrawInfo.cardId = $scope.verifyPaymentInfo.cards[0].cardId;
                        }
                    });
            }

            function _verifyEmailLink(key) {
                buyerRestService.verifyEmailLink('withdraw', key)
                    .success(function() {
                        $scope.verifyEmailLinkPass = true;
                        _getVerifyPaymentInfo();
                    });
            }

            function _init() {
                var key = $routeParams.key;
                if (key) {
                    _verifyEmailLink(key);
                }
            }

        }
    ]);

})();
