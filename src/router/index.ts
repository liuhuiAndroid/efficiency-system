import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Benchmarking from '../views/Benchmarking.vue'
import Monitor from '../views/Monitor.vue'
import MonitorDetail from '../views/MonitorDetail.vue'
import Warning from '../views/Warning.vue'
import Analysis from '../views/Analysis.vue'
import Suggestion from '../views/Suggestion.vue'
import Setting from '../views/Setting.vue'
import Login from '../views/login/Login.vue'
import store from '../store'
import TestColumnList from '../views/TestColumnList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '首页',
    component: Home,
    meta: { requiredLogin: false }
  },
  {
    path: '/benchmarking',
    name: '标杆组串',
    component: Benchmarking,
    meta: { requiredLogin: false }
  },
  {
    path: '/monitor',
    name: '实时监测',
    component: Monitor,
    meta: { requiredLogin: false }
  },
  {
    path: '/monitordetail/:id',
    name: '实时监测详情',
    component: MonitorDetail,
    meta: { requiredLogin: false }
  },
  {
    path: '/warning',
    name: '设备预警',
    component: Warning,
    meta: { requiredLogin: false }
  },
  {
    path: '/analysis',
    name: '能效分析',
    component: Analysis,
    meta: { requiredLogin: false }
  },
  {
    path: '/suggestion',
    name: '运维建议',
    component: Suggestion,
    meta: { requiredLogin: false }
  },
  {
    path: '/setting',
    name: '系统设置',
    component: Setting,
    meta: { requiredLogin: false }
  },
  {
    path: '/login',
    name: '登录',
    component: Login,
    meta: { requiredAlreadyLogin: false },
    beforeEnter(to, from, next) {
      const { isLogin } = store.state.user
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/test',
    name: '登录',
    component: TestColumnList,
    meta: { requiredAlreadyLogin: false }
  }
]

const history = createWebHistory(process.env.BASE_URL)
const router = createRouter({
  history,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // console.log('to', to)
  // console.log('to.meta', to.meta)
  // console.log('from', from)
  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next('/login')
  } else if (to.meta.requiredAlreadyLogin && store.state.user.isLogin) {
    next('/')
  } else {
    next()
  }
})

export default router
