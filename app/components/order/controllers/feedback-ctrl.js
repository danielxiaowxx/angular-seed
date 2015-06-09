/**
 * Created by danielxiao on 15/1/29.
 */

(function() {

    angular.module('buyer-order.controller').controller('FeedbackCtrl', ['$scope', '$route', '$routeParams', 'buyerOrderConstants', 'buyerRestService',

        function FeedbackCtrl($scope, $route, $routeParams, buyerOrderConstants, buyerRestService) {

            var orderId;

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.i18nData = buyerOrderConstants.i18nData;

            $scope.orderInfo = undefined;

            $scope.feedbackForManu = undefined;

            $scope.feedbackForLogistic = undefined;

            $scope.feedbackForProducts = [];

            $scope.hasFeedbackForManu = false;
            $scope.hasFeedbackForLogistic = false;
            $scope.hasFeedbackForProducts = false;

            /*========== Scope Functions ==================================================*/

            $scope.submitManuAndLogisticFeedback = function() {
                buyerRestService.submitManuAndLogisticFeedback(orderId, $scope.feedbackForManu.service, $scope.feedbackForManu.responseSpeed, $scope.feedbackForManu.processingSpeed, $scope.feedbackForLogistic)
                    .success(function() {
                        $route.reload();
                    });
            }

            $scope.submitProductsFeedback = function() {
                var productsFeedback = _.map($scope.feedbackForProducts, function(item) {
                    return _.extend(item.feedback, {
                        skuId: item.skuId,
                        spuId: item.spuId,
                        productId: item.productId
                    });
                });
                buyerRestService.submitProductsFeedback(orderId, productsFeedback)
                    .success(function() {
                       $route.reload();
                    });
            }

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _getFeedbackDetail(orderId) {
                buyerRestService.getFeedbackDetail(orderId)
                    .success(function(data) {
                        $scope.orderInfo = data.orderInfo;

                        $scope.feedbackForManu = data.feedbackForManu;
                        $scope.feedbackForLogistic = data.feedbackForLogistic;
                        $scope.feedbackForProducts = data.feedbackForProducts;

                        $scope.hasFeedbackForManu = data.feedbackForManu ? true : false;
                        $scope.hasFeedbackForLogistic = data.feedbackForLogistic ? true: false;
                        $scope.hasFeedbackForProducts = data.feedbackForProducts[0].feedback ? true : false;

                        // 默认值
                        if (!$scope.hasFeedbackForManu) {
                            $scope.feedbackForManu = {
                                service: 5,
                                responseSpeed: 5,
                                processingSpeed: 5
                            };
                        }
                        if (!$scope.hasFeedbackForLogistic) {
                            $scope.feedbackForLogistic = 5;
                        }
                        if (!$scope.hasFeedbackForProducts) {
                            _.each($scope.feedbackForProducts, function(item) {
                                item.feedback = {
                                    feedbackScore: 5
                                }
                            });
                        }

                    });
            }

            function _init() {
                orderId = $routeParams.orderId;
                _getFeedbackDetail(orderId);
            }

        }
    ]);

})();
