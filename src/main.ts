import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import animated from 'animate.css'
import { ElButton, ElInput, ElSpace, ElForm, ElFormItem } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
import axios from 'axios'

axios.defaults.baseURL = 'http://api.vikingship.xyz/api'
// Add a request interceptor
axios.interceptors.request.use(config => {
  // config.params = { ...config.params, icode: 'aaa' }
  store.commit('setLoading', false)
  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(animated)

// element-plus 国际化
locale.use(lang)
// element-plus 按需引入
app.component(ElButton.name, ElButton)
app.component(ElInput.name, ElInput)
app.component(ElSpace.name, ElSpace)
app.component(ElForm.name, ElForm)
app.component(ElFormItem.name, ElFormItem)
// element-plus 全局配置
app.config.globalProperties.$ELEMENT = { size: 'medium', zIndex: 2000 }
app.use(ElButton)

app.mount('#app')
// console.log('store', store.state.count)
// store.commit('add')
// store.commit('add')
// console.log('store', store.state.count)

async function hello() {
  const greeting = await Promise.resolve('Hello')
  return greeting
}
hello().then(value => console.log(value))
