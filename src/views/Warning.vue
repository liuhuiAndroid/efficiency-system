<template>
<div class="main-right">
  <div class="main-right-header">
    <div class="select-main">
      设备类型：
      <dropdown :title="deviceInfoChoose.deviceType">
        <dropdown-item v-for="item in deviceInfos" :key="item.deviceTypeCode" @click="handleDeviceInfoChoose(item)">
          <span>{{item.deviceType}}</span><span>({{item.deviceCount}})</span>
        </dropdown-item>
      </dropdown>
    </div>
    <div class="select-main">
      设备状态：
      <dropdown :title="deviceStatusInfoChoose.deviceStauts">
        <dropdown-item v-for="item in dviceStatusInfos" :key="item.deviceStautsCode" @click="handleDeviceStatusInfoChoose(item)">
          <span>{{item.deviceStauts}}</span><span>({{item.deviceCount}})</span>
        </dropdown-item>
      </dropdown>
    </div>
    <div class="surroundings">
      <div class="surroundings-line1">
        环境数据：
        <span v-if="meteoData.temperature">{{`温度：${meteoData.temperature}`}}</span>
        <span>{{`湿度：${meteoData.humidity}`}}</span>
        <span>{{`压力：${meteoData.pressure}`}}</span>
        <span>{{`风向：${meteoData.windDirection}`}}</span>
        <span>{{`风速：${meteoData.windSpeed}`}}</span>
      </div>
      <div class="surroundings-line2">
        <span>{{`POA(辐照度)：${meteoData.poa}`}}</span>
        <span>{{`GHI(辐照度)：${meteoData.ghi}`}}</span>
      </div>
    </div>
  </div>
    <div class="main-right-center">
      <div class="main-center-warp">
        <div class="main-center-box">
          <monitor-transformer-list v-show="deviceInfoChoose.deviceTypeCode == 4 || deviceInfoChoose.deviceTypeCode == 0" :title="transformerTitle" :list="transformerListInfo.transformerInfos" :totalCount="transformerListInfo.totalCount"/>
          <monitor-inverter-list v-show="deviceInfoChoose.deviceTypeCode == 3 || deviceInfoChoose.deviceTypeCode == 0" :title="inverterTitle" :list="inverterListInfo.inverterInfos" :totalCount="inverterListInfo.totalCount"/>
          <monitor-combiner-box-list v-show="deviceInfoChoose.deviceTypeCode == 2 || deviceInfoChoose.deviceTypeCode == 0" :title="combinerBoxTitle" :list="combinerBoxListInfo.combinerBoxInfos" :totalCount="combinerBoxListInfo.totalCount"/>
          <monitor-pv-string-list v-show="deviceInfoChoose.deviceTypeCode == 1 || deviceInfoChoose.deviceTypeCode == 0" :title="pvstringTitle" :list="pvstringListInfo.pvStringInfos" :totalCount="pvstringListInfo.totalCount"/>
      </div>
    </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance, ref, watch, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { GlobalDataProps, DeviceInfo, DeviceStatusInfo } from '@/store'
import { useStore } from 'vuex'
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import MonitorTransformerList from '@/components/MonitorTransformerList.vue'
import MonitorInverterList from '@/components/MonitorInverterList.vue'
import MonitorCombinerBoxList from '@/components/MonitorCombinerBoxList.vue'
import MonitorPvStringList from '@/components/MonitorPvStringList.vue'
import { emitter } from '@/views/Monitor.vue'

