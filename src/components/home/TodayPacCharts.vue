<template>
    <div ref="stationPacCharts"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'TodayPacCharts',
  setup() {
    const store = useStore<GlobalDataProps>()
    const stationPacCharts = ref(null)
    const mStationTodayPacList = ref()
    const mStationTodayPacList2 = ref()
    const stationTodayPac = computed(() => store.state.stationTodayPac)
    watch(stationTodayPac, () => {
      const stationTodayPac = store.state.stationTodayPac
      const stationTodayPacList = stationTodayPac.map((item) => {
        return {
          name: '',
          value: [
            item.timely.replace('+08', ''),
            item.actualPower
          ]
        }
      })
      const stationTodayPacList2 = stationTodayPac.map((item) => {
        return {
          name: '',
          value: [
            item.timely.replace('+08', ''),
            item.ghi
          ]
        }
      })
      if (stationTodayPacList) {
        mStationTodayPacList.value = stationTodayPacList
        mStationTodayPacList2.value = stationTodayPacList2
      }
      console.log('mStationTodayPacList.value', mStationTodayPacList.value)
      initStationTodayPacCharts()
    })
    onMounted(() => {
      // 获取当日电站功率
      store.dispatch('getStationTodayPac')
    })

    const initStationTodayPacCharts = () => {
      const mStationPacCharts = stationPacCharts.value
      if (mStationPacCharts) {
        var myStationPacCharts = echarts.init(mStationPacCharts)
        // 绘制图表
        myStationPacCharts.setOption({
          title: {
            left: 'left',
            text: '功率（kW）',
            textStyle: {
              color: '#fff'
            },
            padding: [20, 0, 0, 0]
          },
          legend: {
            data: ['实际功率', 'GHI辐照度'],
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            type: 'time', // 时间轴
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: function (value: any) {
                console.log('value', value)
                var data = new Date(value)
                var hours = data.getHours()
                var minutes = data.getMinutes()
                var hoursString = hours + ''
                var minutesString = minutes + ''
                if (hours < 10) {
                  hoursString = '0' + hours
                }
                if (minutes < 10) {
                  minutesString = '0' + minutes
                }
                return hoursString + ':' + minutesString
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
            name: '实际功率',
            type: 'line',
            smooth: true,
            data: mStationTodayPacList.value,
            areaStyle: {},
            showSymbol: false,
            hoverAnimation: false
          }, {
            name: 'GHI辐照度',
            type: 'line',
            smooth: true,
            data: mStationTodayPacList2.value,
            showSymbol: false,
            hoverAnimation: false
          }]
        })
      }
    }

    return {
      stationPacCharts
    }
  }
})
</script>

<style lang="sass" scoped>

</style>
