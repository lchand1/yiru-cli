/**
 * Created by Allen on 17/10/11.
 */
const fs = require('fs-extra');
const _fs = require('fs');
const chalk = require('chalk');
const log = console.log;
const path = require('path');


// 创建page.tsx
const PageMain = (name,Upname)=>{
    return `import React from 'react';
import css from './${name}.module.scss';
import { ${Upname}Interface } from './${name}.interface';
import { ${Upname}Basic } from './${name}.module';

    class ${Upname} extends ${Upname}Basic implements ${Upname}Interface {
    
    public render() {
    return (
        <div className={css.container}>
        ${Upname}
        </div>
    );
    }
}
export default ${Upname}`
};
// 创建page.ts
const PageInterface = (Upname)=>{
    return `export interface ${Upname}Interface extends InitFace{

    state:object
    
}
/**
 * basic interface
 */
interface InitFace {
        render():void
        componentDidMount():void
    
}`
};
// 创建module.ts
const PageModule = (Upname)=>{
    return `import { Component } from 'react';

interface IsProps {
}
interface IsState {
}
export class ${Upname}Basic extends Component<IsProps,IsState>{

    state: IsState = {
    }

    public componentDidMount(){
    
    }
    
    
}`
};
const PageScss = ()=>{
    return `.container{
    
}`
};
// component main
const ComponentMain=(name,NewName)=>{
    return `import React from "react";
import css from "./${name}.module.scss";
import { ${NewName}CompInterface } from "./${name}.interface";
import { ${NewName}Basic } from "./${name}.module";


export class ${NewName} extends ${NewName}Basic implements  ${NewName}CompInterface{

public render() {
    return (
        <div className={css.container}>
        </div>
    );
}

}
`
}

// component module
const ComponentModule=(NewName,type)=>{
    const Cpm = type=='p'?"PureComponent":"Component"
    return `import { ${Cpm} } from "react";

interface IsProps {
}
interface IsState {
}
export class ${NewName}Basic extends ${Cpm}<Readonly<IsProps>,Readonly<IsState>>{

    readonly state:IsState={}
    public static defaultProps:  Partial<object> = {}
    public componentDidMount(){}
}`
}
// component interface
const ComponentInterface=(NewName)=>{
    return `/**
* ${NewName}组件抽象类
*/
export interface ${NewName}CompInterface{
    readonly state:object
    render():void,
    componentDidMount():void
}`
}
// component static
const ComponentStatic=(name,NewName)=>{
    return `import React from "react";
import css from "./${name}.module.scss";

type Props = {
};

export const ${NewName}: React.SFC<Props> = (Props) => {
    return (
    <div className={css.container}>
    </div>
    );
}
`
}
const getSize=(url)=>{
    const states = _fs.statSync(`./${url}`)
    return `(${states.size} bytes)`
}
/**
 * 创建组件
 * @param {string} componentName 组件名称
 * @param {boolean} hasFolder 是否含有文件夹
 * @param {boolean} isStateless 是否是无状态组件
 * @param {boolean} isPureComponent 是否是纯组件
 */
