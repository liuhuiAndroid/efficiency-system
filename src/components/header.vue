<template>
  <div class="header__warp" id="headerWarp">
    <el-row>
      <el-col :span="6">
        <el-image
          style="width: 130px; height: 60px"
          :src="require('../assets/logo.png')"
          :fit="contain">
        </el-image>
      </el-col>
      <el-col :span="12">
        <div class="header__warp__title">远东学校——光魄能效云系统</div>
      </el-col>
      <el-row :span="6" class="header__warp__date">
        <p>2020年8月24日 星期一</p>
        <p>27 晴</p>
        <p @click="logout()">退出系统</p>
      </el-row>
    </el-row>
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
.header__warp{
  width: 100%;
  height: 0.8rem;
  background: url(../assets/header.png) no-repeat center;
  background-size: 100% 100%;
  color: #fff;
}

.header__warp__title{
  font-size: 0.3rem;
  line-height: 0.6rem;
  font-weight: 500;
  float: left;
  text-align: center;
  cursor: pointer;
  width: 100%;
}

.header__warp__date{
  font-size: 0.16rem;
  text-align: center;
  color: #17FFFF;
  position: absolute;
  right: 0.2rem;
  top: 0.4rem;
}

.header__warp__date p{
  float: left;
  margin-right: 10px;
}
</style>
