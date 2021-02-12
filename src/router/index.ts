import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '首页',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/benchmarking',
    name: '标杆组串',
    component: () => import(/* webpackChunkName: "benchmarking" */ '../views/Benchmarking.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/monitor',
    name: '实时监测',
    component: () => import(/* webpackChunkName: "monitor" */ '../views/Monitor.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/monitordetail/:id',
    name: '实时监测详情',
    component: () => import(/* webpackChunkName: "monitordetail" */ '../views/MonitorDetail.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/warning',
    name: '设备预警',
    component: () => import(/* webpackChunkName: "warning" */ '../views/Warning.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/analysis',
    name: '能效分析',
    component: () => import(/* webpackChunkName: "analysis" */ '../views/Analysis.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/suggestion',
    name: '运维建议',
    component: () => import(/* webpackChunkName: "suggestion" */ '../views/Suggestion.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/setting',
    name: '系统设置',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
    meta: { requiredAlreadyLogin: false },
    beforeEnter(to, from, next) {
      const { isLogin } = store.state.user
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/test',
    name: '登录',
    component: () => import(/* webpackChunkName: "test" */ '../views/TestColumnList.vue'),
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
