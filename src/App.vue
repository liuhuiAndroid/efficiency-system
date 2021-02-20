<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
// 获取路由信息
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { ElLoading, ElMessage } from 'element-plus'
import axios from 'axios'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const token = computed(() => store.state.token)
    const error = computed(() => store.state.error)
    const route = useRoute()
    const routename = ref(route.name)

    onBeforeRouteUpdate(to => {
      console.log(to, '监听到变化')
      console.log(routename)
    })

    onMounted(() => {
      // 登录持久化
      if (!currentUser.value.isLogin && token.value) {
        // axios 设置通用 header
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser').then(data => {
          console.log(data)
        })
      }
    })

    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        ElMessage.error(message)
      }
    })

    let loadingInstance: ILoadingInstance | undefined
    watch(() => isLoading.value, () => {
      console.log('isLoading', isLoading.value)
      if (isLoading.value) {
        loadingInstance = ElLoading.service({ fullscreen: true, text: '拼命加载中' })
      } else {
        if (loadingInstance) {
          loadingInstance.close()
        }
      }
    })
  }
})
</script>

<style lang="scss" sco>
@import './style/viriables.scss';
@import './style/mixins.scss';
* {
  margin: 0;
  padding: 0;
}
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: relative;
  font-family: Noto Sans S Chinese;
  background: url(./assets/background.png) no-repeat center;
  background-size: 100% 100%;
}
#app {
  max-width: 1920px;
  min-width: 1200px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
</style>
