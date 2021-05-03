<template>
  <div class="container">
    <div class="container__column">
      <station-info />
      <daily-power-charts class="container__column__chart"/>
      <monthly-power-charts class="container__column__chart"/>
      <pr-health-line-charts class="container__column__chart"/>
    </div>
    <div class="container__column">
      <video class="container__column__img" src="../assets/video/video.mp4" muted autoplay loop>
        您的浏览器不支持 video 标签。
      </video>
      <lose-pie-charts class="container__column__pie" />
    </div>
    <div class="container__column">
      <meteo-info />
      <device-overview class="container__column__device" />
      <today-pac-charts class="container__column__chart" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from 'vue'
import { GlobalDataProps } from '@/store'
import { useStore } from 'vuex'
import StationInfo from '@/components/home/StationInfo.vue'
import DailyPowerCharts from '@/components/home/DailyPowerCharts.vue'
import MonthlyPowerCharts from '@/components/home/MonthlyPowerCharts.vue'
import PrHealthLineCharts from '@/components/home/PrHealthLineCharts.vue'
import LosePieCharts from '@/components/home/LosePieCharts.vue'
import MeteoInfo from '@/components/home/MeteoInfo.vue'
import DeviceOverview from '@/components/home/DeviceOverview.vue'
import TodayPacCharts from '@/components/home/TodayPacCharts.vue'
import { currentTime, get30AgoTime } from '@/utils/DateUtils'

export default defineComponent({
  name: 'Home',
  components: {
    StationInfo,
    DailyPowerCharts,
    MonthlyPowerCharts,
    PrHealthLineCharts,
    LosePieCharts,
    MeteoInfo,
    DeviceOverview,
    TodayPacCharts
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    var refreshUI = function() {
      // 获取电站信息
      store.dispatch('getPowerStationInfo')
      // 获取电站能效
      store.dispatch('getStationEfficiency', {
        startTime: get30AgoTime(),
        endTime: currentTime()
      })
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
      // 获取电站能耗损失（30天以内）
      store.dispatch('getStationLosses')
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
    &__img {
      width: 4.8rem;
      height: 3.6rem;
      margin-top: .1rem;
    }
    &__chart {
      width: 5.5rem;
      height: 3rem;
      margin-left: .2rem;
    }
    &__pie {
      width: 5.5rem;
      height: 5.5rem;
      margin-top: .2rem;
    }
    &__device {
      width: 5rem;
      margin-top: .4rem;
      background-color: #080245;
      border-color:#FFF;
      border-collapse: collapse;
      margin-bottom: .2rem;
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
