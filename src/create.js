/**
 * Created by LiaoHaoCheng on 19/06/17.
 */

const fs = require('fs-extra');
const chalk = require('chalk');
var ProgressBar = require('./initProgress.js');

exports.run = function(projectName) {
    fs.pathExists(projectName, (err, exists) => {
        if (exists) {
            console.log(
                chalk.bgRed(`当前项目已存在！`)
              );
        } else {
            const pageFile = './' + projectName ;
            fs.copy('/usr/local/lib/node_modules/yiru-cli/src/template/basic_create_react_app_template/project', pageFile, err => {
                if (err) return console.error(err);
                ProgressBar()
            });
        }
    });
};



