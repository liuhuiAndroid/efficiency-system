<template>
  <div class="container">
    <header-component v-show="$route.name!=='login'"/>
    <router-view class="main-container"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from './store'
import HeaderComponent from './components/header.vue'
// 获取路由信息
import { useRoute, onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)

    const route = useRoute()
    const routename = ref(route.name)

    onBeforeRouteUpdate(to => {
      console.log(to, '监听到变化')
      console.log(routename)
    })

    return {
      routename
    }
  },
  components: {
    HeaderComponent
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
