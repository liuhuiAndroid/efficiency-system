<template>
    <div ref="monthlyCharts"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'MonthlyPowerCharts',
  setup() {
    const store = useStore<GlobalDataProps>()
    const stationMonthlyPower = computed(() => store.state.stationMonthlyPower)
    const monthlyCharts = ref(null)
    const mMonthlyListX = ref()
    const mMonthlyListY = ref()

    watch(stationMonthlyPower, () => {
      const stationMonthlyPower = store.state.stationMonthlyPower
      mMonthlyListX.value = stationMonthlyPower.map((item) => {
        return item.timely
      })
      mMonthlyListY.value = stationMonthlyPower.map((item) => {
        return item.actualPower
      })
      initMonthlyCharts()
    })

    onMounted(() => {
      // 获取电站每月发电量（当年）
      store.dispatch('getStationMonthlyPower')
    })

    const initMonthlyCharts = () => {
      // 月发电量
      const mMonthlyCharts = monthlyCharts.value
      if (mMonthlyCharts) {
        var myMonthlyCharts = echarts.init(mMonthlyCharts)
        // 绘制图表
        myMonthlyCharts.setOption({
          title: {
            left: 'left',
            text: '月发电量（MWh）',
            textStyle: {
              color: '#fff'
            },
            padding: [20, 0, 0, 0]
          },
          xAxis: {
            type: 'category',
            data: mMonthlyListX.value
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: mMonthlyListY.value,
            type: 'bar'
          }]
        })
      }
    }
    return {
      monthlyCharts
    }
  }
})
</script>

<style lang="sass" scoped>

</style>
