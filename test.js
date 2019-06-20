#!/usr/bin/env node

const fs = require('fs-extra')
const program = require('commander');
const chalk = require('chalk');
const log = console.log;
const path = require('path');
const { spawn,execSync } = require('child_process');
var ProgressBar = require('./src/initProgress.js');
/**
 * Usage.
 */
var SEPARATOR = process.platform === 'win32' ? ';' : ':';
var env = Object.assign({}, process.env);

env.PATH = path.resolve('./node_modules/.bin') + SEPARATOR + env.PATH;

function myExecSync(cmd) {
  var output = execSync(cmd, {
    cwd: process.cwd(),
    env: env
  });

  console.log(output);
}



program
.command('init <projectName>')
.description('create you project with basic template')
.action(function(projectName){
    fs.pathExists(projectName, (err, exists) => {
        if (exists) {
            console.log(
                chalk.bgRed(`当前项目已存在！`)
              );
        } else {
            const File = './' + projectName 
            
            fs.copy('./src/template/basic_create_react_app_template/project', File, err => {
                if (err) return console.error(err)
                // myExecSync(`cd ${projectName} && npm i`);
                ProgressBar()
            })
        }
    })
});
program.parse(process.argv);


