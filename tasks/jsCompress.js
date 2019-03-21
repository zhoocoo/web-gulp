// browserify 编译
var gulp        = require('gulp');
var through2    = require('through2');
var rename    = require('gulp-rename');
var browserify  = require('browserify');
var size        = require('gulp-size');
var header      = require('gulp-header');
var gutil       = require('gulp-util');
var uglify      = require('gulp-uglify');
var pkg         = require('../package.json');
var fs          = require('fs');

var author = ['/*!',
    ' * copyright (c) 2014-2015, <%= pkg.name %> v<%= pkg.version %>',
    ' * description: <%= pkg.description %>',
    ' * build time: <%= new Date() %>',
    ' */',
    ''].join('\n');


module.exports = function(paths, browserSync) {
  var fileList = [];
  var path = paths.dev.js;
  var files = fs.readdirSync(path);
  files.forEach(function(item,index,array){
    if(/\.js$/.test(item) && item.indexOf('.min')===-1){
      fileList.push(path+item);
    }
  });
  return gulp.src(fileList)
    .pipe(through2.obj(function(file, enc, next) {
      browserify({
        entries: file.path,
        debug: false
      })
      .bundle(function(err, res) {
        if (err) {
          console.log(err);
        } else {
          file.contents = res;
          next(null, file);
        }
      })
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.message));
      });
    }))
  .pipe(uglify({
    output:{ascii_only:true},
    compress:{drop_console:true}
  }))
     .pipe(header(author, {pkg: pkg}))
    .pipe(size({title: 'js', gzip: true}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dev.js))
    .on('end', function(e) {
      if (!e) {
        e = 'javascript 压缩成功';
      }
      gutil.log(gutil.colors.magenta(e));
      browserSync.reload();
    });
};
