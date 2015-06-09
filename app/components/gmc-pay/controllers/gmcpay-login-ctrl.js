/**
 * Created by danielxiao on 15/2/9.
 */

(function() {

    angular.module('gmc-pay.controller').controller('GMCPayLoginCtrl', ['$scope', '$location', 'gmcPayConstants', 'ipCookie', 'buyerRestService',

        function GMCPayLoginCtrl($scope, $location, gmcPayConstants, ipCookie, buyerRestService) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.passwordError = false;

            $scope.password = '';

            /*========== Scope Functions ==================================================*/

            $scope.login = function() {
                buyerRestService.login($scope.password)
                    .success(function(data) {
                        if (data.verificationPass) {
                            ipCookie('gptoken', data.gptoken, gmcPayConstants.cookieOption);
                            $location.url('/gmc-pay/my-account');
                        } else {
                            $scope.password = '';
                            $scope.passwordError = true;
                            ipCookie.remove('gptoken', gmcPayConstants.cookieOption);
                        }
                    });
            }

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _init() {
            }

        }
    ]);

})();
