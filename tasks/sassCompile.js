
//sass 编译
var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var cdnImporter = require('@node-sass/cdn-importer');
var rename  = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var fs          = require('fs');

var autoprefixer = require('gulp-autoprefixer');


var size = require('gulp-size');

var sourcemaps = require('gulp-sourcemaps');

var header = require('gulp-header');

var gutil = require('gulp-util');

var notify = require("gulp-notify");



var pkg = require('../package.json');
var author = ['/*!',
    ' * copyright (c) 2014-2015, <%= pkg.name %> v<%= pkg.version %>',
    ' * description: <%= pkg.description %>',
    ' * build time: <%= new Date() %>',
    ' */',
    ''].join('\n');



module.exports = function(paths,browserSync){
	
	if (fs.existsSync(paths.dev.sass+'font/')){
		gulp.src([paths.dev.sass+'font/*.{eot,svg,ttf,woff}'])
		.pipe(gulp.dest(paths.dev.html+'font/'))
	};
	
	//gulp.src(paths.dev.sass+'app/'+".\\**\\*"+'*.scss')
	// gulp.src(paths.dev.sass+'app/*.scss')
	gulp.src(path.format({
        dir:paths.dev.sass+'app/**/',
        base:'*.scss'
    }))
	// gulp.src(paths.dev.sass+'app\\**\\*'+'*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass({outputStyle:'compressed',importer: [cdnImporter]}))
	.on("error", notify.onError("Error: <%= error.message %>"))
    .pipe(autoprefixer({
    	browsers:['ios>=8','android>=4.0']
    }))
	.pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.dev.css))
    .pipe(browserSync.stream())
    //.pipe(browserSync.reload({stream:true}))
    .on('end',function(){
    	gutil.log(gutil.colors.magenta('sass compile ok!'))
    });
	
}