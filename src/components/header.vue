<template>
  <div class="header-container">
    <!-- <el-row>
      <el-col :span="2">
        <el-image
          style="width: 130px; height: 60px"
          :src="require('../assets/logo.png')"
          :fit="contain">
        </el-image>
      </el-col>
      <el-col :span="20"><div>远东学校——光魄能效云系统</div></el-col>
      <el-col :span="2" @click="logout()"><div>退出系统</div></el-col>
    </el-row> -->
    <div class="header-warp" id="headerWarp">
      <img :src="require('../assets/logo.png')" alt="">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
// import { UserProps } from '../store'

export default defineComponent({
  name: 'Header',
  setup() {
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
      logout
    }
  }
})
</script>

<style>

</style>
