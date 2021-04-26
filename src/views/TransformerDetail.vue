<template>
<div class="container">
  <div class="container__head">
    <img src="@/assets/Hosting.png" alt=""/>
    <div class="container__head__column">
      <div class="container__title">
        <p>
          {{pvstringDetailProps.deviceName}}：
          <span>电压：{{pvstringDetailProps.u}}</span>
          <span>电流：{{pvstringDetailProps.i}}</span>
          <span>功率：{{pvstringDetailProps.p}}</span>
        </p>
      </div>
      <div class="container__title">
        <p>
          环境数据：
          <span style="margin-left: 0.2rem;">{{`温度：${meteoData.temperature}`}}</span>
          <span>{{`湿度：${meteoData.humidity}`}}</span>
          <span>{{`压力：${meteoData.pressure}`}}</span>
          <span>{{`风向：${meteoData.windDirection}`}}</span>
          <span>{{`风速：${meteoData.windSpeed}`}}</span>
          <span>{{`POA(辐照度)：${meteoData.poa}`}}</span>
          <span>{{`GHI(辐照度)：${meteoData.ghi}`}}</span>
        </p>
      </div>
    </div>
  </div>
  <el-menu class="container__menu" :default-active="1" mode="horizontal" @select="handleSelect" background-color="#021138" text-color="#FFF" active-text-color="#409EFF">
    <el-menu-item index="1">设备监控</el-menu-item>
    <el-menu-item index="2">设备能效</el-menu-item>
  </el-menu>
  <div class="container__content" v-show="showMenu=='1'">
    <div class="container__content__chart" ref="uCharts"></div>
    <div class="container__content__chart" ref="iCharts"></div>
    <div class="container__content__chart" ref="pCharts"></div>
    <div class="container__content__chart" />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, computed, reactive, ref, watch } from 'vue'
// 获取路由信息
import { useRoute } from 'vue-router'
import { GlobalDataProps } from '@/store'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
import { currentTime } from '@/utils/DateUtils'

