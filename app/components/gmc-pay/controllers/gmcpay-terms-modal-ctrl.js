/**
 * Created by danielxiao on 15/2/13.
 */

(function() {

    angular.module('gmc-pay.controller').controller('GMCPayTermsModalCtrl', ['$scope', '$modalInstance',

        function GMCPayTermsModalCtrl($scope, $modalInstance) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            /*========== Scope Functions ==================================================*/

            $scope.close = function() {
                $modalInstance.close();
            }

            /*========== Listeners ==================================================*/

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _init() {
            }

        }
    ]);

})();