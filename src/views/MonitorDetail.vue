<template>
<div class="container">
  <div class="container__title">
    <p>{{pvstringDetailProps.deviceName}}：<span>电压：{{pvstringDetailProps.u}}</span><span>电流：{{pvstringDetailProps.i}}</span><span>功率：{{pvstringDetailProps.p}}</span></p>
  </div>
  <div class="container__content">
    <div class="container__content__chart" ref="uCharts"></div>
    <div class="container__content__chart" ref="iCharts"></div>
    <div class="container__content__chart" ref="pCharts"></div>
    <div class="container__content__chart" ref="tempCharts"></div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, reactive, ref, watch } from 'vue'
// 获取路由信息
import { useRoute } from 'vue-router'
import { GlobalDataProps, PvstringDetailProps } from '../store'
import { useStore } from 'vuex'
import * as echarts from 'echarts'

export default defineComponent({
  setup() {
    const uCharts = ref(null)
    const iCharts = ref(null)
    const pCharts = ref(null)
    const mTimeList = ref<string[]>()
    const mUList = ref<number[]>()
    const mIList = ref<number[]>()
    const mPList = ref<number[]>()
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
            type: 'category',
            data: mTimeList.value
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} V'
            }
          },
          series: [{
            data: mUList.value,
            type: 'line',
            smooth: true
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
            type: 'category',
            data: mTimeList.value
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
            smooth: true
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
            type: 'category',
            data: mTimeList.value
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} kW'
            }
          },
          series: [{
            data: mPList.value,
            type: 'line',
            smooth: true
          }]
        })
      }
    }
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const pvstringDetailProps = computed(() => store.state.pvstringDetailProps)
    watch(pvstringDetailProps, () => {
      const pvstringDetailProps = store.state.pvstringDetailProps
      const timeList = pvstringDetailProps.deviceDataOfToday?.map((item) => item.time)
      if (timeList) {
        mTimeList.value = timeList
      }
      const uList = pvstringDetailProps.deviceDataOfToday?.map((item) => item.u)
      if (uList) {
        mUList.value = uList
      }
      const iList = pvstringDetailProps.deviceDataOfToday?.map((item) => item.i)
      if (iList) {
        mIList.value = iList
      }
      const pList = pvstringDetailProps.deviceDataOfToday?.map((item) => item.p)
      if (pList) {
        mPList.value = pList
      }
      initCharts()
    })
    onMounted(() => {
      // 获取当前气象数据
      store.dispatch('getPvStringDetail', { deviceId: route.params.id })
    })
    return {
      pvstringDetailProps,
      uCharts,
      iCharts,
      pCharts
    }
  }
})
</script>

<style lang="scss" scoped>
h1{
  color: white;
}
.container{
  margin-left: 2rem;
  &__title{
    height: 0.3rem;
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
  &__content{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    &__chart{
      width: 600px;
      height: 300px;
    }
  }
}
</style>
