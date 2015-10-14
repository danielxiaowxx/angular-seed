/**
 * Created by danielxiao on 15/1/27.
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var ngHtml2Js = require("gulp-ng-html2js");
var minifyHtml = require("gulp-minify-html");
var processhtml = require('gulp-processhtml');
var replace = require('gulp-replace');
var connect = require('gulp-connect');
var gulpif = require('gulp-if');
var sprity = require('sprity');
var del = require('del');
var Promise = require("bluebird");
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var md5 = require('md5');

var paths = {
  less       : ['./app/assets/less/**/*.less'],
  srcRoot    : './app',
  dist       : './dist',
  jsComponent: './app/components',
  jsLib      : './bower_components'
};
var jsLib = {
  commonLibs: [ // 主要依赖库 ['src_path', 'min_path'] （jquery.js和jquery.min.js在同一目录，所以不需要写第二个）
    ['lodash/lodash.js'],
    ['angular/angular.js'],
    ['angular-animate/angular-animate.js'],
    ['angular-route/angular-route.js'],
    ['angular-bootstrap/ui-bootstrap-tpls.js'],
    ['angular-bindonce/bindonce.js'],
    ['angular-cookie/angular-cookie.js'],
    ['angular-timer/dist/angular-timer.js'],
    ['angular-md5/angular-md5.js'],
    ['angular-mask/dist/ngMask.js'],
    ['angular-rt-popup/dist/angular-rt-popup.js'],
    ['angular-ui-select/dist/select.js'],
    ['plupload-angular-directive/dist/plupload-angular-directive.js'],
    ['angular-validation-match/dist/angular-input-match.js'],
    ['angular-local-storage/dist/angular-local-storage.js']
  ],
  ieLibs    : [ // IE兼容库
    ['json3/lib/json3.js'],
    ['respond/dest/respond.src.js'],
    ['es5-shim/es5-shim.js']
  ],
  devLibs   : [ // 开发依赖库
    ['angular-mocks/angular-mocks.js']
  ]
};

/**
 * 取得依赖库列表
 * @param dev true-开发过程依赖 false-非开发过程依赖（SIT, UAT, PRD）
 * @returns {{commonLibs: Array, ieLibs: Array}}
 */
var getJSLibList = function(dev) {
  var result = {commonLibs: [], ieLibs: []};

  if (dev) {
    result.commonLibs = _.map(jsLib.commonLibs.concat(jsLib.devLibs), function(item) {
      return paths.jsLib + '/' + item[0];
    });
    result.commonLibs = result.commonLibs.concat([paths.srcRoot + '/mock/mock.js']);
    result.ieLibs = _.map(jsLib.ieLibs, function(item) {
      return paths.jsLib + '/' + item[0];
    });
  } else {
    result.commonLibs = _.map(jsLib.commonLibs, function(item) {
      return paths.jsLib + '/' + (item[1] || item[0].replace(/\.js$/, '.min.js'));
    });
    result.ieLibs = _.map(jsLib.ieLibs, function(item) {
      return paths.jsLib + '/' + (item[1] || item[0].replace(/(\.src)?\.js$/, '.min.js'));
    });
    result.commonLibsJsMap = _.map(jsLib.commonLibs, function(item) {
      return paths.jsLib + '/' + (item[1] || item[0].replace(/(\.src)?\.js$/, '.min.js.map'));
    });
    result.ieLibsJsMap = _.map(jsLib.ieLibs, function(item) {
      return paths.jsLib + '/' + (item[1] || item[0].replace(/(\.src)?\.js$/, '.min.js.map'));
    });
  }

  return result;
};

/**
 * 生成angular模块
 *
 * @param componentDirName 文件夹名
 * @param moduleName 模块名
 */
