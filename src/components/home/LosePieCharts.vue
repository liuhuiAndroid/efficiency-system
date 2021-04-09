<template>
    <div ref="pieCharts"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import { Percentage } from '@/utils/NumberUtils'

export default defineComponent({
  name: 'LosePieCharts',
  setup() {
    const store = useStore<GlobalDataProps>()
    const stationLossesList = computed(() => store.state.stationLosses)
    const pieCharts = ref(null)
    const mLoseList = ref()
    watch(stationLossesList, () => {
      const stationLosses = store.state.stationLosses
      const lossesTotal: number = stationLosses.map((a) => a.loss)
        .reduce(function (a, b) {
          return a + b
        })
      const stationLossesList = stationLosses.map((item) => {
        const percent = Percentage(item.loss, lossesTotal)
        return {
          name: item.lossName + '（' + percent + '%）',
          value: item.loss
        }
      })
      if (stationLossesList) {
        mLoseList.value = stationLossesList
      }
      console.log(mLoseList.value)
      initLosePieCharts()
    })

    const initLosePieCharts = () => {
      // 饼状图
      const mPieCharts = pieCharts.value
      if (mPieCharts) {
        const pieChart = echarts.init(mPieCharts)
        // 绘制饼状图
        pieChart.setOption({
          title: {
            text: '近30天的能耗损失比例',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{b} : {c}kWh'
          },
          legend: {
            orient: 'horizontal',
            x: 'center',
            y: 'bottom',
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              top: -100,
              type: 'pie',
              radius: '50%',
              label: {
                color: '#FFF',
                show: false
              },
              labelLine: {
                show: false
              },
              data: mLoseList.value
            }
          ]
        })
      }
    }
    return {
      pieCharts
    }
  }
})
</script>

<style lang="sass" scoped>

</style>
