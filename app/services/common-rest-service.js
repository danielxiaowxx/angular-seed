/**
 * Created by danielxiao on 15/2/2.
 */

(function() {

    var backendContext = '/commonRestService'; // 后端上下文

    angular.module('common.service', []).factory('commonRestService', ['$http',
        function($http) {

            var userMethod = {
            };

            var addressMethod = {

                /**
                 * 取得所有国家信息
                 * @returns {HttpPromise}
                 */
                getAllCountries: function() {
                    return $http.get(backendContext + '/common/getAllCountries');
                },


                getDistricts: function(countryCode) {
                    return $http.post(backendContext + '/common/getDistricts', {countryCode: countryCode});
                },

                /**
                 * 根据国家码和地区码取得城市信息
                 */
                getCities: function(countryCode, districtCode) {
                    return $http.post(backendContext + '/common/getCities', {countryCode: countryCode, districtCode: districtCode});
                }
            };

            return _.extend(userMethod, addressMethod);

        }
    ])

})();