var genComponentJs = function(componentDirName, moduleName) {

  var genJsFn = function() {
    return new Promise(function(resolve) {
      gulp.src(paths.jsComponent + '/' + componentDirName + '/**/*.js')
        .pipe(concat(moduleName + '.js'))
        .pipe(gulp.dest(paths.dist + '/js/components/' + componentDirName + '/'))
        .on('end', function() {
          resolve();
        });
    });
  };

  var genHtmlJsFn = function() {
    return new Promise(function(resolve) {
      gulp.src(paths.jsComponent + '/' + componentDirName + '/assets/partials/*.html')
        .pipe(minifyHtml({
          empty : true,
          spare : true,
          quotes: true
        }))
        .pipe(ngHtml2Js({
          moduleName   : moduleName,
          declareModule: false,
          prefix       : moduleName + "/partials/"
        }))
        .pipe(concat(moduleName + "-tpl.js"))
        .pipe(gulp.dest(paths.dist + "/js/components/" + componentDirName + "/"))
        .on('end', function() {
          resolve();
        });
    });
  };

  Promise.all([genJsFn(), genHtmlJsFn()])
    .then(function() {
      return gulp.src([paths.dist + "/js/components/" + componentDirName + "/" + moduleName + ".js", paths.dist + "/js/components/" + componentDirName + "/" + moduleName + "-tpl.js"])
        .pipe(concat(moduleName + ".js"))
        .pipe(gulp.dest(paths.dist + "/js/components/" + componentDirName + "/"))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(paths.dist + "/js/components/" + componentDirName + "/"))
        .pipe(connect.reload());
    });
};

gulp.task('default', ['pre-dev']);

gulp.task('less', function(done) {
  gulp.src(paths.srcRoot + '/assets/less/app.less')
    .pipe(less())
    .pipe(gulp.dest(paths.dist + '/assets/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(paths.dist + '/assets/css/'))
    .pipe(connect.reload())
    .on('end', done);
});

gulp.task('sprites', function() {
  // gm-bootstrap-enhance common icon style
  var basePath = paths.srcRoot + '/assets/less/gm-bootstrap-enhance';
  return sprity.src({
    src      : basePath + '/icons/*.png',
    name     : 'gm-bootstrap-icons',
    style    : './gm-bootstrap-sprites.less',
    cssPath  : '../images',
    processor: 'less'
  })
    .pipe(gulpif('*.png', gulp.dest(basePath), gulp.dest(basePath)))
    .on('end', function() {
      gulp.src(basePath + '/*.png')
        .pipe(gulp.dest(paths.dist + '/assets/images/'));
    });

  // app icon style
});

// 将assets资源移到dist目录
gulp.task('move-assets', function() {
  gulp.src([paths.srcRoot + '/assets/!(less)/**', paths.jsComponent + '/*/assets/!(less|partials)/**'])
    .pipe(gulp.dest(paths.dist + '/assets/'));
  gulp.src([paths.srcRoot + '/assets/less/gm-bootstrap-enhance/*.png'])
    .pipe(gulp.dest(paths.dist + '/assets/images/'));
});

// 将依赖库依赖的相关资源移到dist目录
gulp.task('move-js-lib-assets', function() {
  var assets = [
    paths.jsLib + '/plupload-angular-directive/dist/plupload.flash.swf',
    paths.jsLib + '/plupload-angular-directive/dist/plupload.silverlight.xap'
  ];

  gulp.src(assets)
    .pipe(gulp.dest(paths.dist + '/js/'));
});

// 生成非开发过程的依赖库
gulp.task('gen-js-lib', ['move-js-lib-assets'], function() {
  var jsLib = getJSLibList(false);

  gulp.src(jsLib.commonLibs)
    .pipe(concat('lib.min.js'))
    .pipe(gulp.dest(paths.dist + '/js/'));

  gulp.src(jsLib.ieLibs)
    .pipe(concat('ie.lib.min.js'))
    .pipe(gulp.dest(paths.dist + '/js/'));

  gulp.src(jsLib.commonLibsJsMap)
    .pipe(gulp.dest(paths.dist + '/js/'));

  gulp.src(jsLib.ieLibsJsMap)
    .pipe(gulp.dest(paths.dist + '/js/'));
});

// 生成开发过程的依赖库
gulp.task('gen-js-lib-dev', ['move-js-lib-assets'], function() {
  var jsLib = getJSLibList(true);

  gulp.src(jsLib.commonLibs)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(paths.dist + '/js/'));

  gulp.src(jsLib.ieLibs)
    .pipe(concat('ie.lib.js'))
    .pipe(gulp.dest(paths.dist + '/js/'));
});

// 生成app相关js
gulp.task('gen-js-app', function() {
  var jsFiles = [paths.srcRoot + '/*.js', paths.srcRoot + '/directives/*.js', paths.srcRoot + '/services/*.js'];

  gulp.src(jsFiles)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.dist + '/js/'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(paths.dist + '/js/'))
    .pipe(connect.reload());

  gulp.src(paths.srcRoot + '/index.html')
    .pipe(gulp.dest(paths.dist));
});

