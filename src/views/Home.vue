<template>
  <div class="home">
    <div id="myChart" :style="{ width: '200px', height: '200px' }"></div>
    <div id="pieChart" :style="{ width: '350px', height: '300px' }"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore<GlobalDataProps>()
    // 请求数据
    store.dispatch('getHomeData')
    const homeData = computed(() => store.state.homeData)
    // const { homeData } = toRefs(store.state)
    return {
      homeData
    }
  },
  mounted () {
    const myChartEle = document.getElementById('myChart')
    if (myChartEle) {
      const myChart = echarts.init(myChartEle)
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      })
    }

    // 饼状图
    const pieChartEle = document.getElementById('pieChart')
    if (pieChartEle) {
      const pieChart = echarts.init(pieChartEle)
      // 绘制饼状图
      pieChart.setOption({
        title: {
          text: '12月电站能效损失比例饼状图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          x: 'center',
          y: 'bottom'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 63, name: '灰尘损失' },
              { value: 7, name: '高温损失' },
              { value: 20, name: '预期遮挡' },
              { value: 21, name: '组件衰减' },
              { value: 12, name: '非预期遮挡' },
              { value: 9, name: '异常损失' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
})
</script>

<style lang="scss" scoped>
h1{
  color: white;
}
</style>
