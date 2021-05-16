<template>
<div class="container">
  <div class="container__head">
    <div v-if="pvstringDetailProps.deviceId==currentDeviceId">
      <img v-if="pvstringDetailProps.status==0" src="../assets/Hosting2.png" alt="">
      <img v-else-if="pvstringDetailProps.status==1" src="../assets/Hosting2_error.png" alt="">
      <img v-else src="../assets/Hosting2_warning.png" alt="">
    </div>
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
  <el-menu class="container__menu" :default-active="showMenu" mode="horizontal" @select="handleSelect" background-color="#021138" text-color="#FFF" active-text-color="#409EFF">
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
    <div class="container__content__chart" ref="histogramCharts"></div>
    <div class="container__content__chart" ref="lineCharts"></div>
    <div class="container__content__chart" ref="prAndHealthLineCharts"></div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, computed, reactive, ref, watch } from 'vue'
// 获取路由信息
import { useRoute } from 'vue-router'
import { GlobalDataProps, NameWrapper, DailyPvStringLosses } from '@/store'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
import { currentTime, get30AgoTime } from '@/utils/DateUtils'
import { Percentage } from '@/utils/NumberUtils'

export default defineComponent({
  setup() {
    const route = useRoute()
    var currentDeviceId = route.params.id

    const min = `${currentTime()} 00:00:00`
    const max = `${currentTime()} 24:00:00`

    const uCharts = ref(null)
    const iCharts = ref(null)
    const pCharts = ref(null)
    const tempCharts = ref(null)
    const mUList = ref()
    const mIList = ref()
    const mPList = ref()
    const mTempList = ref()
    const mPieData = ref()

    const pieCharts = ref(null)
    const histogramCharts = ref(null)
    const lineCharts = ref(null)
    const prAndHealthLineCharts = ref(null)

    const mHistogramDataX = ref()
    const mHistogramData = ref()
    const mLineDataX = ref()
    const mLineData = ref()
    const mLinePrDatas = ref()
    const mLineHealthDatas = ref()
    const mLinePrAndHealthDatasX = ref()

    const initPieCharts = () => {
      // 饼图
      const mpieCharts = pieCharts.value
      if (mpieCharts && mPieData.value) {
        console.log('invert detail pie data', mPieData.value)
        const pieChart = echarts.init(mpieCharts)
        // 绘制饼状图
        pieChart.setOption({
          title: {
            text: '各损失权重重要性的饼状图',
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
      // 柱状图
      const mHistogramCharts = histogramCharts.value
      if (mHistogramCharts) {
        const histogramChart = echarts.init(mHistogramCharts)
        // 绘制柱状图
        histogramChart.setOption({
          title: {
            left: 'left',
            text: '各损失绝对损失百分数的柱状图',
            textStyle: {
              color: '#fff'
            },
            padding: [20, 0, 0, 40]
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            },
            formatter: function(params: any) {
              var relVal = params[0].name
              for (var i = 0, l = params.length; i < l; i++) {
                relVal += `<p>${params[i].marker}${params[i].seriesName}：&nbsp;<b>${params[i].value}%</b></p>`
              }
              return relVal
            }
          },
          legend: {
            data: (mHistogramData.value as DailyPvStringLosses[]).map((item) => {
              return item.lossName
            }),
            textStyle: {
              color: '#fff'
            },
            orient: 'horizontal',
            x: 'center',
            y: 'bottom'
          },
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center'
          },
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: mHistogramDataX.value
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: (mHistogramData.value as DailyPvStringLosses[])[0].lossName,
              type: 'bar',
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              data: (mHistogramData.value as DailyPvStringLosses[])[0].lossPercent.map((item) => {
                if (item != null) {
                  return (item * 100).toFixed(2)
                } else {
                  return null
                }
              })
            },
            {
              name: (mHistogramData.value as DailyPvStringLosses[])[1].lossName,
              type: 'bar',
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              data: (mHistogramData.value as DailyPvStringLosses[])[1].lossPercent.map((item) => {
                if (item != null) {
                  return (item * 100).toFixed(2)
                } else {
                  return null
                }
              })
            },
            {
              name: (mHistogramData.value as DailyPvStringLosses[])[2].lossName,
              type: 'bar',
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              data: (mHistogramData.value as DailyPvStringLosses[])[2].lossPercent.map((item) => {
                if (item != null) {
                  return (item * 100).toFixed(2)
                } else {
                  return null
                }
              })
            },
            {
              name: (mHistogramData.value as DailyPvStringLosses[])[3].lossName,
              type: 'bar',
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              data: (mHistogramData.value as DailyPvStringLosses[])[3].lossPercent.map((item) => {
                if (item != null) {
                  return (item * 100).toFixed(2)
                } else {
                  return null
                }
              })
            },
            {
              name: (mHistogramData.value as DailyPvStringLosses[])[4].lossName,
              type: 'bar',
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              data: (mHistogramData.value as DailyPvStringLosses[])[4].lossPercent.map((item) => {
                if (item != null) {
                  console.log('item:', item)
                  return (item * 100).toFixed(2)
                } else {
                  return null
                }
              })
            },
            {
              name: (mHistogramData.value as DailyPvStringLosses[])[5].lossName,
              type: 'bar',
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              data: (mHistogramData.value as DailyPvStringLosses[])[5].lossPercent.map((item) => {
                if (item != null) {
                  return (item * 100).toFixed(2)
                } else {
                  return null
                }
              })
            },
            {
              name: (mHistogramData.value as DailyPvStringLosses[])[6].lossName,
              type: 'bar',
              barGap: 0,
              emphasis: {
                focus: 'series'
              },
              data: (mHistogramData.value as DailyPvStringLosses[])[6].lossPercent.map((item) => {
                if (item != null) {
                  return (item * 100).toFixed(2)
                } else {
                  return null
                }
              })
            }
          ]
        })
      }
      // 折线图
      const mlineCharts = lineCharts.value
      if (mlineCharts && mLineData.value && mLineDataX.value) {
        const pieChart = echarts.init(mlineCharts)
        // 绘制折线图
        pieChart.setOption({
          title: {
            left: 'left',
            text: '各损失绝对损失百分数的历史趋势曲线',
            textStyle: {
              color: '#fff'
            },
            padding: [20, 0, 0, 40]
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
            },
            orient: 'horizontal',
            x: 'center',
            y: 'bottom'
          },
          grid: {
            bottom: '30%',
            containLabel: false
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
      // PR+健康度的历史趋势曲线
      const mPrAndHealthLineCharts = prAndHealthLineCharts.value
      if (mPrAndHealthLineCharts && mLinePrDatas.value && mLineHealthDatas.value) {
        const prAndHealthLineCharts = echarts.init(mPrAndHealthLineCharts)
        prAndHealthLineCharts.setOption({
          title: {
            left: 'left',
            text: 'PR和健康度历史曲线',
            textStyle: {
              color: '#fff'
            },
            padding: [20, 0, 0, 40]
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'line'
            },
            formatter: function(params: any) {
              var relVal = params[0].name
              for (var i = 0, l = params.length; i < l; i++) {
                relVal += `<p>${params[i].marker}${params[i].seriesName}：&nbsp;<b>${params[i].value}%</b></p>`
              }
              return relVal
            }
          },
          legend: {
            textStyle: {
              color: '#fff'
            },
            orient: 'horizontal',
            x: 'center',
            y: 'bottom'
          },
          grid: {
            bottom: '20%',
            containLabel: false
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
    const store = useStore<GlobalDataProps>()
    const pvstringDetailProps = computed(() => {
      return store.state.inverterDetailProps
    })
    watch(pvstringDetailProps, () => {
      const pvstringDetailProps = store.state.inverterDetailProps
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
      mTempList.value = pvstringDetailProps.deviceDataOfToday?.map((item) => {
        return {
          name: 'a',
          value: [
            item.time,
            item.temperature
          ]
        }
      })
      initCharts()
    })

    const inverterEfficiency = computed(() => {
      return store.state.inverterEfficiency
    })
    watch(inverterEfficiency, () => {
      if (inverterEfficiency.value.dailyLossData != null) {
        const lossesTotal: number = inverterEfficiency.value.dailyLossData.map((a) => a.lossSum)
          .reduce(function (a, b) {
            return a + b
          })
        const lossesList = inverterEfficiency.value.dailyLossData.map((item) => {
          const percent = Percentage(item.lossSum, lossesTotal)
          return {
            name: item.lossName + '（' + percent + '%）',
            value: item.lossSum
          }
        })
        if (lossesList) {
          mPieData.value = lossesList
        }
      }
      if (inverterEfficiency.value.lossDate != null) {
        mLineDataX.value = inverterEfficiency.value.lossDate
      }
      if (inverterEfficiency.value.dailyLossData != null) {
        mHistogramData.value = inverterEfficiency.value.dailyLossData
      }
      if (inverterEfficiency.value.lossDate != null) {
        mHistogramDataX.value = inverterEfficiency.value.lossDate
      }
      if (inverterEfficiency.value.dailyLossData != null) {
        mLineData.value = inverterEfficiency.value.dailyLossData.map(item => {
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
      if (inverterEfficiency.value.prDatas != null) {
        mLinePrDatas.value = inverterEfficiency.value.prDatas.map((item) => {
          if (item != null) {
            return (item * 100).toFixed(2)
          } else {
            return null
          }
        })
      }
      if (inverterEfficiency.value.lossDate != null) {
        mLinePrAndHealthDatasX.value = inverterEfficiency.value.lossDate
      }
      if (inverterEfficiency.value.healthDatas != null) {
        mLineHealthDatas.value = inverterEfficiency.value.healthDatas.map((item) => {
          if (item != null) {
            return (item * 100).toFixed(2)
          } else {
            return null
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
      store.dispatch('getInverterDetail', { deviceId: route.params.id })
      // 获取逆变器设备能效
      store.dispatch('getInverterEfficiency', {
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

    const showMenu = ref('1')
    showMenu.value = `${route.params.type}`
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
      showMenu,
      pieCharts,
      histogramCharts,
      lineCharts,
      prAndHealthLineCharts,
      currentDeviceId
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
