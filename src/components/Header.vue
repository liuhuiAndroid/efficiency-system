<template>
  <div class="header__warp" id="headerWarp">
    <img class="header__warp__img" :src="require('../assets/logo.png')" alt="">
    <div class="header__warp__title">远东学校—光魄能效云系统</div>
    <div class="header__warp__date">
      <p>{{currentTime}}</p>
      <p @click="logout()">退出系统</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, onMounted, onBeforeUnmount } from 'vue'
import { formatDate } from '../utils/DateUtils'

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
    const currentTime = ref('')
    currentTime.value = formatDate(new Date())
    onMounted(() => {
      const chatTimer = setInterval(() => {
        currentTime.value = formatDate(new Date())
      }, 1000)
    })
    return {
      logout,
      currentTime
    }
  }
})
</script>

<style lang="scss" scoped>
.header__warp{
  max-width: 1920px;
  min-width: 1200px;
  width: 100%;
  height: 0.8rem;
  background: url(../assets/header.png) no-repeat center;
  background-size: 100% 100%;
  color: #fff;
  margin-bottom: 0.2rem;
  &__img{
    width: 1.2rem;
    position: absolute;
    left: 0.2rem;
    top: 0.2rem;
  }
  &__title{
    font-size: 0.3rem;
    line-height: 0.65rem;
    font-weight: 500;
    float: left;
    text-align: center;
    cursor: pointer;
    width: 100%;
  }
  &__date{
    font-size: 0.16rem;
    text-align: center;
    color: #17FFFF;
    position: absolute;
    right: 0.2rem;
    top: 0.4rem;
    p{
      float: left;
      margin-right: 10px;
    }
  }
}
</style>
