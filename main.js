/**
 * Created by danielxiao on 15/2/9.
 */

// 如果静态项目单独存在，可用这个来启动测试和生产环境的静态资源服务
// 如果该项目存在于node(express, koa, restify等)项目的，则可删除该文件

var connect = require('gulp-connect');
var nconf = require('nconf').argv().env();

connect.server({
    root: 'dist/',
    //https: true,
    port: nconf.get('PORT') || 80
});
