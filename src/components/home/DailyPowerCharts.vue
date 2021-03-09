<template>
    <div ref="dailyCharts"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'DailyPowerCharts',
  setup() {
    const store = useStore<GlobalDataProps>()
    const stationDailyPower = computed(() => store.state.stationDailyPower)
    const dailyCharts = ref(null)
    const mDailyList = ref()

    watch(stationDailyPower, () => {
      const stationDailyPower = store.state.stationDailyPower
      const dailyList = stationDailyPower.map((item) => {
        return {
          name: '',
          value: [
            item.timely,
            item.actualPower
          ]
        }
      })
      if (dailyList) {
        mDailyList.value = dailyList
      }
      initDailyCharts()
    })
    
    const initDailyCharts = () => {
      // 日发电量
      const mDailyCharts = dailyCharts.value
      if (mDailyCharts) {
        var myDailyCharts = echarts.init(mDailyCharts)
        // 绘制图表
        myDailyCharts.setOption({
          title: {
            left: 'left',
            text: '日发电量（kWh）',
            textStyle: {
              color: '#fff'
            },
            padding: [20, 0, 0, 0]
          },
          xAxis: {
            type: 'time', // 时间轴
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: function (value:any) {
                var data = new Date(value)
                var month = data.getMonth() + 1
                var day = data.getDate()
                var monthString = month + ''
                var dayString = day + ''
                if (month < 10) {
                  monthString = '0' + month
                }
                if (day < 10) {
                  dayString = '0' + day
                }
                return monthString + '-' + dayString
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [{
            type: 'line',
            smooth: true,
            data: mDailyList.value,
            areaStyle: {},
            showSymbol: false,
            hoverAnimation: false
          }]
        })
      }
    }

    return {
      dailyCharts
    }
  }
})
</script>

<style lang="sass" scoped>

</style>
