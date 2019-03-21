// 移动文件
var gulp        = require('gulp');
var fs          = require('fs');
var del         = require('del');
var gutil       = require('gulp-util');
var task_imgCompress = require('./imgCompress');
var task_copyFolder = require('./copyFolder');

module.exports = function(paths, browserSync) {

  var verson;                 // 版本号字符串
  var dirList = [];           // 文件夹列表
  var path = './_release';       // 构建目录
  var sourcePath = './_source';// 构建目录
  var build,source;                  // 存储当前任务构建路径

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  if (!fs.existsSync(sourcePath)) {
    fs.mkdirSync(sourcePath);
  }
  if (global.buildVersion) {
    if (!/^\d+\.{1}\d+\.{1}\d+$/.test(global.buildVersion)) {
      gutil.log(gutil.colors.magenta('任务失败 请正确传入参数 例：1.0.1'));
      return;
    }
    build = './_release/v' + global.buildVersion;
    del.sync(build);            

  } else {
    var files = fs.readdirSync(path);

    files.forEach(function(item, index, array) {
      var childPath = path + '/' + item;
      var stat = fs.statSync(childPath);
      if (stat.isDirectory()) {
        dirList.push({path: childPath, btime: new Date(stat.birthtime).getTime()});
      }
    });
	
    dirList.sort(function(n1, n2) {
      return n1.btime - n2.btime;
    });

    if (dirList.length === 0) {
      verson = '1.0.0';
    } else {
      var verString = dirList[dirList.length - 1].path.replace(path + '/v', '');
      var verArr = verString.split('.');
      var lastVerNum = verArr[verArr.length - 1];
      verArr[verArr.length - 1] = parseInt(lastVerNum, 10) + 1;
      verson = verArr.join('.');
    }

    build = './_release/v' + verson;
	source = './_source/v' + verson;
  }




task_copyFolder(paths.source,sourcePath + '/v' + verson);




  var htmlStream = gulp.src(paths.dev.html+['./*.{html,htm}'])
    .pipe(gulp.dest(build));
  var cssStream = gulp.src(paths.dev.css + '**/*.css')
    .pipe(gulp.dest(build + '/css/'));
  var jsStream = gulp.src([paths.dev.js + '**/*.js'])
    .pipe(gulp.dest(build + '/js/'));
  var jsStream = gulp.src([paths.dev.html +'font/'+ '*'])
    .pipe(gulp.dest(build + '/font/'));

  var imgStream = null;
  if (fs.existsSync(paths.dev.minimg)) {
    gutil.log(gutil.colors.cyan('直接抽取本地压缩后图片'));
    imgStream = gulp.src(paths.dev.minimg + '**/*.{jpg,png,gif,webp,swf}')
      .pipe(gulp.dest(build + '/img/'))
      .on('end', function() {
        gutil.log(gutil.colors.cyan('发布并备份完成 目录：' + build + ' and ' +source));
      });
  } else {
    gutil.log(gutil.colors.magenta('开始压缩图片,请稍后...'));
    del.sync(paths.dev.minimg + '*');
    imgStream = task_imgCompress(paths, browserSync)
      .pipe(gulp.dest(build + '/img/'))
      .on('end', function() {
        gutil.log(gutil.colors.cyan('发布并备份完成 目录：' + build + ' and ' +source ));
      });
  }

};
