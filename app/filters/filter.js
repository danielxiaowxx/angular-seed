/**
 * Created by danielxiao on 15/8/9.
 */

(function() {
  var filter = angular.module( "common.filter", [] );

  /**
   * 使用underscore/lodash的template方法
   */
  filter.filter('template', [function template() {
    return function(inputTmpl, data) {
      return inputTmpl ? (_.template(inputTmpl))(data) : '';
    }
  }]);

})();
