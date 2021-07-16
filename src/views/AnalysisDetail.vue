<template>
<div class="main-right">
  <div class="main-right-header">
    <div class="surroundings">
      <div class="surroundings-line1">
        环境数据：
        <span v-if="meteoData.temperature">{{`温度：${meteoData.temperature}`}}</span>
        <span>{{`湿度：${meteoData.humidity}`}}</span>
        <span>{{`压力：${meteoData.pressure}`}}</span>
        <span>{{`风向：${meteoData.windDirection}`}}</span>
        <span>{{`风速：${meteoData.windSpeed}`}}</span>
        <span>{{`POA(辐照度)：${meteoData.poa}`}}</span>
        <span>{{`GHI(辐照度)：${meteoData.ghi}`}}</span>
      </div>
    </div>
  </div>
  <div class="main-right-center">
    <div class="main-center-warp">
      <div class="main-center-box">
        <div class="center-item" v-for="item in pvStringEfficiencyAnalysis"  :key="item.lossType">
          <analysis-list :title="item.lossName" :list="item.devices" :totalCount="item.totalCount" :currentTypeId="currentTypeId" :lossType="item.lossType"/>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance, ref, watch, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { GlobalDataProps, PvStringEfficiencyAnalysis } from '@/store'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import mitt from 'mitt'
import { currentTime, get30AgoTime } from '@/utils/DateUtils'
import AnalysisList from '@/components/AnalysisList.vue'

export const emitter = mitt()

export default defineComponent({
  name: 'Monitor',
  components: {
    AnalysisList
  },
  setup () {
    const route = useRoute()
    var currentTypeId = route.params.id

    const currentInstance = getCurrentInstance()
    const logout = () => {
      if (currentInstance) {
        currentInstance.appContext.app.config.globalProperties.$confirm(
          '退出系统?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          console.log('退出')
        }).catch(() => {
          console.log('取消')
        })
      }
    }
    const sendData = {
      pageNum: 1,
      pageSize: 5,
      startTime: get30AgoTime(),
      endTime: currentTime()
    }
    const store = useStore<GlobalDataProps>()
    const meteoData = computed(() => store.state.meteoData)

    const pvStringEfficiencyAnalysis = computed(() => {
      return store.state.pvStringEfficiencyAnalysis
    })

    var refreshUI = function() {
      console.log('currentTypeId:' + currentTypeId)
      if (currentTypeId === '1') {
        // 获取升压变列表
        store.dispatch('getTransformerEfficiencyAnalysis', sendData)
      } else if (currentTypeId === '2') {
        // 获取逆变器列表
        store.dispatch('getInverterEfficiencyAnalysis', sendData)
      } else if (currentTypeId === '3') {
        // 获取汇流箱列表
        store.dispatch('getCombinerBoxEfficiencyAnalysis', sendData)
      } else if (currentTypeId === '4') {
        // 获取光伏组串列表
        store.dispatch('getPvStringEfficiencyAnalysis', sendData)
      }
      // 获取当前气象数据
      store.dispatch('getMeteoData')
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

    const hideOnSinglePage = true
    const pageSize = 5
    const currentlossType = ref(-1)
    const handleCurrentChangeCallback = (e: any) => {
      console.log('handleCurrentChangeCallback analysis', e.currentPage)
      sendData.pageNum = e.currentPage
      currentlossType.value = e.lossType
      sendData.pageNum = e.currentPage.value
      if (currentTypeId === '1') {
        // 获取升压变列表
        store.dispatch('getTransformerEfficiencyAnalysis', {
          lossType: e.lossType,
          pageNum: e.currentPage,
          pageSize: 5,
          startTime: get30AgoTime(),
          endTime: currentTime()
        })
      } else if (currentTypeId === '2') {
        // 获取逆变器列表
        store.dispatch('getInverterEfficiencyAnalysis', {
          lossType: e.lossType,
          pageNum: e.currentPage,
          pageSize: 5,
          startTime: get30AgoTime(),
          endTime: currentTime()
        })
      } else if (currentTypeId === '3') {
        // 获取汇流箱列表
        store.dispatch('getCombinerBoxEfficiencyAnalysis', {
          lossType: e.lossType,
          pageNum: e.currentPage,
          pageSize: 5,
          startTime: get30AgoTime(),
          endTime: currentTime()
        })
      } else if (currentTypeId === '4') {
        // 获取光伏组串列表
        store.dispatch('getPvStringEfficiencyAnalysis', {
          lossType: e.lossType,
          pageNum: e.currentPage,
          pageSize: 5,
          startTime: get30AgoTime(),
          endTime: currentTime()
        })
      }
    }
    emitter.on('handleCurrentChange', handleCurrentChangeCallback)

    onUnmounted(() => {
      emitter.off('handleCurrentChange', handleCurrentChangeCallback)
    })
    return {
      logout,
      meteoData,
      pvStringEfficiencyAnalysis,
      currentTypeId,
      hideOnSinglePage,
      pageSize
    }
  }
})
</script>

<style lang="scss" scoped>
.main-right{
  position: absolute;
  top: 1rem;
  bottom: .2rem;
  left: 2.2rem;
  right: 0.2rem;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #00B1FF;
}

.main-right-header{
  width: 100%;
  padding: 0 0.2rem;
  box-sizing: border-box;
  height: 0.7rem;
  background: #014F71;
  font-size: 0.16rem;
  color: #fff;
  border-bottom: 1px solid #00B1FF;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.main-right-header div{
  margin-right: 0.1rem;
}
.surroundings div span{
  margin-right: 0.5rem;
}
.main-right-center{
  width: 100%;
  overflow: hidden;
}
.main-center-warp{
  position: absolute;
  top: 0.7rem;
  bottom: 0.2rem;
  left: 0;
  right: 0;
  overflow-y: scroll;
}

.main-center-warp::-webkit-scrollbar{
  background-color: #2b2f31;
  border-radius: 3px;
  width: 5px;
}
.main-center-warp::-webkit-scrollbar-thumb{
  border-radius: 3px;
  background-color: #00B1FF;
}

.main-center-box{
  width: 100%;
  overflow: hidden;
}
.select-main{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.surroundings{
  display: flex;
  flex-direction: column;
}

.surroundings-line2{
  margin-top: .1rem;
  margin-left: .9rem;
}

.select-item li{
  width: 2rem;
  display: flex;
  height: 0.5rem;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  padding: 0 0.1rem;
  box-sizing: border-box;
  background: #00B1FF;
}

.select-item li:hover{
  background: #01628D;
}

</style>
