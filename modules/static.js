/**
 * Module dependencies.
 */
var statics = require('koa-static-cache');   //npm包在windows上有问题，需要到github上拿最新的文件

// setup views mapping .html
// to the handlebars template engine

function setStatic(stat, app){
    console.log('静态资源配置');
    console.log('==============='+__filename+' setStatic');
    console.log('-');
    console.log('-');
    console.log('-');

    app.use(statics(fkpConfig.upload, {
        dynamic: true
    }))

    app.use(statics(fkpConfig.static.doc, {
        dynamic: true,
        prefix: '/docs'
    }))

    if(stat && stat==='dev'){
        app.use(statics(fkpConfig.static.dev.dft,{
            dynamic: true,
            buffer: false,
            gzip: true
        }));
    }else{
        app.use( statics(fkpConfig.static.dft,{
            dynamic: true,
            buffer: true,
            gzip: true
        }));
    }
}

module.exports = setStatic
