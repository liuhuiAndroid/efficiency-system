<template>
  <div class="container">
    <h1>实时监测详情</h1>
    <div ref="mycharts" style="margin-left:200px;width:600px;height:400px;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, reactive, ref, watch } from 'vue'
// 获取路由信息
import { useRoute } from 'vue-router'
import { GlobalDataProps } from '../store'
import { useStore } from 'vuex'
import * as echarts from 'echarts'

export default defineComponent({
  setup() {
    const mycharts = ref(null)
    const mTimeList = ref<string[]>()
    const mUList = ref<number[]>()
    // echart 初始化
    const initCharts = () => {
      var mycharts2 = mycharts.value
      if (mycharts2) {
        var myChart = echarts.init(mycharts2)
        // 绘制图表
        myChart.setOption({
          title: {
            text: 'DC电压'
          },
          xAxis: {
            type: 'category',
            data: mTimeList.value
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} V'
            }
          },
          series: [{
            data: mUList.value,
            type: 'line',
            smooth: true
          }]
        })
      }
    }
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const pvstringDetailProps = computed(() => store.state.pvstringDetailProps)
    watch(pvstringDetailProps, () => {
      const pvstringDetailProps = store.state.pvstringDetailProps
      const timeList = pvstringDetailProps.deviceDataOfToday?.map((item) => item.time)
      if (timeList) {
        mTimeList.value = timeList
      }
      const uList = pvstringDetailProps.deviceDataOfToday?.map((item) => item.u)
      if (uList) {
        mUList.value = uList
      }
      initCharts()
    })
    onMounted(() => {
      // 获取当前气象数据
      store.dispatch('getPvStringDetail', { deviceId: route.params.id })
    })
    return {
      pvstringDetailProps,
      mycharts
    }
  }
})
</script>

<style lang="scss" scoped>
h1{
  color: white;
}
</style>
