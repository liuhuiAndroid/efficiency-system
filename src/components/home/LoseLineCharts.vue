<template>
    <div ref="lineCharts"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps, NameWrapper } from '@/store'

export default defineComponent({
  name: 'LoseLineCharts',
  setup() {
    const store = useStore<GlobalDataProps>()
    const stationEfficiency = computed(() => store.state.stationEfficiency)
    const lineCharts = ref(null)
    const mLineDataX = ref()
    const mLineData = ref()
    watch(stationEfficiency, () => {
      if (stationEfficiency.value.lossDate != null) {
        mLineDataX.value = stationEfficiency.value.lossDate
      }
      if (stationEfficiency.value.dailyLossData != null) {
        mLineData.value = stationEfficiency.value.dailyLossData.map(item => {
          return {
            name: item.lossName,
            type: 'line',
            tooltip: {
              trigger: 'line'
            },
            data: item.loss
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
            text: '各损失绝对占比百分数的历史趋势',
            textStyle: {
              color: '#fff'
            },
            padding: [20, 0, 0, 0]
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            },
            formatter: function(params: any) {
              var relVal = params[0].name
              for (var i = 0, l = params.length; i < l; i++) {
                relVal += `<p>${params[i].marker}${params[i].seriesName}：&nbsp;<b>${params[i].value}kWh</b></p>`
              }
              return relVal
            }
          },
          legend: {
            data: (mLineData.value as NameWrapper[]).map((item) => {
              return item.name
            }),
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
            boundaryGap: false,
            data: mLineDataX.value
          },
          yAxis: {
            type: 'value'
          },
          series: mLineData.value
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
