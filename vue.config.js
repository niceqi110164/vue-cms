const path = require('path')

function resolve(dir) {
   return path.join(__dirname, './', dir)
}
module.exports = {
   //基本路径
   baseUrl: '/',
   //输出文件目录
   ///outputDir: 'dist',
   //eslint-loader是否保存的时候检查
   lintOnSave: true,

   // alias 配置
   chainWebpack: config => {
      //svg ruke loader
      const svgRule = config.module.rule('svg') //找到svg-loader
      // 清除已有的所有 loader。
      // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
      svgRule.uses.clear()
      svgRule.exclude.add(/node_modules/) //正则匹配派出node_modules目录

      svgRule // 添加svg新的loader处理
         .test(/\.svg$/)
         .use('svg-sprite-loader')
         .loader('svg-sprite-loader')
         .options({
            symbolId: 'icon-[name]'
         })
      //修改 images loader 添加svg处理
      const imagesRule = config.module.rule('images')
      imagesRule.exclude.add(resolve('src/icons'))
      config.module
         .rule('images')
         .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
   },


   //transpileDependencies: '',
   /** 
   该配置项用于设置是否为生产环境构建生成 source map,
   一般在生产环境下为了快速定位错误信息,我们都会开启source map
   
   productionSourceMap: true,*/
   /** 
   允许我们更细粒度的控制webpack的内容配置,其集成的是webpack-chain这一插件,
   该插件可以让我们能够使用链式操作来修改配置
   
   chainWebpack: '',*/

   //configureWebpack: '',
   //css: '',
   //parallel: '',
   //pwa: '',
   /**/
   devServer: {
      //open: true, // 是否自动打开浏览器页面
      host: '127.0.0.1', // 指定使用一个 host。默认是 localhost
      port: 8080, // 端口地址
      // https: false, // 使用https提供服务
      // proxy: null, // string | Object 代理设置

      // // 提供在服务器内部的其他中间件之前执行自定义中间件的能力
      // before: app => {
      //    // `app` 是一个 express 实例
      // }
   }
   /** 第三方插件配置
   pluginOptions:{

   }*/
}