module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'zh',
      fallbackLocale: 'zh',
      localeDir: 'i18n/locales',
      enableInSFC: true
    },
    mock: {
      // mock配置文件路径，默认为 'mock.js'
      // Configuration file source, default is 'mock.js'
      entry: 'mock/mock.js',  
      // 开关，默认为 true
      // switch, default is true
      power: true         
  }
  },
  //定义scss全局变量
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/global.scss";`
      }
    }
  }
}
