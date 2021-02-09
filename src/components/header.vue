<template>
  <div class="header-container">
    <el-col>
      <el-row v-for="(val, index) of navs" :key="`nav-${val.path}-${index}`">
        <el-col :span="24">
          <router-link :to="val.path">{{val.name}}</router-link>
        </el-col>
      </el-row>
      <el-row @click="logout()">
        <el-col :span="24"><div>退出系统</div></el-col>
      </el-row>
    </el-col>
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

</style>
