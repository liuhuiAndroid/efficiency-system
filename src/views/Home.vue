<template>
  <div class="container">
    <div class="container__column">
      <table class="container__station">
        <tr>
          <td class="container__station__name">装机容量</td>
          <td class="container__station__value">{{powerStationInfo.capacity}}</td>
        </tr>
        <tr>
          <td class="container__station__name">当日发电量</td>
          <td class="container__station__value">{{powerStationInfo.powerToday}}</td>
        </tr>
        <tr>
          <td class="container__station__name">当月发电量</td>
          <td class="container__station__value">{{powerStationInfo.powerThisMonth}}</td>
        </tr>
        <tr>
          <td class="container__station__name">当年发电量</td>
          <td class="container__station__value">{{powerStationInfo.powerThisYear}}</td>
        </tr>
        <tr>
          <td class="container__station__name">累计发电量</td>
          <td class="container__station__value">{{powerStationInfo.powerTotal}}</td>
        </tr>
      </table>
      <div class="container__column__chart" ref="dailyCharts"></div>
      <div class="container__column__chart" ref="monthlyCharts"></div>
    </div>
    <div class="container__column">
      <div class="container__video">
        <img class="container__video__img" src="../assets/video_img.png"/>
      </div>
      <div id="pieChart" class="container__pie"></div>
    </div>
    <div class="container__column">
      <div class="container__weather">
        <h1>气象信息：</h1>
        <ul>
          <li><span>温度：{{meteoData.temperature}}</span><span>湿度：{{meteoData.humidity}}</span><span>压力：{{meteoData.pressure}}</span></li>
          <li><span>风向：{{meteoData.windDirection}}</span><span>风速：{{meteoData.windSpeed}}</span></li>
          <li><span>{{`POA(辐照度)：${meteoData.poa}`}}</span><span>{{`GHI(辐照度)：${meteoData.ghi}`}}</span></li>
        </ul>
      </div>
      <table class="container__device" border="1" v-if="deviceOverview">
        <tr v-if="deviceOverview[0]">
          <td>{{deviceOverview[0][0]}}</td>
          <td>{{deviceOverview[0][1]}}</td>
          <td>{{deviceOverview[0][2]}}</td>
          <td>{{deviceOverview[0][3]}}</td>
          <td>{{deviceOverview[0][4]}}</td>
        </tr>
        <tr v-if="deviceOverview[1]">
          <td>{{deviceOverview[1][0]}}</td>
          <td>{{deviceOverview[1][1]}}</td>
          <td>{{deviceOverview[1][2]}}</td>
          <td>{{deviceOverview[1][3]}}</td>
          <td>{{deviceOverview[1][4]}}</td>
        </tr>
        <tr v-if="deviceOverview[2]">
          <td>{{deviceOverview[2][0]}}</td>
          <td>{{deviceOverview[2][1]}}</td>
          <td>{{deviceOverview[2][2]}}</td>
          <td>{{deviceOverview[2][3]}}</td>
          <td>{{deviceOverview[2][4]}}</td>
        </tr>
        <tr v-if="deviceOverview[3]">
          <td>{{deviceOverview[3][0]}}</td>
          <td>{{deviceOverview[3][1]}}</td>
          <td>{{deviceOverview[3][2]}}</td>
          <td>{{deviceOverview[3][3]}}</td>
          <td>{{deviceOverview[3][4]}}</td>
        </tr>
        <tr v-if="deviceOverview[4]">
          <td>{{deviceOverview[4][0]}}</td>
          <td>{{deviceOverview[4][1]}}</td>
          <td>{{deviceOverview[4][2]}}</td>
          <td>{{deviceOverview[4][3]}}</td>
          <td>{{deviceOverview[4][4]}}</td>
        </tr>
      </table>
      <div class="container__column__chart" ref="stationPacCharts"></div>
    </div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore<GlobalDataProps>()
    const powerStationInfo = computed(() => store.state.powerStationInfo)
    const meteoData = computed(() => store.state.meteoData)
    const stationDailyPower = computed(() => store.state.stationDailyPower)
    const stationMonthlyPower = computed(() => store.state.stationMonthlyPower)
    const deviceOverviewCom = computed(() => store.state.deviceOverview)
    const stationTodayPac = computed(() => store.state.stationTodayPac)
    const dailyCharts = ref(null)
    const monthlyCharts = ref(null)
    const stationPacCharts = ref(null)
    const mDailyList = ref()
    const mMonthlyListX = ref()
    const mMonthlyListY = ref()
    const deviceOverview = ref()
    const mStationTodayPacList = ref()

    watch(deviceOverviewCom, () => {
      deviceOverview.value = store.state.deviceOverview
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
          xAxis: {
            type: 'category',
            data: mMonthlyListX.value
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: mMonthlyListY.value,
            type: 'bar'
          }]
        })
      }
    }

    const initStationTodayPacCharts = () => {
      // 月发电量
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
          xAxis: {
            type: 'time', // 时间轴
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: function (value:any) {
                console.log('value', value)
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
            data: mStationTodayPacList.value,
            areaStyle: {},
            showSymbol: false,
            hoverAnimation: false
          }]
        })
      }
    }

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
    watch(stationMonthlyPower, () => {
      const stationMonthlyPower = store.state.stationMonthlyPower
      mMonthlyListX.value = stationMonthlyPower.map((item) => {
        return item.timely
      })
      mMonthlyListY.value = stationMonthlyPower.map((item) => {
        return item.actualPower
      })
      initMonthlyCharts()
    })
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
      if (stationTodayPacList) {
        mStationTodayPacList.value = stationTodayPacList
      }
      console.log('mStationTodayPacList.value', mStationTodayPacList.value)
      initStationTodayPacCharts()
    })
    onMounted(() => {
      // 获取电站信息
      store.dispatch('getPowerStationInfo')
      // 获取当前气象数据
      store.dispatch('getMeteoData')
      // 获取电站每日发电量（30天以内）
      store.dispatch('getStationDailyPower')
      // 获取电站每月发电量（当年）
      store.dispatch('getStationMonthlyPower')
      // 获取电站设备概况
      store.dispatch('getDeviceOverview')
      // 获取当日电站功率
      store.dispatch('getStationTodayPac')

      // 饼状图
      const pieChartEle = document.getElementById('pieChart')
      if (pieChartEle) {
        const pieChart = echarts.init(pieChartEle)
        // 绘制饼状图
        pieChart.setOption({
          title: {
            text: '12月电站能效损失比例饼状图',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item'
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
              name: '访问来源',
              type: 'pie',
              radius: '50%',
              label: {
                color: '#FFF'
              },
              data: [
                { value: 63, name: '灰尘损失' },
                { value: 7, name: '高温损失' },
                { value: 20, name: '预期遮挡' },
                { value: 21, name: '组件衰减' },
                { value: 12, name: '非预期遮挡' },
                { value: 9, name: '异常损失' }
              ]
            }
          ]
        })
      }
    })
    return {
      powerStationInfo,
      meteoData,
      dailyCharts,
      monthlyCharts,
      deviceOverview,
      stationPacCharts
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  margin-left: 2rem;
  margin-top: .2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  flex-grow: 1;
  overflow-y: scroll;
  height: 8rem;
  &__column {
    flex: auto;
    display:flex;
    flex-direction: column;
    justify-content: center;
    &__chart {
      width: 5.5rem;
      height: 3rem;
      margin-left: .2rem;
    }
  }
  &__station {
    width: 4.6rem;
    line-height: .4rem;
    font-size: .22rem;
    text-align: center;
    margin-left: .2rem;
    margin-bottom: .2rem;
    tr {
      border-bottom: .02rem solid #64A396;
    }
    &__name {
      width: 1.6rem;
      color: #333;
      background-color: #A9CE98;
      font-weight: 800;
    }
    &__value {
      width: 3rem;
      color: #FFF;
      background-color: #4F917E;
      font-weight: 800;
    }
  }
  &__video {
    width: 4rem;
    &__img {
      width: 4rem;
      height: 3rem;
      margin-top: .1rem;
    }
  }
  &__weather {
    width: 5rem;
    height: 2.2rem;
    color: white;
    border: 1px solid #555468;
    background-color: #080245;
    h1 {
      font-size: 16px;
      font-weight: 400;
      margin: 15px;
    }
    ul {
      padding-left: .3rem;
      width: 4.5rem;
      list-style: none;
    }
    ul li span {
      line-height: .4rem;
      font-size: 14px;
      display: inline-block;
      margin-right: .2rem;
    }
    ul li span:last-child  {
      margin-right: .3rem;
    }
  }
  &__pie {
    width: 5rem;
    height: 4rem;
    margin-top: .2rem;
  }
  &__device {
    width: 5rem;
    margin-top: .4rem;
    background-color: #080245;
    border-color:#FFF;
    border-collapse: collapse;
    tr td {
      width: .1rem;
      line-height: .4rem;
      color: white;
      font-size: 14px;
      text-align: center;
      border:1px solid #FFF;
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
