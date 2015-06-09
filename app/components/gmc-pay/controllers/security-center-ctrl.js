/**
 * Created by danielxiao on 15/1/30.
 */

(function() {

    angular.module('gmc-pay.controller').controller('SecurityCenterCtrl', ['$scope', '$route', 'dialogService', 'buyerRestService',

        function SecurityCenterCtrl($scope, $route, dialogService, buyerRestService) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.currentPassword = '';

            $scope.newPassword = '';

            $scope.confirmPassword = '';

            $scope.currentPasswordveritied = false;
            $scope.hasVerifyAction = false; // 是否进行过密码验证动作

            /*========== Scope Functions ==================================================*/

            $scope.verifyCurrentPassword = function() {
                buyerRestService.verifyPayPassword($scope.currentPassword)
                    .success(function(data) {
                        $scope.hasVerifyAction = true;
                        $scope.currentPasswordveritied = data.verifyPass;
                    })
            }

            $scope.submit = function () {
                buyerRestService.updatePayPassword($scope.newPassword, $scope.currentPassword)
                    .success(function() {
                        dialogService.alert('update successfully!').then(function() {
                            $route.reload();
                        });
                    })
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
