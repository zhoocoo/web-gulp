# gulp前端自动化工具



## 安装node
* `https://nodejs.org/en/download/` 安装相应系统的node

## 全局安装gulp
* `npm install gulp -g` 全局安装gulp

## 本地安装gulp插件
* `npm install` 安装package.json里依赖的模块

## 运行gulp命令
* 进入到`src`下，新建项目(如`project_2`)，目录如下（仅需建立`_dev`）
  * ```
    ├──项目名称
    │   ├── _dev
    │   │   ├── css
    │   │   ├── img
    │   │   ├── js
    │   │   ├── sass
    │   │   │    ├─ app
    │   │   │    ├─ font
    │   │   │    └─ module
    │   │   └── xx.html
    │   ├── _release(生成的)
    │   │   ├── v1.0.0
    │   │   ├── v1.0.1
    │   │   ├── v1.0.2
    │   │   └── ......
    │   ├── _source（生成的）
    │   │   ├── v1.0.0
    │   │   ├── v1.0.1
    │   │   ├── v1.0.2
    │   │   └── ......
    │   ├── node_modules(生成的)
    │   │    └── .......
    │   ├── tasks
    │   │   ├── sassCompress.js
    │   │   ├── imgCompress.js
    │   │   ├── jsCompress.js
    │   │   ├── jsConcat.js
    │   │   ├── releaseAndBackup.js
    │   │   └── .......
    │   │ 
    │  gulpfile.js
    │   │ 
    └── package.json  
    ```
* `cd project_2/`进入新建项目内
* `gulp help` 运行gulpfile.js里定义的相应命令，执行相应操作


## 常用任务
1. gulp sassCompile --- 编译sass
2. gulp imgCompress --- 图片压缩
3. gulp jsCompress  --- js压缩
4. gulp jsConcat    --- js合并
5. gulp watch       --- 监听html/js/css的变化
6. gulp releaseAndBackup --- 发布并备份
7. gulp clean 清除发布和备份的文件

## 使用cdn地址的sass路径

请查阅使用[教程](https://www.npmjs.com/package/@node-sass/cdn-importer)














