<template>
  <div class="about">
    <h1>登录2</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
// 定义路由行为
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore<GlobalDataProps>()
    // todo login
    store.commit('login')

    const router = useRouter()
    router.push(name: '/monitordetail', params: {id: 1})
  }
})
</script>
