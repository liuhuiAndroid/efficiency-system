import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '首页',
    component: Home
  },
  {
    path: '/benchmarking',
    name: '标杆组串',
    component: () => import('../views/Benchmarking.vue')
  },
  {
    path: '/monitor',
    name: '实时监测',
    component: () => import('../views/Monitor.vue')
  },
  {
    path: '/warning',
    name: '设备预警',
    component: () => import('../views/Warning.vue')
  },
  {
    path: '/analysis',
    name: '能效分析',
    component: () => import('../views/Analysis.vue')
  },
  {
    path: '/suggestion',
    name: '运维建议',
    component: () => import('../views/Suggestion.vue')
  },
  {
    path: '/setting',
    name: '系统设置',
    component: () => import('../views/Setting.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
