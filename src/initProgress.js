// 引入工具模块
var ProgressBar = require('./progress.js');
const chalk = require('chalk');
// 初始化一个进度条长度为 50 的 ProgressBar 实例
var pb = new ProgressBar('下载进度', 50);

// 这里只是一个 pb 的使用示例，不包含任何功能
var num = 0, total = 100;
function downloading() {
  if (num <= total) {
    // 更新进度条
    pb.render({ completed: num, total: total });

    num++;
    setTimeout(function (){
      downloading();
    }, 5)
  }else{
      console.log()
      console.log('####################################################')
      console.log();
      console.log('                        Result                      ');
      console.log();
      console.log(
        chalk.green(`        The project was created successfully      `)
      );
      console.log();
      console.log(
        chalk.green(`                    npm install                   `)
      );
      console.log();
      console.log(
        chalk.green(`            npm start & npm run build             `)
      );
      console.log();
      console.log();
      console.log();
      console.log('####################################################')
  }
}

module.exports = downloading;