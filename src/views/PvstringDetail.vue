<template>
<div class="container">
  <div class="container__head">
    <img src="@/assets/Hosting4.png" alt=""/>
    <div class="container__head__column">
      <div class="container__title">
        <p>
          {{pvstringDetailProps.deviceName}}：
          <span>电压：{{pvstringDetailProps.u}}</span>
          <span>电流：{{pvstringDetailProps.i}}</span>
          <span>功率：{{pvstringDetailProps.p}}</span>
          <span v-if="pvstringDetailProps.isStandard">组件衰减率：{{pvstringDetailProps.degradationRatio}}</span>
          <span v-if="pvstringDetailProps.isStandard">灰尘损失率：{{pvstringDetailProps.soilingRatio}}</span>
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
    <div class="container__content__chart" ref="tempCharts"></div>
  </div>
  <div class="container__content" v-show="showMenu=='2'">
    <div class="container__content__pie" ref="pieCharts"></div>
    <div class="container__content__chart" ref="lineCharts"></div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, computed, reactive, ref, watch } from 'vue'
// 获取路由信息
import { useRoute } from 'vue-router'
import { GlobalDataProps, NameWrapper } from '@/store'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
import { currentTime, get30AgoTime } from '@/utils/DateUtils'
import { Percentage } from '@/utils/NumberUtils'

export default defineComponent({
  setup() {
    const min = `${currentTime()} 00:00:00`
    const max = `${currentTime()} 24:00:00`

    const uCharts = ref(null)
    const iCharts = ref(null)
    const pCharts = ref(null)
    const tempCharts = ref(null)
    const pieCharts = ref(null)
    const lineCharts = ref(null)
    const mUList = ref()
    const mIList = ref()
    const mPList = ref()
    const mTempList = ref()
    const mPieData = ref()
    const mLineDataX = ref()
    const mLineData = ref()
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
            text: 'DC电压',
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
            text: 'DC电流',
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
            text: '组串功率',
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

      // 温度
      const mtempCharts = tempCharts.value
      console.log('mtempCharts', mtempCharts)
      if (mtempCharts && mTempList.value) {
        var mytempCharts = echarts.init(mtempCharts)
        // 绘制图表
        mytempCharts.setOption({
          title: {
            left: 'center',
            text: '背板温度',
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
              formatter: '{value} ℃'
            }
          },
          series: [{
            data: mTempList.value,
            type: 'line',
            smooth: true,
            showSymbol: false,
            hoverAnimation: false
          }]
        })
      }
    }
    const initPieCharts = () => {
      // 饼图
      const mpieCharts = pieCharts.value
      console.log('mpieCharts', mpieCharts)
      if (mpieCharts && mPieData.value) {
        const pieChart = echarts.init(mpieCharts)
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
              type: 'pie',
              radius: '50%',
              label: {
                color: '#FFF',
                show: false
              },
              labelLine: {
                show: false
              },
              data: mPieData.value
            }
          ]
        })
      }
      // 折线图
      const mlineCharts = lineCharts.value
      console.log('mlineCharts', mlineCharts)
      if (mlineCharts && mLineData.value && mLineDataX.value) {
        const pieChart = echarts.init(mlineCharts)
        // 绘制折线图
        pieChart.setOption({
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
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const pvstringDetailProps = computed(() => store.state.pvstringDetailProps)
    watch(pvstringDetailProps, () => {
      const pvstringDetailProps = store.state.pvstringDetailProps
      const uList = pvstringDetailProps.deviceDataOfToday?.map((item) => {
        return {
          name: 'a',
          value: [
            item.time,
            item.u
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
            item.i
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
      if (pvstringDetailProps.isStandard) {
        mTempList.value = pvstringDetailProps.deviceDataOfToday?.map((item) => {
          return {
            name: 'a',
            value: [
              item.time,
              item.temperature
            ]
          }
        })
      }
      initCharts()
    })
    const pvStringLosses = computed(() => {
      return store.state.pvStringLosses
    })
    watch(pvStringLosses, () => {
      if (pvStringLosses.value.dailyLossData != null) {
        const lossesTotal: number = pvStringLosses.value.dailyLossData.map((a) => a.lossSum)
          .reduce(function (a, b) {
            return a + b
          })
        const lossesList = pvStringLosses.value.dailyLossData.map((item) => {
          const percent = Percentage(item.lossSum, lossesTotal)
          return {
            name: item.lossName + '（' + percent + '%）',
            value: item.lossSum
          }
        })
        if (lossesList) {
          console.log('lossesList', lossesList)
          mPieData.value = lossesList
        }
      }
      if (pvStringLosses.value.lossDate != null) {
        mLineDataX.value = pvStringLosses.value.lossDate
      }
      if (pvStringLosses.value.dailyLossData != null) {
        mLineData.value = pvStringLosses.value.dailyLossData.map(item => {
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
      initPieCharts()
    })

    const meteoData = computed(() => store.state.meteoData)

    var refreshUI = function() {
      // 获取当前气象数据
      store.dispatch('getMeteoData')
      // 获取光伏组串详情
      store.dispatch('getPvStringDetail', { deviceId: route.params.id })
      // 获取光伏组串详情
      console.log('AAA', currentTime() + get30AgoTime())
      store.dispatch('getPvStringLoss', {
        deviceId: route.params.id,
        startTime: get30AgoTime(),
        endTime: currentTime()
      })
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

    console.log('isStandard---------', pvstringDetailProps.value.isStandard)

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
      pieCharts,
      lineCharts,
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
    &__pie{
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
