<template>
    <div ref="pieCharts"></div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'LosePieCharts',
  setup() {
    const pieCharts = ref(null)
    onMounted(() => {
      initLosePieCharts()
    })
    const initLosePieCharts = () => {
      // 饼状图
      const mPieCharts = pieCharts.value
      if (mPieCharts) {
        const pieChart = echarts.init(mPieCharts)
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
    }
    return {
      pieCharts
    }
  }
})
</script>

<style lang="sass" scoped>

</style>