// 生成业务功能模块js
gulp.task('gen-js-components', function() {
  var rootDir = path.resolve(paths.jsComponent);
  var dirs = fs.readdirSync(rootDir);
  _.each(dirs, function(dirName) {
    if (dirName[0] != '.' && dirName.indexOf(".") == -1) {
      var componentPath = rootDir + '/' + dirName;
      var files = fs.readdirSync(componentPath);
      var fileName = _.find(files, function(fileName) {
        return fileName.indexOf(".js") >= 0;
      });
      if (fileName) {
        var moduleName = fileName.replace('.js', '');
        genComponentJs(dirName, moduleName);
      }
    }
  });

});

// 清理dist目录的内容
gulp.task('clean', function(cb) {
  del(paths.dist + '/*', cb);
});

// 监控js的更改，实时合成需要的js文件
gulp.task('watch-js', function() {

  gulp.watch([paths.srcRoot + '/!(lib|assets|components)/**/*.@(js|html)', paths.srcRoot + '/*.@(js|html)'], ['gen-js-app']);

  // 各个模块分别监控
  var rootDir = path.resolve(paths.jsComponent);
  var dirs = fs.readdirSync(rootDir);
  _.each(dirs, function(dirName) {
    if (dirName[0] != '.' && dirName.indexOf(".") == -1) {
      var componentPath = rootDir + '/' + dirName;
      var files = fs.readdirSync(componentPath);
      var fileName = _.find(files, function(fileName) {
        return fileName.indexOf(".js") >= 0;
      });
      if (fileName) {
        var moduleName = fileName.replace('.js', '');
        gulp.watch(componentPath + '/**/*.@(js|html)', function() {
          genComponentJs(dirName, moduleName);
        })
      }
    }
  });
});

// 监控less的更改，实时生成css文件
gulp.task('watch-less', function() {
  gulp.watch(paths.less, ['less']);
});

gulp.task('watch', ['watch-js', 'watch-less']);

// 开发前的准备工作
gulp.task('pre-dev', ['less', 'gen-js-lib-dev', 'gen-js-app', 'gen-js-components', 'move-assets']);

// 开发调试中用到的http服务器
gulp.task('server', function() {
  connect.server({
    root      : 'dist/',
    //https: true,
    port      : 8080,
    livereload: true,
    middleware: function(connect, o) {
      var url = require('url');
      var proxy = require('proxy-middleware');
      return [];
    }
  });
});

// 版本发布
gulp.task('deploy', ['pre-dev', 'gen-js-lib'], function() {

  var md5Retult = {};
  glob(paths.dist + '/**/*.min.@(js|css)', function(err, files) {

    // 为js和css文件生成md5
    _.each(files, function(file) {
      var md5Code = md5(fs.readFileSync(file));
      md5Retult[file.replace(paths.dist + '/', '')] = 'version' + md5Code.substr(0, 6);
    });

    // 替换index.html的内容
    var stream = gulp.src(paths.srcRoot + '/index.html').pipe(processhtml());
    _.each(md5Retult, function(version, url) {
      stream = stream.pipe(replace(url, '/' + version + '/' + url));
    });
    stream.pipe(gulp.dest(paths.dist));
  });
});

// 开发
gulp.task('develop', ['server', 'watch']);




