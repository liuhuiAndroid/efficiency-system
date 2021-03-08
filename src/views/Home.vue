<template>
  <div class="container">
    <div class="container__column">
      <station-info />
      <daily-power-charts class="container__column__chart"/>
      <monthly-power-charts class="container__column__chart"/>
    </div>
    <div class="container__column">
      <div class="container__video">
        <img class="container__video__img" src="../assets/video_img.png"/>
      </div>
      <div id="pieChart" class="container__pie"></div>
    </div>
    <div class="container__column">
      <meteo-info />
      <device-overview class="container__device" />
      <today-pac-charts class="container__column__chart2" />
    </div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'
import StationInfo from '@/components/home/StationInfo.vue'
import DailyPowerCharts from '@/components/home/DailyPowerCharts.vue'
import MonthlyPowerCharts from '@/components/home/MonthlyPowerCharts.vue'
import MeteoInfo from '@/components/home/MeteoInfo.vue'
import DeviceOverview from '@/components/home/DeviceOverview.vue'
import TodayPacCharts from '@/components/home/TodayPacCharts.vue'

export default defineComponent({
  name: 'Home',
  components: {
    StationInfo,
    DailyPowerCharts,
    MonthlyPowerCharts,
    MeteoInfo,
    DeviceOverview,
    TodayPacCharts
  },
  setup() {
    const store = useStore<GlobalDataProps>()
    onMounted(() => {
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
    &__chart2 {
      width: 5.5rem;
      height: 3rem;
      margin-left: .2rem;
      margin-top: .2rem;
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
