/**
 * Created by danielxiao on 15/2/8.
 */


(function() {

    angular.module('gmc-pay.controller').controller('GMCpayIntroduceCtrl', ['$scope', '$location', 'buyerRestService',

        function GMCpayIntroduceCtrl($scope, $location, buyerRestService) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.isActivated = true;

            /*========== Scope Functions ==================================================*/

            $scope.activeMyGMCpay = function() {
              buyerRestService.initUserGMCPayInfo()
                  .success(function() {
                      $location.url('/gmc-pay/active-gmcpay')
                  });
            };

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _init() {
                buyerRestService.getGMCPayStatus()
                    .success(function(data) {
                        $scope.isActivated = data.isActivated;
                    })
            }

        }
    ]);

})();
