<template>
<div class="container">
  <div class="container__head">
    <div v-if="pvstringDetailProps.deviceId==currentDeviceId">
      <img v-if="pvstringDetailProps.status==0" src="../assets/Hosting4.png" alt="">
      <img v-else-if="pvstringDetailProps.status==1" src="../assets/Hosting4_error.png" alt="">
      <img v-else src="../assets/Hosting4_warning.png" alt="">
    </div>
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
          <span v-if="meteoData.temperature" style="margin-left: 0.2rem;">{{`温度：${meteoData.temperature}`}}</span>
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
    <img class="container__health" src="@/assets/icon_health_btn_1.png" alt="" @click="showInfo()">
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
<teleport to='#app'>
    <div class="box" v-show="show">
      <div class="mask">
      </div>
      <div class="showInfo">
          <UploadWindow :pvstringDetailProps="pvstringDetailProps" :currentDeviceId="currentDeviceId" @key="receiveflag"/>
      </div>
    </div>
  </teleport>
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
import UploadWindow from '@/components/UploadWindow.vue'
export default defineComponent({
  components: { UploadWindow },
  setup() {
    const route = useRoute()
    var currentDeviceId = route.params.id

    const min = `${currentTime()} 00:00:00`
    const max = `${currentTime()} 24:00:00`

    const uCharts = ref(null)
    const iCharts = ref(null)
    const pCharts = ref(null)
    const tempCharts = ref(null)
    const pieCharts = ref(null)
    const histogramCharts = ref(null)
    const lineCharts = ref(null)
    const prAndHealthLineCharts = ref(null)
    const mUList = ref()
    const mIList = ref()
    const mPList = ref()
    const mTempList = ref()
    const mPieData = ref()
    const mHistogramDataX = ref()
    const mHistogramData = ref()
    const mLineDataX = ref()
    const mLineData = ref()
    const mLinePrDatas = ref()
    const mLineHealthDatas = ref()
    const mLinePrAndHealthDatasX = ref()
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
      if (mpieCharts && mPieData.value) {
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
        mHistogramData.value = pvStringLosses.value.dailyLossData
      }
      if (pvStringLosses.value.lossDate != null) {
        mHistogramDataX.value = pvStringLosses.value.lossDate
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
      if (pvStringLosses.value.prDatas != null) {
        mLinePrDatas.value = pvStringLosses.value.prDatas.map((item) => {
          if (item != null) {
            return (item * 100).toFixed(2)
          } else {
            return null
          }
        })
      }
      if (pvStringLosses.value.lossDate != null) {
        mLinePrAndHealthDatasX.value = pvStringLosses.value.lossDate
      }
      if (pvStringLosses.value.healthDatas != null) {
        mLineHealthDatas.value = pvStringLosses.value.healthDatas.map((item) => {
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

    const refreshUI = function() {
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

    var showMenu = ref('1')
    if (route.params.type !== undefined && route.params.type !== '') {
      console.log('route.params.type', route.params.type)
      showMenu.value = `${route.params.type}`
    } else {
      console.log('route.params.type', route.params.type)
    }
    function handleSelect(key: string, keyPath: string) {
      if (key === undefined || key === '') {
        showMenu.value = '1'
      } else {
        showMenu.value = key
      }
      console.log('showMenu', showMenu)
    }
    const show = ref(false)
    const showInfo = () => {
      show.value = true
    }
    const receiveflag = (e:boolean) => {
      show.value = e
    }
    return {
      show,
      showInfo,
      pvstringDetailProps,
      uCharts,
      iCharts,
      pCharts,
      tempCharts,
      pieCharts,
      histogramCharts,
      lineCharts,
      prAndHealthLineCharts,
      meteoData,
      handleSelect,
      showMenu,
      currentDeviceId,
      receiveflag
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
  &__health{
    position: absolute;
    right: .2rem;
    z-index: 100;
    width: 110px;
    height: 41px;
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
.box {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}
.showInfo {
  z-index: 100;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  width: 340px;
  height: 300px;
}
.mask {
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(58, 1, 1, 0.747);
  opacity: 0.6;
}
</style>
