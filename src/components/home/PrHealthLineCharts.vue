<template>
    <div ref="lineCharts"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'PrHealthLineCharts',
  setup() {
    const store = useStore<GlobalDataProps>()
    const stationEfficiency = computed(() => store.state.stationEfficiency)
    const lineCharts = ref(null)
    const mLinePrDatas = ref()
    const mLineHealthDatas = ref()
    const mLinePrAndHealthDatasX = ref()
    watch(stationEfficiency, () => {
      mLinePrAndHealthDatasX.value = stationEfficiency.value.lossDate
      if (stationEfficiency.value.prDatas != null) {
        mLinePrDatas.value = stationEfficiency.value.prDatas.map((item) => {
          if (item != null) {
            return item.substring(0, item.length - 1)
          } else {
            return null
          }
        })
      }
      if (stationEfficiency.value.healthDatas != null) {
        mLineHealthDatas.value = stationEfficiency.value.healthDatas.map((item) => {
          if (item != null) {
            return item.substring(0, item.length - 1)
          } else {
            return null
          }
        })
      }
      initLineCharts()
    })
    const initLineCharts = () => {
      const mLineCharts = lineCharts.value
      if (mLineCharts) {
        const prAndHealthLineCharts = echarts.init(mLineCharts)
        prAndHealthLineCharts.setOption({
          title: {
            left: 'left',
            text: 'PR和健康度历史曲线（%）',
            textStyle: {
              color: '#fff'
            },
            padding: [20, 0, 0, 0]
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            }
          },
          legend: {
            textStyle: {
              color: '#fff'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: mLinePrAndHealthDatasX.value
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: 'PR',
            data: mLinePrDatas.value,
            type: 'line',
            smooth: true
          }, {
            name: '健康度',
            data: mLineHealthDatas.value,
            type: 'line',
            smooth: true
          }]
        })
      }
    }
    return {
      lineCharts
    }
  }
})
</script>

<style lang="sass" scoped>

</style>
