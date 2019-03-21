// 图片压缩
var gulp        = require('gulp');
var tinypng     = require('gulp-tinypng');
var size        = require('gulp-size');
var del         = require('del');

var tinypngAPI = '1Juah_GVpJhmhHQDBHnc-8Sz4W4f2Nv6';
//'HUf0oMi1kITV1EStUI5-aGFzeH91IINB';
//'9UZ5Ft49BVtY6ilBqdplbp5_-P_dC910'
// 'HUf0oMi1kITV1EStUI5-aGFzeH91IINB'
// '1Juah_GVpJhmhHQDBHnc-8Sz4W4f2Nv6'

module.exports = function(paths, browserSync) {
  del.sync(paths.dev.minimg + '*');
  
  return gulp.src(paths.dev.img + '**/*.{jpg,jepg,png}')
    .pipe(size({title: 'images 压缩前'}))
    .pipe(tinypng(tinypngAPI))
    .pipe(gulp.dest(paths.dev.minimg))
    .pipe(size({title: 'images 压缩后'}));
};
