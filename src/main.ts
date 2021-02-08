import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// test axios
import axios from 'axios'
axios.defaults.baseURL = 'http://api.vikingship.xyz/api'
// Add a request interceptor
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: 'aaa' }
  return config
})
axios.get('/columns', { params: { key: 'hello' } }).then(resp => {
  console.log(resp.data)
})

createApp(App).use(router).use(store).mount('#app')

console.log('store', store.state.count)
store.commit('add')
store.commit('add')
console.log('store', store.state.count)