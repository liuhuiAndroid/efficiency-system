import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import axios from 'axios'
import store from '../store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { redirectAlreadyLogin: true },
    beforeEnter (to, from, next) {
      const { isLogin } = store.state.user
      isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/',
    name: 'Main',
    redirect: '/home', // 设置默认打开的页面
    component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'),
    meta: { requiredLogin: false },
    children: [
      {
        path: '/home',
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
        path: '/device',
        name: 'Monitor',
        component: () => import(/* webpackChunkName: "monitor" */ '../views/Monitor.vue'),
        meta: { requiredLogin: false }
      },
      {
        path: '/pvstringdetail/:id/:type',
        name: 'PvstringDetail',
        component: () => import(/* webpackChunkName: "pvstringdetail" */ '../views/PvstringDetail.vue'),
        meta: { requiredLogin: false }
      },
      {
        path: '/combinerdetail/:id/:type',
        name: 'CombinerDetail',
        component: () => import(/* webpackChunkName: "combinerdetail" */ '../views/CombinerDetail.vue'),
        meta: { requiredLogin: false }
      },
      {
        path: '/inverterdetail/:id/:type',
        name: 'InverterDetail',
        component: () => import(/* webpackChunkName: "inverterdetail" */ '../views/InverterDetail.vue'),
        meta: { requiredLogin: false }
      },
      {
        path: '/transformerdetail/:id/:type',
        name: 'TransformerDetail',
        component: () => import(/* webpackChunkName: "transformerdetail" */ '../views/TransformerDetail.vue'),
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
        meta: { requiredLogin: true }
      },
      // {
      //   path: '/setting',
      //   name: 'Setting',
      //   component: () => import(/* webpackChunkName: "setting" */ '../views/Setting.vue'),
      //   meta: { requiredLogin: true }
      // },
      {
        path: '/analysisdetail/:id',
        name: 'AnalysisDetail',
        component: () => import(/* webpackChunkName: "analysisdetail" */ '../views/AnalysisDetail.vue'),
        meta: { requiredLogin: false }
      }
    ]
  }
]

const history = createWebHashHistory()
const router = createRouter({
  history,
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requiredLogin, redirectAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        store.commit('logout')
        next('login')
      })
    } else {
      if (requiredLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (redirectAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})

export default router
