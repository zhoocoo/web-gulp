var gulp = require('gulp');
var path = require('path');

var net = require('net')

// 检测端口是否被占用，如被占用，尾递归直到找到未被占用的端口
function portIsOccupied (port,cb) {
  // 创建服务并监听该端口
  var server = net.createServer().listen(port,'0.0.0.0')
    server.on('listening', function () { // 端口未被占用的情况
      server.close() // 关闭服务
      cb(port)
    })
  
    server.on('error', function (err) {
      if (err.code === 'EADDRINUSE') { // 端口已经被使用
        portIsOccupied(++port,cb)
      }
    })
}

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
 portIsOccupied(config.port,function(port){
    config.port = port
    browserSync.init(config);
    gulp.watch(paths.dev.html + "*.{html,htm}", function() {
      browserSync.reload();
    });
    gulp.watch(path.resolve(paths.dev.sass + '../**/*.scss') , ['sassCompile']);
    gulp.watch([paths.dev.js + '../**/*.js','!'+paths.dev.js+'../**/*.min.js'],['jsCompress']);
  })
};
