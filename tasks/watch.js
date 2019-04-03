var gulp = require('gulp');
var path = require('path');
var portfinder = require('portfinder');
module.exports = function(paths, browserSync) {
  var config = {  //browserSync 配置参数
    server: {
      baseDir: "./"+paths.dev.html,                      
      directory: true                     
    },
    open: 'external',                       
    startPath: './',
    port: 3000,
    files: [path.resolve(paths.dev.sass + '../**/*.scss')]
  }
  portfinder.getPort({
    port:config.port,
    stopPort:5000
  },function(err,port){
    browserSync.init(config);
    gulp.watch(paths.dev.html + "*.{html,htm}", function() {
      browserSync.reload();
    });
    gulp.watch(path.resolve(paths.dev.sass + '../**/*.scss') , ['sassCompile']);
    gulp.watch([paths.dev.js + '../**/*.js','!'+paths.dev.js+'../**/*.min.js'],['jsCompress']);
  })
};
