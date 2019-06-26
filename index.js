#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk')




/**
 * Usage.
 */

program
.command('generate')
.description('quick generate your file')
.alias('g')
.option(
    '-p, --pure',
    'Whether the component is a extend from PureComponent'
  )
.option(
    '-s, --stateless',
    'Whether the component is a extend from FunctionComponent'
  )
.action(function(type,name,cmd){
    // console.log(type)
    // console.log(name)
    // console.log(cmd.pure)
    // console.log(cmd.stateless)
    const generate = require('./src/generate.js');
    generate.run(type, name,cmd.pure,cmd.stateless);
});

program
.command('init <projectName>')
.description('create you project with basic template')
.action(function(projectName){
  const create = require('./src/create.js');
    // console.log(projectName)
    create.run(projectName);
});

program
.version('1.2.0', '-v, --version')

program.parse(process.argv);