<template>
  <div class="container">
    <h1>实时监测 详情</h1>
    <pre>{{route}}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// 获取路由信息
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const currentId = +route.params.id // string convert to int
    return {
      route
    }
  }
})
</script>
