<template>
  <div class="home">
    <div class="animate__animated animate__fadeInUp">浙江帷盛科技光伏电站</div>
    <div id="myChart" :style="{ width: '200px', height: '200px' }"></div>
    <div id="pieChart" :style="{ width: '350px', height: '300px' }"></div>
    <div>{{count}}</div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import request from '@/utils/request'

export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore<GlobalDataProps>()
    const count = computed(() => store.state.count)
    return {
      count
    }
  },
  mounted () {
    request({
      url: 'wids?key=d9fbda784ccf58fc4d686dbec6a77455',
      method: 'get'
    }).then((response: any) => {
      console.log('weather:' + response.reason)
    })

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
