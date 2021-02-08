<template>
  <teleport to="#back">
    <div
      class="loading-container" style="height: 100%; width: 100%"
      :loading="loading" element-loading-text='拼命加载中' element-loading-spinner="el-icon-loading"
    >
      <div>拼命加载中</div>
    </div>

    <el-row >
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    },
    loading: {
      type: Boolean
    }
  },
  setup() {
    const node = document.createElement('div')
    node.id = 'back'
    document.body.appendChild(node)
    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>

<style>
.loading-container {
  background: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
}
.loading-container {
  text-align: center;
}
</style>
