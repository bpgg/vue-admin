const path = require("path");
module.exports = {
  // publicPath:process.env.NODE_ENV === 'production' ? '/vue_workspac/aihuhuproject/' : '/',

  //基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/', //默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
  assetsDir: "static",
  indexPath: "index.html",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
    } else {
      // 为开发环境修改配置...
      config.mode = "development";
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".json", ".vue"],
        alias: {
          "@": path.resolve(__dirname, "./src"),
          "@c": path.resolve(__dirname, "./src/components"),
          "@v": path.resolve(__dirname, "./src/views")
        } // 别名配置
      }
    });
  },
  // css相关配置
  css: {
    loaderOptions: {
      // css: {
      //   // 这里的选项会传递给 css-loader
      // },
      // postcss: {
      //   // 这里的选项会传递给 postcss-loader
      // },
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v7 中，这个选项名是 "data"
        // 分号是必须加的，不然会出现错误
        // Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
        //ModuleBuildError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):
        prependData: `@import "~@/styles/main.scss";`
        // data: `@import "@/styles/main.scss";`
      }
    },
    requireModuleExtension: true,
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false
  },
  // webpack-dev-server 相关配置
  devServer: {
    open: false, //open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
    host: "0.0.0.0", //默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
    port: 8080,
    hot: true, //hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
    https: false,
    hotOnly: false, // hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
    proxy: {
      "/devApi": {
        target: "http://www.web-jshtml.cn/productapi", //目标接口域名
        secure: false, //false为http访问，true为https访问
        changeOrigin: true, //是否跨域
        pathRewrite: {
          // "^/": "/" //重写接口
          "^/devApi": "" //重写接口
        }
      }
    }, // 设置代理
    before: app => {
      console.log(app);
    }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};