exports.run = function(type, name, pureComponent, stateless) {
    fs.pathExists('src', (err, exists) => {
        if (!exists) {
            console.log('路径错误');
        } else {
            const First = name.slice(0, 1).toUpperCase()
            const second = name.slice(1)
            const NewName = `${First}${second}`
            switch (type) {
                case 'page':
                    const basicUrl = `src/pages/${name}/${name}`
                    const pageFile = `${basicUrl}.page.tsx`;
                    const pageInterface = `${basicUrl}.interface.ts`;
                    const pageModule = `${basicUrl}.module.ts`;
                    const styleFile = `${basicUrl}.module.scss`;
                    
                    fs.pathExists(`./src/pages/${name}`, (err, exists) => {
                        let dirPath = path.join(process.cwd());
                        if (exists) {
                            log(chalk.yellow(`ERROR! ${pageFile} already exists.`));
                            log(chalk.yellow(`ERROR! ${pageInterface} already exists.`));
                            log(chalk.yellow(`ERROR! ${pageModule} already exists.`));
                            log(chalk.yellow(`ERROR! ${styleFile} already exists.`));
                            log(chalk.red(`The Schematic workflow failed. See above.`));
                            log(`[${chalk.red('ERROR')}] Could not generate ${chalk.green('page')}.`)
                        } else {
                            const title = `ag generate page ${name}`
                            log(`> ${chalk.green(title)}`);
                            const result = fs.ensureDirSync('src/pages/' + name);
                            // console.log(path.join(dirPath, pageFile))

                            // page.tsx
                            fs.writeFileSync(pageFile, PageMain(name,NewName));
                            // pageInterface
                            fs.writeFileSync(pageInterface, PageInterface(NewName));
                            // pageModule
                            fs.writeFileSync(pageModule, PageModule(NewName));
                            // page.scss
                            fs.writeFileSync(styleFile, PageScss());
                            // Router init
                            const handleRouter = require('./handleRouter.js');
                            handleRouter.getFileList()
                            // done
                            setTimeout(function(){
                                log(`${chalk.green('CREATE')} ${pageFile} ${getSize(pageFile)}`);
                                log(`${chalk.green('CREATE')} ${pageInterface} ${getSize(pageInterface)}`);
                                log(`${chalk.green('CREATE')} ${pageModule} ${getSize(pageModule)}`);
                                log(`${chalk.green('CREATE')} ${styleFile} ${getSize(styleFile)}`);
                                log(`[${chalk.green('OK')}] Generated ${chalk.green('page')}!`)
                            },2000)
                        }
                    });
                    
                    break;
                case 'component':
                    const basicUrlCmp = `src/components/${name}/${name}`
                    const componentFile = `${basicUrlCmp}.tsx`;
                    const cssFile = `${basicUrlCmp}.module.scss`;
                    const componentInterface = `${basicUrlCmp}.interface.ts`;;
                    const componentModule = `${basicUrlCmp}.module.ts`;;
                    fs.pathExists(`./src/components/${name}`, (err, exists) => {
                        if (exists) {
                            log(chalk.yellow(`ERROR! ${componentFile} already exists.`));
                            log(chalk.yellow(`ERROR! ${cssFile} already exists.`));
                            pureComponent||!stateless?log(chalk.yellow(`ERROR! ${componentInterface} already exists.`)):'';
                            pureComponent||!stateless?log(chalk.yellow(`ERROR! ${componentModule} already exists.`)):'';
                            log(chalk.red(`The Schematic workflow failed. See above.`));
                            log(`[${chalk.red('ERROR')}] Could not generate ${chalk.green('component')}.`)
                        } else {
                            const result = fs.ensureDirSync('src/components/' + name);
                            if(pureComponent||!stateless){
                                const title = `ag generate component ${name}`
                                log(`> ${chalk.green(title)}`);
                                let typeCmp = 'p'
                                typeCmp = stateless?'s':pureComponent?'p':'c'
                                fs.writeFileSync(componentFile, ComponentMain(name,NewName));
                                fs.writeFileSync(componentInterface, ComponentInterface(NewName));
                                fs.writeFileSync(componentModule, ComponentModule(NewName,typeCmp));
                                fs.writeFileSync(cssFile, `.container{\n\n}`);
                                setTimeout(function(){
                                    log(`${chalk.green('CREATE')} ${componentFile} ${getSize(componentFile)}`);
                                    log(`${chalk.green('CREATE')} ${componentInterface} ${getSize(componentInterface)}`);
                                    log(`${chalk.green('CREATE')} ${componentModule} ${getSize(componentModule)}`);
                                    log(`${chalk.green('CREATE')} ${cssFile} ${getSize(cssFile)}`);
                                    // over
                                    log(`[${chalk.green('OK')}] Generated ${chalk.green('component')}!`)
                                },2000)
                                
                                
                            } else {
                                const title = `ag generate component ${name}`
                                log(`> ${chalk.green(title)}`);
                                fs.writeFileSync(componentFile, ComponentStatic(name,NewName));
                                fs.writeFileSync(cssFile, `.container{}`);
                                
                                setTimeout(function(){
                                    log(`${chalk.green('CREATE')} ${componentFile} ${getSize(componentFile)}`);
                                    log(`${chalk.green('CREATE')} ${cssFile} ${getSize(cssFile)}`);
                                    log(`[${chalk.green('OK')}] Generated ${chalk.green('component')}!`)
                                    

                                },2000)
                                
                            }
                        }
                    });
                    break;
                default:
                    console.log(chalk.yellow(`ERROR: uncaught type , you should input like $ ag g page demo` ))
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



