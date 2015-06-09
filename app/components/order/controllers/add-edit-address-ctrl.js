/**
 * Created by danielxiao on 15/2/5.
 */

(function() {

    angular.module('buyer-order.controller').controller('AddEditAddressCtrl', ['$scope', '$modalInstance', 'buyerOrderConstants', 'commonRestService', 'buyerRestService', 'addressInfo',

        function AddEditAddressCtrl($scope, $modalInstance, buyerOrderConstants, commonRestService, buyerRestService, addressInfo) {

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.i18nData = buyerOrderConstants.i18nData;

            $scope.addressInfo = {};

            $scope.allCountries = [];
            $scope.allDistricts = [];
            $scope.allCities = [];

            /*========== Scope Functions ==================================================*/

            $scope.getDistricts = function(countryItem) {
                $scope.addressInfo.telCode = countryItem.telcode;
                commonRestService.getDistricts(countryItem.countryCode)
                    .success(function(data) {
                        $scope.allDistricts = data;
                        $scope.addressInfo.districtCode = '';
                        $scope.addressInfo.cityId = null;
                    });
            };

            $scope.getCities = function (DistrictItem) {
                commonRestService.getCities(DistrictItem.countryCode, DistrictItem.districtCode)
                    .success(function(data) {
                        $scope.allCities = data;
                        $scope.addressInfo.cityId = null;
                    });
            };

            $scope.submit = function() {
                buyerRestService.saveAddress($scope.addressInfo)
                    .success(function() {
                        $modalInstance.close();
                    });

            };

            $scope.cancel = function() {
                $modalInstance.dismiss('cancel');
            };

            /*========== Listeners ==================================================*/

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _getAllCountries() {
                commonRestService.getAllCountries()
                    .success(function(data) {
                        $scope.allCountries = data;

                        // 编辑状态下的初始化
                        if ($scope.addressInfo.districtCode) {
                            commonRestService.getDistricts($scope.addressInfo.countryCode)
                                .success(function(data) {
                                    $scope.allDistricts = data;
                                    if ($scope.addressInfo.cityId) {
                                        commonRestService.getCities($scope.addressInfo.countryCode, $scope.addressInfo.districtCode)
                                            .success(function(data) {
                                                $scope.allCities = data;
                                            });
                                    }
                                });
                        }
                    })
            }

            function _init() {
                _getAllCountries();

                if (addressInfo) { // 编辑状态
                    $scope.addressInfo = addressInfo;
                }
            }

            _init();

        }
    ]);

})();