export default defineComponent({
  setup() {
    const min = `${currentTime()} 00:00:00`
    const max = `${currentTime()} 24:00:00`

    const uCharts = ref(null)
    const iCharts = ref(null)
    const pCharts = ref(null)
    const tempCharts = ref(null)
    const mUList = ref()
    const mIList = ref()
    const mPList = ref()
    // echart 初始化
    const initCharts = () => {
      // 电压
      const muCharts = uCharts.value
      if (muCharts) {
        var myuChart = echarts.init(muCharts)
        // 绘制图表
        myuChart.setOption({
          title: {
            left: 'center',
            text: '低压侧电压',
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            type: 'time', // 时间轴
            splitLine: {
              show: false
            },
            min,
            max,
            axisLabel: {
              formatter: function (value:any) {
                var data = new Date(value)
                var hours = data.getHours()
                var minutes = data.getMinutes()
                var hourString = hours + ''
                var minuteString = minutes + ''
                if (hours < 10) {
                  hourString = '0' + hours
                }
                if (minutes < 10) {
                  minuteString = '0' + minutes
                }
                return hourString + ':' + minuteString
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} V'
            }
          },
          series: [{
            type: 'line',
            smooth: true,
            data: mUList.value,
            showSymbol: false,
            hoverAnimation: false
          }]
        })
      }

      // 电流
      const miCharts = iCharts.value
      if (miCharts) {
        var myiChart = echarts.init(miCharts)
        // 绘制图表
        myiChart.setOption({
          title: {
            left: 'center',
            text: '高压侧电压',
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            type: 'time', // 时间轴
            splitLine: {
              show: false
            },
            min,
            max,
            axisLabel: {
              formatter: function (value:any) {
                var data = new Date(value)
                var hours = data.getHours()
                var minutes = data.getMinutes()
                var hourString = hours + ''
                var minuteString = minutes + ''
                if (hours < 10) {
                  hourString = '0' + hours
                }
                if (minutes < 10) {
                  minuteString = '0' + minutes
                }
                return hourString + ':' + minuteString
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} A'
            }
          },
          series: [{
            data: mIList.value,
            type: 'line',
            smooth: true,
            showSymbol: false,
            hoverAnimation: false
          }]
        })
      }

      // 功率
      const mpCharts = pCharts.value
      if (mpCharts) {
        var mypCharts = echarts.init(mpCharts)
        // 绘制图表
        mypCharts.setOption({
          title: {
            left: 'center',
            text: '功率',
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            type: 'time', // 时间轴
            splitLine: {
              show: false
            },
            min,
            max,
            axisLabel: {
              formatter: function (value:any) {
                var data = new Date(value)
                var hours = data.getHours()
                var minutes = data.getMinutes()
                var hourString = hours + ''
                var minuteString = minutes + ''
                if (hours < 10) {
                  hourString = '0' + hours
                }
                if (minutes < 10) {
                  minuteString = '0' + minutes
                }
                return hourString + ':' + minuteString
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} W'
            }
          },
          series: [{
            data: mPList.value,
            type: 'line',
            smooth: true,
            showSymbol: false,
            hoverAnimation: false
          }]
        })
      }
    }
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const pvstringDetailProps = computed(() => {
      return store.state.transformerDetailProps
    })
    watch(pvstringDetailProps, () => {
      const pvstringDetailProps = store.state.transformerDetailProps
      const uList = pvstringDetailProps.deviceDataOfToday?.map((item) => {
        return {
          name: 'a',
          value: [
            item.time,
            item.lu
          ]
        }
      })
      if (uList) {
        mUList.value = uList
        console.log('ulist', mUList)
      }
      const iList = pvstringDetailProps.deviceDataOfToday?.map((item) => {
        return {
          name: 'a',
          value: [
            item.time,
            item.hu
          ]
        }
      })
      if (iList) {
        mIList.value = iList
      }
      const pList = pvstringDetailProps.deviceDataOfToday?.map((item) => {
        return {
          name: 'a',
          value: [
            item.time,
            item.p
          ]
        }
      })
      if (pList) {
        mPList.value = pList
      }
      initCharts()
    })

    const meteoData = computed(() => store.state.meteoData)

    var refreshUI = function() {
      // 获取当前气象数据
      store.dispatch('getMeteoData')
      // 获取光伏组串详情
      store.dispatch('getTransformerDetail', { deviceId: route.params.id })
    }
    let intervalTask: number

    onMounted(() => {
      refreshUI()
      intervalTask = window.setInterval(refreshUI, 300000)
    })

    onBeforeUnmount(() => {
      if (intervalTask) {
        window.clearInterval(intervalTask)
      }
    })

    const showMenu = ref('1')
    function handleSelect(key: string, keyPath: string) {
      showMenu.value = key
      console.log('showMenu', showMenu)
    }
    return {
      pvstringDetailProps,
      uCharts,
      iCharts,
      pCharts,
      tempCharts,
      meteoData,
      handleSelect,
      showMenu
    }
  }
})
</script>

<style lang="scss" scoped>
.container{
  margin-left: 2rem;
  overflow-y: scroll;
  height: 8rem;
  &__head{
    display: flex;
    flex-direction: row;
    margin-left: .3rem;
    &__column{
      display: flex;
      flex-direction: column;
    }
  }
  &__title{
    height: .3rem;
    margin-left: .3rem;
    margin-top: .1rem;
    p{
      width: 100%;
      height: 0.3rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: white;
    }
    span{
      display: inline-block;
      margin-left: 0.4rem;
      color: white;
    }
  }
  &__menu{
    margin-left: .3rem;
    margin-right: .3rem;
    margin-top: .1rem;
  }
  &__content{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin-top: .5rem;
    &__chart{
      width: 8rem;
      height: 4rem;
    }
  }
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
