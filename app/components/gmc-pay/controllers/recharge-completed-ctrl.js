/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('RechargeCompletedCtrl', ['$scope', '$location', '$routeParams', '$anchorScroll', 'buyerRestService',

        function RechargeCompletedCtrl($scope, $location, $routeParams, $anchorScroll, buyerRestService) {

            var bankUrls = {};

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.selectCountryName;

            $scope.rechargeInfo = {
                rechargeTotal: 2000,
                bankAccountName: 'Feifei International Limited',
                bankName: 'Citibank N.A. Hong Kong',
                bankAccountNO: '7125xxxxx',
                bankAddress: '3 Garden Road, Citibank Plaza, Central, Hong Kong.',
                bankSwiftCode: 'CITIHKH',
                bankPhoneNumber: '+852 2307 6077',
                bankEmailAddress: 'hongkong.citiservice@citi.com',
                bankCode: '006',
                bankBranchCode: '391'
            }

            $scope.requestIdValid = false;

            $scope.bankCountries = [];

            $scope.banks = [];

            $scope.isBusinessAccount = true;

            /*========== Scope Functions ==================================================*/

            $scope.printPage = function() {
                window.print();
            }

            $scope.scrollToTransferOnline = function() {
                $location.hash('transferOnline');
                $anchorScroll();
            }

            $scope.showBanks = function(bankCountryItem) {
                $scope.banks = _.map(bankCountryItem.banks, function(bankName) {
                    var urlObj = _getBankUrl(bankName);
                    return {
                        bankName: bankName,
                        businessUrl: urlObj.c,
                        personalUrl: urlObj.p
                    }
                }) ;
            }

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _getBankUrl(bankName) {
                return bankUrls[bankName];
            }

            function _getRechargeRequestInfo(requestId) {
                buyerRestService.getRechargeRequestDetail(requestId)
                    .success(function (data) {
                        $scope.rechargeInfo = data;
                        $scope.requestIdValid = true;
                    })
            }

            function _getAllTransferOnlineBanks() {
                buyerRestService.getAllTransferOnlineBanks()
                    .success(function(data) {
                        $scope.bankCountries = data.bankCountries;
                        bankUrls = data.bankUrls;

                        var defaultSelectCountry = $scope.bankCountries[0];
                        $scope.selectCountryName = defaultSelectCountry.countryName;
                        $scope.showBanks(defaultSelectCountry)
                    });
            }

            function _init() {
                var requestId = $routeParams.requestId;
                if (requestId) {
                    _getRechargeRequestInfo(requestId);
                    _getAllTransferOnlineBanks();
                }
            }

        }
    ]);

})();
