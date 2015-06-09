/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('ActiveGmcpayStep2Ctrl', ['$scope', '$location', '$modal', '$routeParams', 'gmcPayConstants', 'dialogService', 'buyerRestService', 'md5', 'ipCookie',

        function ActiveGmcpayStep2Ctrl($scope, $location, $modal, $routeParams, gmcPayConstants, dialogService, buyerRestService, md5, ipCookie) {

            var key;

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.verifyEmailLinkPass = false;

            $scope.banksList = [];

            $scope.paymentPassword = '';
            $scope.confirmPassword = '';
            $scope.hasAgree = true;
            $scope.cardInfo = {
                bankName: undefined,
                cardAccountName: '',
                cardAccountNO: '',
                cardBankAddress: '',
                cardSwiftCode: ''
            };

            /*========== Scope Functions ==================================================*/

            $scope.openGMCPayTerms = function() {
                $modal.open({
                    templateUrl: 'gmc-pay/partials/gmcpay-terms.tpl.html',
                    controller: 'GMCPayTermsModalCtrl',
                    size: 'lg'
                });
            }

            $scope.submit = function() {
                dialogService.confirm("Are you sure to submit the information?").then(function() {
                    var cardInfo = angular.copy($scope.cardInfo);
                    if (cardInfo.bankName == 'Others') {
                        cardInfo.bankName = cardInfo.otherBankName;
                    }

                    buyerRestService.saveActiveGMCPayInfo($scope.paymentPassword, key, cardInfo)
                        .success(function(data) {
                            window.userInfo[md5.createHash('isActive').toString()] = md5.createHash(new Date().getTime().toString()); // 修改已激活状态
                            ipCookie('gptoken', data.gptoken, gmcPayConstants.cookieOption);
                            $location.url('/gmc-pay/active-gmcpay/step3');
                        })
                });
            }

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _verifyEmailLink(key) {
                buyerRestService.verifyEmailLink('activeGMCPay', key)
                    .success(function(data) {
                        $scope.verifyEmailLinkPass = true;
                        $scope.banksList = data.banksList;
                        $scope.banksList.push('Others');
                    });
            }

            function _init() {
                key = $routeParams.key;
                if (key) {
                    _verifyEmailLink(key);
                }
            }

        }
    ]);

})();
