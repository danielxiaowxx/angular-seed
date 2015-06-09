/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('WithdrawCtrl', ['$scope', 'buyerRestService',

        function WithdrawCtrl($scope, buyerRestService) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.hasSendVerificationEmail = false;

            $scope.confusionAccountEmail = undefined;

            $scope.mailServerUrl = undefined;

            /*========== Scope Functions ==================================================*/

            $scope.sendVerificationEmail = function() {
                buyerRestService.sendVerificationEmail('withdraw')
                    .success(function(data) {
                        $scope.hasSendVerificationEmail = true;
                        $scope.mailServerUrl = data.mailServerUrl;
                    });
            }

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _init() {
                $scope.confusionAccountEmail = $scope.$root.accountInfo.email.replace(/(.)(?:.*?)(.@)/, function($0, $1, $2){ return $1 + '***' + $2 });
            }

        }
    ]);

})();