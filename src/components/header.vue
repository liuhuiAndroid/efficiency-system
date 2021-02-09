<template>
  <div class="header-container">
    <nav class="nav w" id="nav">
      <div class="logo fl">
        <router-link to="/">{{web_name}}</router-link>
      </div>
    </nav>
    <div class="nav-wrapper">
      <router-link
        class="nav cp"
        v-for="(val, index) of navs"
        :key="`nav-${val.path}-${index}`"
        :to="val.path"
      >{{val.name}}</router-link>
    </div>
    <div @click="logout()">退出系统</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
// import { UserProps } from '../store'

export default defineComponent({
  name: 'HeaderItem',
  setup() {
    const navs = [
      { name: '首页', path: '/' },
      { name: '标杆组串', path: '/benchmarking' },
      { name: '实时监测', path: '/monitor' },
      { name: '设备预警', path: '/warning' },
      { name: '能效分析', path: '/analysis' },
      { name: '运维建议', path: '/suggestion' },
      { name: '系统设置', path: '/setting' }
    ]

    const currentInstance = getCurrentInstance()
    const logout = () => {
      if (currentInstance) {
        currentInstance.appContext.app.config.globalProperties.$confirm(
          '退出系统?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          console.log('退出')
        }).catch(() => {
          console.log('取消')
        })
      }
    }
    return {
      navs,
      logout
    }
  }
})
</script>

<style>
.header-container {
  display: flex;
  flex-direction: row;
}
nav {
  height: 60px;
  border-bottom: 2px solid #6C6C70;
  overflow: hidden;
  margin: 0 auto;
}
.logo {
  margin-left: -30px;
}
.logo h1 {
  position: absolute;
  width: 120px;
  height: 55px;
  background: url(../assets/logo.png) no-repeat;
}
.logo h2 {
  padding-left: 140px;
  font-size: 28px;
  color: white;
  line-height: 80px;
}
.nav ul li {
  float: left;
}
.nav ul li a{
  display: inline-block;
  float: left;
  font-size: 22px;
  color: white;
  line-height: 80px;
  padding: 0 12px;
}
.nav ul li:nth-child(1) a {
  font-weight: 800;
}
.nav ul li:nth-child(8) a {
  font-size: 16px;
  padding-left: 24px;
  padding-right: 68px;
}
.nav ul li:nth-child(9) a {
  font-size: 18px;
}
.cp {
  margin-left: 15px;
}
</style>
