'use strict';

var gulp = require('gulp');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var browserSync = require('browser-sync').create();
var taskObj = require('require-dir')('../../tasks');
var pkg = require('../../package.json');
var author = ['/*!',
    ' * copyright (c) 2014-2015, <%= pkg.name %> v<%= pkg.version %>',
    ' * description: <%= pkg.description %>',
    ' * build time: <%= new Date() %>',
    ' */',
    ''].join('\n');

//配置路径
var paths = {
	dev:{
		html:'_dev/',
		sass:'_dev/sass/',
		css:'_dev/css/',
		img:'_dev/img/',
		minimg:'_dev/img_min/',
		js:'_dev/js/'
	},
	bulid:{
		css:'_dev/css/',
		img	:'_dev/img/',
		js:'_dev/js/'
	},
    source: './_dev'
}



/*sass编译*/
gulp.task('sassCompile', function () {
	 taskObj.sassCompile(paths,browserSync);
});

/*实时监控*/
gulp.task('watch',function(){
	 taskObj.watch(paths,browserSync);
})

/*js压缩*/
gulp.task('jsCompress',function(){
	 taskObj.jsCompress(paths,browserSync);
})

/*图片.jpg,.jepg,.png压缩*/
gulp.task('imgCompress',function(){
	 taskObj.imgCompress(paths,browserSync);
})

/*js合并*/
gulp.task('jsConcat',function(){
	 taskObj.jsConcat(paths,browserSync);
})

// 清除构建任务
gulp.task('clean', function(cb) {
  return del(['./_release', './_source'], cb);
});

/*发布并备份相应版本*/
gulp.task('releaseAndBackup',function(){
	 taskObj.releaseAndBackup(paths,browserSync);
});


/*task任务名称说明*/
gulp.task('help',function(){
	 taskObj.help();
})





