<template>
  <div class="home">
    <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  mounted() {
      const myChartEle = document.getElementById("myChart");
      if(myChartEle){
        let myChart = echarts.init(myChartEle);
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
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
      }
  },
});
</script>
