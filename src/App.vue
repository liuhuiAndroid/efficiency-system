<template>
  <div class="container">
    <header-component v-show="$route.name!=='login'"/>
    <h1>{{error}}</h1>
    <router-view class="main-container"/>
    <!-- <loader v-if="true"></loader> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import HeaderComponent from './components/header.vue'
// 获取路由信息
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
// import Loader from './components/Loader.vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

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
      if (!currentUser.value.isLogin && token.value) {
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
    return {
      routename,
      isLoading,
      error
    }
  },
  components: {
    HeaderComponent
    // Loader
  }
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main-container {
  flex: 1;
  padding: 12px 20px;
}
</style>
