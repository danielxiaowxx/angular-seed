/**
 * Created by danielxiao on 15/1/29.
 */

(function() {

    angular.module('buyer-order.controller').controller('DisputeRefundDetailCtrl', ['$scope', '$location', '$route', '$routeParams', 'buyerOrderConstants', 'dialogService', 'buyerRestService',

        function DisputeRefundDetailCtrl($scope, $location, $route, $routeParams, buyerOrderConstants, dialogService, buyerRestService) {

            var refundId;

            /*========== Widget Events ==================================================*/

            /*========== Scope Models ==================================================*/

            $scope.i18nData = buyerOrderConstants.i18nData;

            $scope.dataLoaded = false; // 避免数据未加载完显示一些HTML

            $scope.orderId;

            $scope.isModifying = false; // 是否在修改中

            $scope.disputeInfo = undefined;

            $scope.disputeStatus = buyerOrderConstants.disputeStatus;

            $scope.uploadConfig = {
                uploadUrl: buyerOrderConstants.config.fileUploadUrl,
                filter: [{
                    title: $scope.i18nData.imageFiles,
                    extensions: "jpg,jpeg,png,gif"
                }],
                maxSize: '5000kb',
                multiParams: {
                    'entity_source': 'like',
                    'comp_id': 0
                }
            };

            /*========== Scope Functions ==================================================*/

            $scope.photoUploaded = function(response) {
                var res = JSON.parse(response.response);
                $scope.disputeInfo.disputeDetail.photos.push(buyerOrderConstants.config.imgServerUrl + res['Remote file_id']);
            }

            $scope.removePhoto = function(photoUrl) {
                var idx = $scope.disputeInfo.disputeDetail.photos.indexOf(photoUrl);
                $scope.disputeInfo.disputeDetail.photos.splice(idx, 1);
            }

            $scope.submitRefundRequest = function() {
                dialogService.confirm($scope.i18nData.sureSubmitRefund).then(function() {
                    // 去掉图片地址的服务器信息
                    $scope.disputeInfo.disputeDetail.photos = _.map($scope.disputeInfo.disputeDetail.photos, function(photoUrl) {
                        return photoUrl.replace(buyerOrderConstants.config.imgServerUrl, '');
                    });
                    buyerRestService.submitRefundRequest($scope.orderId, $scope.disputeInfo.disputeDetail.hasReceiveGoods, $scope.disputeInfo.disputeDetail.refundReasonId, $scope.disputeInfo.disputeDetail.isFullRefund, $scope.disputeInfo.disputeDetail.refundAmount, $scope.disputeInfo.disputeDetail.detail, $scope.disputeInfo.disputeDetail.photos)
                        .success(function(data) {
                            $location.url('/order/dispute-refund/dispute-refund-detail?refundId=' + data.refundId);
                        });
                })
            }

            $scope.cancelSubmitRequest = function() {
                $location.url('/order/my-orders/order-detail?orderId=' + $scope.orderId);
            }

            $scope.cancelRefundRequest = function() {
                dialogService.confirm($scope.i18nData.sureCancelRefund).then(function() {
                    buyerRestService.cancelRefundRequest(refundId, $scope.orderId)
                        .success(function() {
                            $route.reload();
                        });
                });
            }

            $scope.modifyRequest = function() {
                $scope.isModifying = true;
            }

            $scope.requestMediation = function() {
                dialogService.confirm($scope.i18nData.sureRequestMediation).then(function() {
                    buyerRestService.applyArbitration(refundId, $scope.orderId)
                        .success(function() {
                            $route.reload();
                        })
                });
            }

            /*========== Listeners ==================================================*/

            $scope.$on('$routeChangeSuccess', function() {
                _init();
            });

            /*========== Watches ==================================================*/

            /*========== Private Functions ==================================================*/

            function _getDisputeOrderDetail(refundId, orderId) {
                buyerRestService.getDisputeOrderDetail(refundId, orderId)
                    .success(function(data) {
                        $scope.disputeInfo = data;
                        $scope.orderId = data.orderDetail.orderId;

                        if (data.disputeDetail.disputeStatus == undefined) { // 无纠纷中
                            $scope.disputeInfo.disputeDetail = {
                                hasReceiveGoods: 'N',
                                isFullRefund: 1,
                                refundReasons: [{id: undefined, reason: 'Please select'}].concat(data.disputeDetail.refundReasons),
                                refundReasonId: undefined,
                                photos: []
                            }
                        }

                        $scope.dataLoaded = true;
                    });
            }

            function _init() {
                refundId = $routeParams.refundId; // refundId为空证明还未有退款
                $scope.orderId = $routeParams.orderId; // refundId和orderId两个必须有且只有一个有值

                _getDisputeOrderDetail(refundId, $scope.orderId);
            }

        }
    ]);

})();
