/**
 * Created by danielxiao on 15/2/8.
 */
(function () {

    angular.module('gm.formValid', [])

        .directive('validFocus', [function() {
            var FOCUS_CLASS = "gm-focused";
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function(scope, element, attrs, ctrl) {
                    ctrl.$focused = false;
                    element.bind('focus', function() {
                        element.addClass(FOCUS_CLASS);
                        scope.$apply(function() {ctrl.$focused = true;});
                    }).bind('blur', function() {
                        element.removeClass(FOCUS_CLASS);
                        scope.$apply(function() {ctrl.$focused = false;});
                    });
                }
            }
        }]);

})();

