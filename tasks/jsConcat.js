// watch 任务
var gulp = require('gulp');
var uglify      = require('gulp-uglify');
var rename    = require('gulp-rename');
var gutil       = require('gulp-util');
var jsConcat = require('gulp-concat');

module.exports = function(paths, browserSync) {
  	gulp.src([paths.dev.js+'*.js','!'+paths.dev.js+'../**/*.min.js'])
        .pipe(uglify({
    		output:{ascii_only:true},
    		compress:{drop_console:true}
  		}))
		.pipe(jsConcat('main.js'))
        .pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.dev.js))
		.on('end', function(e) {
      		if (!e) {
        		e = 'javascript文件合并成功';
      		}
      		gutil.log(gutil.colors.magenta(e));
      		browserSync.reload();
		}
	);
};
