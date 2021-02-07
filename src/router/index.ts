import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Benchmarking from '../views/Benchmarking.vue'
import Monitor from '../views/Monitor.vue'
import MonitorDetail from '../views/MonitorDetail.vue'
import Warning from '../views/Warning.vue'
import Analysis from '../views/Analysis.vue'
import Suggestion from '../views/Suggestion.vue'
import Setting from '../views/Setting.vue'
import Login from '../views/Login.vue'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '首页',
    component: Home
  },
  {
    path: '/benchmarking',
    name: '标杆组串',
    component: Benchmarking
  },
  {
    path: '/monitor',
    name: '实时监测',
    component: Monitor,
    meta: { requiredLogin: true }
  },
  {
    path: '/monitordetail/:id',
    name: '实时监测详情',
    component: MonitorDetail
  },
  {
    path: '/warning',
    name: '设备预警',
    component: Warning
  },
  {
    path: '/analysis',
    name: '能效分析',
    component: Analysis
  },
  {
    path: '/suggestion',
    name: '运维建议',
    component: Suggestion
  },
  {
    path: '/setting',
    name: '系统设置',
    component: Setting
  },
  {
    path: '/login',
    name: '系统设置',
    component: Login,
    meta: { requiredAlreadyLogin: true }
  }
]

const history = createWebHistory(process.env.BASE_URL)
const router = createRouter({
  history,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('to.meta', to.meta)
  console.log('from', from)
  if (to.meta.requiredLogin && to.name !== 'login' && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.requiredAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
