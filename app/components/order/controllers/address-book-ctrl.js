/**
 * Created by danielxiao on 15/1/29.
 */

(function() {

    angular.module('buyer-order.controller').controller('AddressBookCtrl', ['$scope', '$route', '$modal', 'dialogService', 'buyerOrderConstants', 'buyerRestService',

        function AddressBookCtrl($scope, $route, $modal, dialogService, buyerOrderConstants, buyerRestService) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.i18nData = buyerOrderConstants.i18nData;

            $scope.addressList = [];

            /*========== Scope Functions ==================================================*/

            $scope.addingOrEditing = function(addressInfo) {
                var modalInstance = $modal.open({
                    templateUrl: 'buyer-order/partials/add-edit-address.tpl.html',
                    controller: 'AddEditAddressCtrl',
                    //size: '',
                    resolve: {
                        addressInfo: function() {
                            return addressInfo;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    $route.reload();
                });
            };

            $scope.delete = function(addressId) {
                dialogService.confirm($scope.i18nData.sureToDelete).then(function() {
                    buyerRestService.deleteAddress(addressId)
                        .success(function() {
                            var findOne = _.find($scope.addressList, function(item) {return item.addressId == addressId;});
                            if (findOne) {
                                $scope.addressList.splice($scope.addressList.indexOf(findOne), 1);
                            }
                        });
                });
            };

            $scope.setDefault = function(addressId) {
                buyerRestService.setDefaultAddress(addressId)
                    .success(function() {
                        $route.reload();
                    });
            };

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _getAllAddresses() {
                buyerRestService.getAllAddresses()
                    .success(function(data) {
                        $scope.addressList = data;
                    });
            }

            function _init() {
                _getAllAddresses();
            }

        }
    ]);

})();
