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
      '/api': {
        target: 'http://www.tianqiapi.com/api/',
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }

    }
  }
}
