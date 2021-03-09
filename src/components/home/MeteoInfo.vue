<template>
    <div class="weather">
        <h1>气象信息：</h1>
        <ul>
            <li><span>温度：{{meteoData.temperature}}</span><span>湿度：{{meteoData.humidity}}</span><span>压力：{{meteoData.pressure}}</span></li>
            <li><span>风向：{{meteoData.windDirection}}</span><span>风速：{{meteoData.windSpeed}}</span></li>
            <li><span>{{`POA(辐照度)：${meteoData.poa}`}}</span><span>{{`GHI(辐照度)：${meteoData.ghi}`}}</span></li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'MeteoInfo',
  setup() {
    const store = useStore<GlobalDataProps>()
    const meteoData = computed(() => store.state.meteoData)
    return {
      meteoData
    }
  }
})
</script>

<style lang="scss" scoped>
.weather {
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
</style>
