import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import animated from 'animate.css'
import { ElButton, ElInput, ElSpace, ElForm, ElFormItem, ElLoading, ElMessage, ElMessageBox, ElPagination, ElRow, ElCol, ElCard, ElContainer, ElHeader, ElAside, ElMain, ElFooter, ElImage, ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import lang from 'element-plus/lib/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale'
import axios from 'axios'
import 'normalize.css'
import './style/index.scss'

axios.defaults.baseURL = 'http://119.3.177.188:8080/api'
// Add a request interceptor
axios.interceptors.request.use(config => {
  // config.params = { ...config.params, icode: 'aaa' }
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})
axios.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
}, e => {
  // 统一错误处理
  const error = { status: false, message: e.response.data.msg }
  store.commit('setError', error)
  store.commit('setLoading', false)
  return Promise.reject(error)
})

const app = createApp(App)
app.use(router)
app.use(store)
app.use(animated)

// element-plus 国际化
locale.use(lang)
// element-plus 按需引入
const components = [
  ElButton,
  ElInput,
  ElSpace,
  ElForm,
  ElFormItem,
  ElMessage,
  ElPagination,
  ElRow,
  ElCol,
  ElCard,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElImage,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu
]
components.forEach(component => {
  app.component(component.name, component)
})
// element-plus 按需引入插件
const plugins: any[] = [
  ElLoading,
  ElMessage,
  ElMessageBox
]
plugins.forEach(plugin => {
  app.use(plugin)
})
// element-plus 全局配置
app.config.globalProperties.$ELEMENT = { size: 'medium', zIndex: 2000 }
app.use(ElButton)

app.mount('#app')
