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
    const mMonthlyListActualY = ref()
    const mMonthlyListIdealY = ref()

    watch(stationMonthlyPower, () => {
      const stationMonthlyPower = store.state.stationMonthlyPower
      mMonthlyListX.value = stationMonthlyPower.map((item) => {
        return item.timely
      })
      mMonthlyListActualY.value = stationMonthlyPower.map((item) => {
        return item.actualPower
      })
      mMonthlyListIdealY.value = stationMonthlyPower.map((item) => {
        return item.idealPower
      })
      initMonthlyCharts()
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
          legend: {
            data: ['实际发电量', '理论发电量'],
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            type: 'category',
            data: mMonthlyListX.value
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '实际发电量',
              type: 'bar',
              data: mMonthlyListActualY.value
            },
            {
              name: '理论发电量',
              type: 'line',
              data: mMonthlyListIdealY.value
            }
          ]
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