export default defineComponent({
  name: 'Warning',
  components: {
    Dropdown,
    DropdownItem,
    MonitorTransformerList,
    MonitorInverterList,
    MonitorCombinerBoxList,
    MonitorPvStringList
  },
  setup() {
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
    const deviceInfoChoose = ref<DeviceInfo>()
    deviceInfoChoose.value = {
      deviceType: '',
      deviceTypeCode: 0,
      deviceCount: 0
    }
    const deviceStatusInfoChoose = ref<DeviceStatusInfo>()
    deviceStatusInfoChoose.value = {
      deviceStauts: '',
      deviceStautsCode: 0,
      deviceCount: 0
    }
    const sendData = {
      deviceStatus: 0,
      pageNum: 1,
      pageSize: 5,
      isWarning: true
    }

    const store = useStore<GlobalDataProps>()
    const meteoData = computed(() => store.state.meteoData)
    const deviceInfos = computed(() => store.state.deviceInfos)
    const dviceStatusInfos = computed(() => store.state.dviceStatusInfos)
    // 升压变列表数据
    const transformerListInfo = computed(() => {
      return store.state.transformerListInfo
    })
    // 逆变器列表数据
    const inverterListInfo = computed(() => {
      return store.state.inverterListInfo
    })
    // 汇流箱列表数据
    const combinerBoxListInfo = computed(() => {
      return store.state.combinerBoxListInfo
    })
    // 光伏组串列表
    const pvstringListInfo = computed(() => {
      return store.state.pvstringListInfo
    })

    const handleDeviceInfoChoose = (item: DeviceInfo) => {
      deviceInfoChoose.value = item
      store.dispatch('getDeviceStatusInfo', {
        deviceTypeCode: deviceInfoChoose.value.deviceTypeCode,
        isWarning: true
      })
    }
    const handleDeviceStatusInfoChoose = (item: DeviceStatusInfo) => {
      deviceStatusInfoChoose.value = item
    }

    watch(deviceInfos, () => {
      deviceInfoChoose.value = store.state.deviceInfos[0]
      // 获取设备状态Bar信息
      if (deviceInfoChoose.value) {
        store.dispatch('getDeviceStatusInfo', {
          deviceTypeCode: deviceInfoChoose.value.deviceTypeCode,
          isWarning: true
        })
      }
    })
    watch(dviceStatusInfos, () => {
      deviceStatusInfoChoose.value = store.state.dviceStatusInfos[0]
    })
    watch(deviceStatusInfoChoose, () => {
      const deviceStautsCode = deviceStatusInfoChoose.value?.deviceStautsCode
      console.log('deviceStautsCode', deviceStautsCode)
      if (deviceStautsCode !== undefined) {
        console.log('deviceStautsCode', true)
        sendData.deviceStatus = deviceStautsCode
        // 获取升压变列表
        store.dispatch('getTransformerList', sendData)
        // 获取逆变器列表
        store.dispatch('getInverterList', sendData)
        // 获取汇流箱列表
        store.dispatch('getCombinerBoxList', sendData)
        // 获取光伏组串列表
        store.dispatch('getPvStringList', sendData)
      }
    })

    var refreshUI = function() {
      if (sendData.deviceStatus === 1 || sendData.deviceStatus === 0) {
        // 获取汇流箱列表
        store.dispatch('getCombinerBoxList', sendData)
      }
      if (sendData.deviceStatus === 2 || sendData.deviceStatus === 0) {
        // 获取光伏组串列表
        store.dispatch('getPvStringList', sendData)
      }
      if (sendData.deviceStatus === 3 || sendData.deviceStatus === 0) {
        // 获取逆变器列表
        store.dispatch('getInverterList', sendData)
      }
      if (sendData.deviceStatus === 4 || sendData.deviceStatus === 0) {
        // 获取升压变列表
        store.dispatch('getTransformerList', sendData)
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

    // 获取设备Bar信息
    store.dispatch('getDevicesInfo')
    const handleCurrentChangeCallback = (e: any) => {
      console.log('handleCurrentChange', 'warning get')
      sendData.pageNum = e.currentPage
      // 获取光伏组串列表
      store.dispatch('getPvStringList', sendData)
    }
    emitter.on('handleCurrentChange', handleCurrentChangeCallback)

    onUnmounted(() => {
      emitter.off('handleCurrentChange', handleCurrentChangeCallback)
    })

    const transformerTitle = '升压变'
    const inverterTitle = '逆变器'
    const combinerBoxTitle = '汇流箱'
    const pvstringTitle = '光伏组串'
    return {
      logout,
      meteoData, // 环境数据
      deviceInfos,
      dviceStatusInfos,
      deviceInfoChoose,
      deviceStatusInfoChoose,
      handleDeviceInfoChoose,
      handleDeviceStatusInfoChoose,
      transformerTitle,
      inverterTitle,
      combinerBoxTitle,
      pvstringTitle,
      transformerListInfo,
      inverterListInfo,
      combinerBoxListInfo,
      pvstringListInfo
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

.center-item{
  width: 100%;
  height: 24%;
  padding: 0.14rem 0 0 0.25rem;
  box-sizing: border-box;
  overflow: hidden;
  font-size: 12px;
  color: #fff;
}

.center-item-title{
  width: 1.5rem;
  height: 0.28rem;
  line-height: 0.23rem;
  background: url(../assets/title_icon.png) no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
  text-align: right;
  margin-bottom: 0.2rem;
  font-size: 0.16rem;
  box-sizing: border-box;
}

.center-item-content{
  width: 3rem;
  height: 2rem;
  background: url(../assets/center_bg.png) no-repeat center;
  background-size: 100% 100%;
  float: left;
  margin-right: 0.25rem;
}

.center-item-error{
  background: url(../assets/center_bg_error.png) no-repeat center;
  background-size: 100% 100%;
}
.center-item-error .content-title{
  color: #FF0000;
}
.center-item-error .content-title::after{
  content: '';
  clear: both;
  background: url(../assets/error_icon.png) no-repeat center;
  width: 0.2rem;
  height: 0.2rem;
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
}

.center-item-warning{
  background: url(../assets/center_bg_warning.png) no-repeat center;
  background-size: 100% 100%;
}
.center-item-warning .content-title{
  color: #FFBE02;
}

.center-item-warning .content-title::after{
  content: '';
  clear: both;
  background: url(../assets/warning_icon.png) no-repeat center;
  width: 0.2rem;
  height: 0.2rem;
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
}

.content-title{
  width: 100%;
  height: 50%;
  color: #10C5F3;
  position: relative;
  padding: 4% 0 0 4%;
  box-sizing: border-box;
}

.content-title img{
  width: 1rem;
  position: absolute;
  left: 50%;
  margin-left: -0.5rem;
}

.center-item-content p{
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.08rem;
}

.center-item-content p span{
  display: inline-block;
  width: 50%;
  text-align: left;
  padding-left: 0.1rem;
  box-sizing: border-box;
}
.page-warp1{
  width: 100%;
  box-sizing: border-box;
  padding-right: 0.3rem;
  height: 0.4rem;
  margin-top: 0.1rem;
  color: #fff;
  font-size: 0.16rem;
  align-items: center;
  display: flex;
  justify-content: flex-end;
}

.page-warp1 p{
  float: right;
  justify-content: flex-start;
  align-items: center;
  display: flex;
}

.page-warp1 p span{
  width: 0.3rem;
  height: 0.3rem;
  background: #013D63;
  border-radius: 2px;
  margin-left: 0.02rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-warp1 p .page-item-active{
  background: #00B1FF;
}
</style>
