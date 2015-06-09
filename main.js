/**
 * Created by danielxiao on 15/2/9.
 */

// TODO Danie: 暂时用这个来启动测试和生产环境的静态资源服务

var connect = require('gulp-connect');
var nconf = require('nconf').argv().env();

connect.server({
    root: 'app/dist/',
    //https: true,
    port: nconf.get('PORT') || 80
});
