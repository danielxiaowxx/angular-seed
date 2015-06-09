/**
 * Created by danielxiao on 15/2/8.
 */


(function() {

    angular.module('gmc-pay.controller').controller('ForgetPasswordStep2Ctrl', ['$scope', '$location', '$routeParams', 'buyerRestService',

        function ForgetPasswordStep2Ctrl($scope, $location, $routeParams, buyerRestService) {

            var key;

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.verifyEmailLinkPass = false;

            $scope.newPassword = '';

            $scope.confirmPassword = '';

            /*========== Scope Functions ==================================================*/

            $scope.submit = function () {
                buyerRestService.updatePayPassword($scope.newPassword, null, key)
                    .success(function() {
                        $location.url('/gmc-pay/forget-password/step3');
                    })
            }

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _verifyEmailLink(key) {
                buyerRestService.verifyEmailLink('forgetPassword', key)
                    .success(function() {
                        $scope.verifyEmailLinkPass = true;
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