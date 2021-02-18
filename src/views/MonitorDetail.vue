<template>
  <div class="container">
    <h1>实时监测详情</h1>
    <!-- pre 标签可定义预格式化的文本。在pre元素中的文本会保留空格和换行符。文本显现为等宽字体 -->
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
    const currentId = route.params.id
    console.log('currentId', currentId)
    return {
      route
    }
  }
})
</script>

<style lang="scss" scoped>
h1{
  color: white;
}
</style>
