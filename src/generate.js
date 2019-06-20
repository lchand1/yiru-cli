/**
 * Created by xushaoping on 17/10/11.
 */
const fs = require('fs-extra');
const chalk = require('chalk');
const log = console.log;
const path = require('path');

const PageMain = (name)=>{
    return `import React, { PureComponent } from "react";
import css from './index.module.scss'

interface IsProps {
}
interface IsState {
}
class ${name} extends PureComponent<IsProps, IsState> {
state: IsState = {}
public render() {
    return (
    <>
        <div className={css.${name}_container}>
        
        </div>
    </>
    );
}
}
export default ${name}
`
};
const PageScss = (name)=>{
    return `.${name}_container{
    
}`
};
/**
 * 创建组件
 * @param {string} componentName 组件名称
 * @param {boolean} hasFolder 是否含有文件夹
 * @param {boolean} isStateless 是否是无状态组件
 * @param {boolean} isPureComponent 是否是纯组件
 */
exports.run = function(type, name, pureComponent, stateless) {
    fs.pathExists('./src', (err, exists) => {
        if (!exists) {
            console.log('路径错误');
        } else {
            const First = name.slice(0, 1).toUpperCase()
            const second = name.slice(1)
            const NewName = `${First}${second}`
            switch (type) {
                case 'page':
                    const pageFile = './src/pages/' + name + '/index.tsx';
                    const styleFile = './src/pages/' + name + '/index.module.scss';
                    
                    fs.pathExists(pageFile, (err, exists) => {
                        let dirPath = path.join(process.cwd());
                        if (exists) {
                            log()
                            log(
                                chalk.red(`        Error: ./src/pages/${name} already exists`)
                              );
                              log()
                        } else {
                            const result = fs.ensureDirSync('src/pages/' + name);
                            // console.log(path.join(dirPath, pageFile))
                            fs.writeFileSync(pageFile, PageMain(NewName));
                            log()
                            log(
                                chalk.green(`        .src/pages/${name}/index.tsx created successfully`)
                              );
                            fs.writeFileSync(styleFile, PageScss(NewName));
                            log(
                                chalk.green(`        .src/pages/${name}/index.module.scss created successfully`)
                              );
                              log()
                        }
                    });
                    
                    break;
                case 'component':
                    const componentFile = './src/components/' + NewName + '/index.tsx';
                    const cssFile = './src/components/' + NewName + '/index.module.scss';
                    fs.pathExists(componentFile, (err, exists) => {
                        if (exists) {
                            log()
                            log(
                                chalk.red(`        Error: ./src/components/${NewName} already exists`)
                              );
                            log()
                        } else {
                            const result = fs.ensureDirSync('src/components/' + NewName);
                            if(pureComponent){
                                fs.writeFileSync(componentFile, `import React, { PureComponent } from "react";
import css from "./index.module.scss"

interface IProps {}
interface IState {}

class ${NewName} extends PureComponent<IProps, IState> {
state: IState = {
};
public static defaultProps: Partial<IProps> = {}
public render() {
    return (
        <div className={css.${NewName}_container}></div>
    );
}

}

export default ${NewName}`);
                                log()
                                log(
                                    chalk.green(`       ./src/components/${NewName}.tsx file created successfully`)
                                );
                                fs.writeFileSync(cssFile, `
                                .${NewName}_container{
                                }`);
                                log(
                                    chalk.green(`       ./src/components/${NewName}.module.scss file created successfully`)
                                  );
                                log()
                            }else if(stateless){
                                fs.writeFileSync(componentFile, `import React, { SFC } from "react";
import css from "./index.module.scss"

type Props = {
};

const ${NewName}: SFC<Props> = (Props) => {
    return (
    <div className={css.${NewName}_container}>
    </div>
    );
}
export default ${NewName};

                                `);
                                log()
                                log(
                                    chalk.green(`       ./src/components/${NewName}.tsx file created successfully`)
                                  );
                                fs.writeFileSync(cssFile, `
                                .${NewName}_container{
                                }`);
                                log(
                                    chalk.green(`       ./src/components/${NewName}.module.scss file created successfully`)
                                  );
                                log()
                            }else{
                                fs.writeFileSync(componentFile, `
import React, { Component } from "react";
import css from "./index.module.scss"

interface IProps {}
interface IState {}

class ${NewName} extends Component<IProps, IState> {
state: IState = {
};
public static defaultProps: Partial<IProps> = {}
public render() {
return (
    <div className={css.${NewName}_container}></div>
);
}

}

export default ${NewName}`);
                                log()
                                log(
                                    chalk.green(`       ./src/components/${NewName}.tsx file created successfully`)
                                  );
                                fs.writeFileSync(cssFile, `.${NewName}_container{
}`);
                                log(
                                    chalk.green(`       ./src/components/${NewName}.module.scss file created successfully`)
                                  );
                                log()
                            }
                        }
                    });
                    break;
                default:
                    console.log(chalk.red(`ERROR: uncaught type , you should input like $ ag g page demo` ))
                    console.log()
                    console.log('  Examples:')
                    console.log()
                    console.log(chalk.gray('    # create a new page'))
                    console.log('    $ ag g page product')
                    console.log()
                    console.log(chalk.gray('    # create a new component'))
                    console.log('    $ ag g component  product')
                    console.log()
                    // console.log(chalk.gray('    # create a new store'))
                    // console.log('    $ ag g store  product')
                    console.log()
                    break;
            }
        }
    });
};



