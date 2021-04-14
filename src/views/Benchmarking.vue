<template>
  <div class="container">
    <benchmarking-item v-for="item in benchMarkList" :key="item.deviceId" :detail="item">
    </benchmarking-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { GlobalDataProps } from '@/store'
import { useStore } from 'vuex'
import BenchmarkingItem from '@/components/BenchmarkingItem.vue'

export default defineComponent({
  name: 'Benchmarking',
  components: {
    BenchmarkingItem
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    const benchMarkList = computed(() => store.state.benchMarkList)
    onMounted(() => {
      // 获取标杆组串列表
      store.dispatch('getBenchMarkList')
    })
    return {
      benchMarkList
    }
  }
})
</script>

<style lang="scss" scoped>
.container{
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}
.container::-webkit-scrollbar{
  background-color: #2b2f31;
  border-radius: 3px;
  width: 5px;
}
.container::-webkit-scrollbar-thumb{
  border-radius: 3px;
  background-color: #00B1FF;
}
</style>
