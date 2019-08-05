var glob = require("glob")
const path = require('path')
const fs = require('fs')
// options 是可选的

getFileList = async () => {
    let Newfiles = []
    await glob("src/**/**.tsx", (er, files) => {
        Newfiles = files.filter(item => item.indexOf('/pages') !== -1)
        // console.log(Newfiles)
        creatRouter(Newfiles, path.resolve(process.cwd(), './src'), '')
    })
}
creatRouter = (files, srcDir, pagesDir) => {
    let parent = []
    files.forEach((file) => {
        const keys = file
            .replace(RegExp(`^${pagesDir}`), '')
            .replace(/\.(tsx|js)$/, '')
            .replace(/\/{2,}/g, '/')
            .split('/')
            .slice(1)
        const route = {
            name: keys[1],
            url: `/${keys[1].replace('_',"/")}`,
            component: `component: loadable(() => import('../${keys.join('/')}'))`
        }

        parent.push(route)

    })

    fs.writeFile(path.resolve(process.cwd(), './src/router/Routers.js'), getContent(parent), (file) => {
        //   console.log('\n╭(￣▽￣)╯╭(￣▽￣)╯')
        // console.log('router文件写入完毕')
    })

}
getContent = (Array) => {
    const oldArray = `import loadable from '../static/scripts/loadable';\nconst List = [
        ${Array.map(item=>{
            const url = item.url==='/home'?'/':item.url
            return (`
        {
            url:'${url}',
            ${item.component}
        }
            `)
        })}
            ];\nexport default List`
    return oldArray
}

exports.getFileList =  getFileList