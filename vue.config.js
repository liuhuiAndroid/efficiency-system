module.exports = {
  publicPath: "./",
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      },
    },
  },
  devServer: {
    overlay: { //去除eslint报警告
      warning: false,
      error: true
    },
    open: true,
    host: 'localhost',
    port: 8081,
    https: false,
    proxy: {
      '/simpleWeather': {
        target: 'http://apis.juhe.cn/simpleWeather/',
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/simpleWeather': ''
        }
      }
    }
  }
}
