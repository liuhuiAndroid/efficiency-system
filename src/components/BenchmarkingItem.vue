<template>
  <div class="item">
    <div class="item__head">
      <router-link :to="`/pvstringdetail/${benchMarkList.deviceId}`">
        <img src="@/assets/Hosting4.png" alt=""/>
      </router-link>
      <div class="item__head__title">
        <p>
          标杆组串{{benchMarkList.deviceName}}：
          <span>电压：{{benchMarkList.u}}</span>
          <span>电流：{{benchMarkList.i}}</span>
          <span>功率：{{benchMarkList.p}}</span>
          <span>组件衰减率：{{benchMarkList.degradationRatio}}</span>
          <span>灰尘损失率：{{benchMarkList.dustCleanliness}}</span>
        </p>
      </div>
    </div>
    <div class="item__content">
      <div class="item__content__chart" ref="firstCharts"></div>
      <div class="item__content__chart" ref="secondCharts"></div>
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
    const mFigureDatas00Title = ref()
    const mFigureDatas01Title = ref()
    const mFigureDatas02Title = ref()
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
    mFigureDatas00Title.value = benchMarkList.figure1.figureDatas[0].title
    mFigureDatas01Title.value = benchMarkList.figure1.figureDatas[1].title
    mFigureDatas02Title.value = benchMarkList.figure1.figureDatas[2].title
    mFigure2Datas01.value = benchMarkList.figure2.figureDatas[0].data.map((item, index) => {
      if (benchMarkList.figure2.figureDatas[1].data[index] === 'NaN') {
        benchMarkList.figure2.figureDatas[1].data[index] = '0'
      }
      return {
        name: '',
        value: [
          item.replace(':00.000', '').replace('+08', ''),
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
          item.replace(':00.000', '').replace('+08', ''),
          Number(benchMarkList.figure2.figureDatas[2].data[index])
        ]
      }
    })
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
          title: {
            text: '发电数学模型曲线',
            textStyle: {
              color: '#fff'
            },
            padding: [20, 0, 0, 0]
          },
          legend: {
            data: [mFigureDatas01Title.value, mFigureDatas02Title.value],
            textStyle: {
              color: '#fff'
            }
          },
          xAxis: {
            name: mFigureDatas00Title.value,
            nameLocation: 'center',
            nameGap: 30,
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
            name: mFigureDatas01Title.value,
            data: mFigureDatas01.value,
            symbolSize: 5,
            type: 'scatter'
          },
          {
            name: mFigureDatas02Title.value,
            data: mFigureDatas02.value,
            symbolSize: 5,
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
            text: '组串功率（kW）',
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
.item{
  margin: .1rem;
  border: 1px solid #00B1FF;
  border-radius: .1rem;
  &__head{
    display: flex;
    flex-direction: row;
    margin-left: .5rem;
    margin-top: .2rem;
    &__title{
      display: flex;
      flex-direction: column;
      margin-left: .3rem;
      margin-top: .1rem;
      p{
        width: 100%;
        height: 0.3rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: white;
        font-size: .2rem;
      }
      span{
        display: inline-block;
        margin-left: 0.4rem;
        color: white;
        font-size: .2rem;
      }
    }
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
