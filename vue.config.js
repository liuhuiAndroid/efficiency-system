module.exports = {
  devServer: {
    overlay: {   //去除eslint报警告
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
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/simpleWeather': ''
        }
      }

    }
  }
}
