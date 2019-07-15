import Vue from 'vue'
import '@/plugins/axios'
import App from '@/App.vue'
import router from '@/router/router'
import store from '@/store/store'
import '@/plugins/element.js'
import i18n from '@/i18n/i18n'
import '@/assets/css/normalize.css'
import '@/assets/css/public.css'
import { messages } from '@/assets/js/common'
// 引入字体文件
import '@/assets/icon/iconfont.css'
import mock from '@/mock/mock'

Vue.config.productionTip = false
//全局挂载提示框
Vue.prototype.$msg = messages

new Vue({
  router,
  store,
  i18n,
  mock,
  render: h => h(App)
}).$mount('#app')
