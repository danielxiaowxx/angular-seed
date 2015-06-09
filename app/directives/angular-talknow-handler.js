/**
 * Created by danielxiao on 15/2/3.
 */


(function () {

    angular.module('gm.talknow', ['ui.bootstrap'])

        .directive('talknowHandler', ['$compile', function ($compile) {
            return {
                restrict: 'A',
                scope   : {
                    paramId    : '@talknowParamId',
                    paramIdType: '@talknowParamIdType' // compId or productId or userId
                },
                link    : function (scope, element) {

                    element.addClass('ft-icon ft-icon-offline');

                    // TODO Daniel: TalkNow由于cookie域问题暂时支持不了中国城，所以这里这样处理
                    if (!scope.$root.envConfig.channelConfig.showTalkNow) {
                        var template = '<span popover="客服QQ：2230076066; 联系电话：4008082002" popover-trigger="mouseenter">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>';
                        var content = $compile(template)(scope);
                        element.append(content);

                        return;
                    }

                    // compId
                    if (scope.paramIdType == 'compId') {

                        var timer = 10;

                        var interval = setInterval(function() { // 防止FT对象未初始化的情况

                            timer--;

                            if (timer == 0) {
                                clearInterval(interval);
                                return;
                            }

                            if (window.FT) {

                                clearInterval(interval);

                                window.FT.getOnlineStatusByCompIds([scope.paramId])

                                    .then(function (data) {

                                        for (var compId in data) {

                                            var users = data[compId],
                                                status,
                                                imAccName;

                                            var isMaster = function (userItem) {
                                                return userItem.isMaster === 1;
                                            };
                                            var isNotMaster = function (userItem) {
                                                return userItem.isMaster !== 1;
                                            };
                                            var isOnlineMaster = function (userItem) {
                                                return userItem.isMaster && userItem.imStatus === 'online';
                                            };

                                            // 如果主账号在线，则显示主账号
                                            // 如果主账号不在线，则随机显示某个在线的子账号
                                            // 如果都不在线，则显示主账号
                                            var masterAccUser = _.find(users, isMaster);
                                            if (masterAccUser && masterAccUser.imStatus === 'online') { // 如果主账号在线，则显示主账号
                                                status = 'online';
                                                imAccName = masterAccUser.accName;
                                            }
                                            else {
                                                var randomOnlineSubAccUser = _.find(users, isOnlineMaster);

                                                if (randomOnlineSubAccUser) { // 如果主账号不在线，则随机显示某个在线的子账号
                                                    status = 'online';
                                                    imAccName = randomOnlineSubAccUser.accName;
                                                }
                                                else { // 如果都不在线，则显示主账号
                                                    status = 'offline';
                                                    if (masterAccUser) {
                                                        imAccName = masterAccUser.accName;
                                                    }
                                                    else {
                                                        var randomOfflineSubAccUser = _.find(users, isNotMaster);
                                                        if (randomOfflineSubAccUser) {
                                                            imAccName = randomOfflineSubAccUser.accName;
                                                        }
                                                    }
                                                }
                                            }

                                            if (imAccName && status) {
                                                if (status === 'online') {
                                                    element.removeClass('ft-icon-offline').addClass('ft-icon-online');
                                                }
                                            }

                                            var parentTagName = element.parent().get(0).tagName.toLowerCase();
                                            if (parentTagName === 'a' || parentTagName === 'button') {
                                                element.parent().on('click', function () {
                                                    window.FT.startChat(imAccName);
                                                });
                                            } else {
                                                element.on('click', function () {
                                                    window.FT.startChat(imAccName);
                                                });
                                            }

                                        }
                                    });
                            }
                        }, 100);

                    }
                }
            }
        }])

        .directive('startChat', ['$compile', function($compile) {
            return {
                restrict: 'A',
                scope: {
                    imAcc: '@startChat'
                },
                link: function(scope, element) {

                    // TODO Daniel: TalkNow由于cookie域问题暂时支持不了中国城，所以这里这样处理
                    if (!scope.$root.envConfig.channelConfig.showTalkNow) {
                        element.find('img').attr('popover', '客服QQ：2230076066; 联系电话：4008082002').attr('popover-trigger', 'mouseenter');
                        $compile(element.contents())(scope);

                        return;
                    }

                    element.on('click', function() {
                        if (window.FT) {
                            window.FT.startChat(scope.imAcc);
                        }
                    });

                }
            }

        }])

})();

