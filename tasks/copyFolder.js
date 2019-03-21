// 拷贝文件

var fs = require('fs');

/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */

function copyFolder(src,dst){
	if (!fs.existsSync(dst)) {
    	fs.mkdirSync(dst);
  	}	
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }

        paths.forEach(function( path ){
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;       

            fs.stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }

                if( st.isFile() ){
                    readable = fs.createReadStream( _src );
                    writable = fs.createWriteStream( _dst );  
                    readable.pipe( writable );
                }
                else if( st.isDirectory() ){
                    exists( _src, _dst, copyFolder );
                }
            });
        });
    });
};

function exists( src, dst, callback ){
    fs.exists( dst, function( exists ){
        if( exists ){
            callback( src, dst );
        }
        else{
            fs.mkdir( dst, function(){
                callback( src, dst );
            });
        }
    });
};

module.exports = copyFolder;