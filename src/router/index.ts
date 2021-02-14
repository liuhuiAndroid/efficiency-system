import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/benchmarking',
    name: 'Benchmarking',
    component: () => import(/* webpackChunkName: "benchmarking" */ '../views/Benchmarking.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/monitor',
    name: 'Monitor',
    component: () => import(/* webpackChunkName: "monitor" */ '../views/Monitor.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/monitordetail/:id',
    name: 'MonitorDetail',
    component: () => import(/* webpackChunkName: "monitordetail" */ '../views/MonitorDetail.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/warning',
    name: 'Warning',
    component: () => import(/* webpackChunkName: "warning" */ '../views/Warning.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: () => import(/* webpackChunkName: "analysis" */ '../views/Analysis.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/suggestion',
    name: 'Suggestion',
    component: () => import(/* webpackChunkName: "suggestion" */ '../views/Suggestion.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue'),
    meta: { requiredLogin: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
    meta: { requiredAlreadyLogin: false },
    beforeEnter(to, from, next) {
      const { isLogin } = store.state.user
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/test',
    name: 'TestColumnList',
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
