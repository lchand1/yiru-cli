/**
 * Created by LiaoHaoCheng on 19/06/17.
 */

const fs = require('fs-extra');
const chalk = require('chalk');
var ProgressBar = require('./initProgress.js');
const { execSync } = require('child_process');

exports.run = function(projectName) {
    fs.pathExists(projectName, (err, exists) => {
        if (exists) {
            console.log(
                chalk.bgRed(`当前项目已存在！`)
              );
        } else {
            const pageFile = './' + projectName ;
            const result = fs.ensureDirSync("./.gitignore");
            fs.writeFileSync('./.gitignore', `# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

      # dependencies
      /node_modules
      /.pnp
      .pnp.js
      
      # testing
      /coverage
      
      # production
      /build
      
      # misc
      .DS_Store
      .env.local
      .env.development.local
      .env.test.local
      .env.production.local
      
      npm-debug.log*
      yarn-debug.log*
      yarn-error.log*
      `);
            fs.copy('/usr/local/lib/node_modules/yiru-cli/src/template/basic_create_react_app_template/project', pageFile, err => {
                if (err) return console.error(err);
                ProgressBar()
            });
        }
    });
};



