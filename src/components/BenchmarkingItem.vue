<template>
  <div class="container">
    <div class="container__head">
      <div class="container__title">
        <p>
          {{benchMarkList.deviceName}}：
          <span>电压：{{benchMarkList.u}}</span>
          <span>电流：{{benchMarkList.i}}</span>
          <span>功率：{{benchMarkList.p}}</span>
          <span>组件衰减率：{{benchMarkList.degradationRatio}}</span>
          <span>灰尘损失率：{{benchMarkList.dustCleanliness}}</span>
        </p>
      </div>
    </div>
    <div class="container__content">
      <div class="container__content__chart" ref="firstCharts"></div>
      <div class="container__content__chart" ref="secondCharts"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, onMounted, ref, watch } from 'vue'
import { GlobalDataProps, BenchMarkList } from '@/store'
import { useStore } from 'vuex'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'Benchmarking',
  props: {
    detail: {
      detail: Object as PropType<BenchMarkList>,
      required: true
    }
  },
  setup(props) {
    const benchMarkList = props.detail as BenchMarkList
    const mFigureDatas01 = ref()
    const mFigureDatas02 = ref()
    const mFigure2Datas01 = ref()
    const mFigure2Datas02 = ref()
    const mFigure2Datas01Title = ref()
    const mFigure2Datas02Title = ref()

    mFigureDatas01.value = benchMarkList.figure1.figureDatas[0].data.map((item, index) => {
      return [
        item,
        benchMarkList.figure1.figureDatas[1].data[index]
      ]
    })
    mFigureDatas02.value = benchMarkList.figure1.figureDatas[0].data.map((item, index) => {
      return [
        item,
        benchMarkList.figure1.figureDatas[2].data[index]
      ]
    })
    mFigure2Datas01.value = benchMarkList.figure2.figureDatas[0].data.map((item, index) => {
      if (benchMarkList.figure2.figureDatas[1].data[index] === 'NaN') {
        benchMarkList.figure2.figureDatas[1].data[index] = '0'
      }
      return {
        name: '',
        value: [
          item.replace(':00.000', ''),
          Number(benchMarkList.figure2.figureDatas[1].data[index])
        ]
      }
    })
    mFigure2Datas02.value = benchMarkList.figure2.figureDatas[0].data.map((item, index) => {
      if (benchMarkList.figure2.figureDatas[2].data[index] === 'NaN') {
        benchMarkList.figure2.figureDatas[2].data[index] = '0'
      }
      return {
        name: '',
        value: [
          item.replace(':00.000', ''),
          Number(benchMarkList.figure2.figureDatas[2].data[index])
        ]
      }
    })
    console.log('mFigure2Datas01', mFigure2Datas01.value)
    console.log('mFigure2Datas02', mFigure2Datas02.value)
    mFigure2Datas01Title.value = benchMarkList.figure2.figureDatas[1].title
    mFigure2Datas02Title.value = benchMarkList.figure2.figureDatas[2].title
    const firstCharts = ref(null)
    const secondCharts = ref(null)
    // echart 初始化
    const initCharts = () => {
      const mfirstCharts = firstCharts.value
      if (mfirstCharts) {
        var myfirstCharts = echarts.init(mfirstCharts)
        // 绘制图表
        myfirstCharts.setOption({
          xAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          yAxis: {
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            }
          },
          series: [{
            data: mFigureDatas01.value,
            type: 'scatter'
          },
          {
            data: mFigureDatas02.value,
            type: 'scatter'
          }]
        })
      }

      const msecondCharts = secondCharts.value
      if (msecondCharts) {
        var mysecondCharts = echarts.init(msecondCharts)
        // 绘制图表
        mysecondCharts.setOption({
          title: {
            left: 'left',
            text: '功率（kW）',
            textStyle: {
              color: '#fff'
            },
            padding: [20, 0, 0, 0]
          },
          legend: {
            data: [mFigure2Datas01Title.value, mFigure2Datas02Title.value],
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            type: 'time', // 时间轴
            splitLine: {
              show: false
            },
            axisLabel: {
              formatter: function (value: any) {
                var data = new Date(value)
                var hours = data.getHours()
                var minutes = data.getMinutes()
                var hoursString = hours + ''
                var minutesString = minutes + ''
                if (hours < 10) {
                  hoursString = '0' + hours
                }
                if (minutes < 10) {
                  minutesString = '0' + minutes
                }
                return hoursString + ':' + minutesString
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
            name: mFigure2Datas01Title.value,
            type: 'line',
            smooth: true,
            data: mFigure2Datas01.value,
            areaStyle: {},
            showSymbol: false,
            hoverAnimation: false
          }, {
            name: mFigure2Datas02Title.value,
            type: 'line',
            smooth: true,
            data: mFigure2Datas02.value,
            showSymbol: false,
            hoverAnimation: false
          }]
        })
      }
    }
    onMounted(() => {
      initCharts()
    })
    return {
      firstCharts,
      secondCharts,
      benchMarkList
    }
  }
})
</script>

<style lang="scss" scoped>
.container{
  &__content{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    margin-top: .5rem;
    &__chart{
      width: 600px;
      height: 300px;
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
