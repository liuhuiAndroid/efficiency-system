<template>
<div class="main-right">
  <div class="main-right-header">
    <div class="select-main">
      设备类型：
      <dropdown :title="titleDeviceStatus">
        <dropdown-item>全部(2221)</dropdown-item>
        <dropdown-item>升压变(1)</dropdown-item>
        <dropdown-item>逆变器(10)</dropdown-item>
        <dropdown-item>汇流箱(20)</dropdown-item>
        <dropdown-item>光伏组串(200)</dropdown-item>
      </dropdown>
    </div>
    <div class="select-main">
      设备状态：
      <dropdown :title="titleDeviceStatus">
        <dropdown-item>全部(2221)</dropdown-item>
        <dropdown-item>升压变(1)</dropdown-item>
        <dropdown-item>逆变器(10)</dropdown-item>
        <dropdown-item>汇流箱(20)</dropdown-item>
        <dropdown-item>光伏组串(200)</dropdown-item>
      </dropdown>
    </div>
    <p>
      环境数据：
      <span style="margin-left: 0.2rem;">{{`温度：${meteoData.temperature}度`}}</span>
      <span>{{`湿度：${meteoData.humidity}%`}}</span>
      <span>{{`压力：${meteoData.pressure}`}}</span>
      <span>{{`风向：${meteoData.windDirection}`}}</span>
      <span>{{`风速：${meteoData.windSpeed}m/s`}}</span>
      <span>{{`Poa：${meteoData.poa}`}}</span>
    </p>
  </div>
    <div class="main-right-center">
      <div class="main-center-warp">
        <div class="main-center-box">
        <monitor-column-list :title="columnListTitle" :list="columnList"></monitor-column-list>
        <monitor-column-list :title="columnListTitle" :list="columnList"></monitor-column-list>
        <monitor-column-list :title="columnListTitle" :list="columnList"></monitor-column-list>
        <monitor-column-list :title="columnListTitle" :list="columnList"></monitor-column-list>
        <!-- <div class="center-item">
          <p class="center-item-title">
          升压变（01）
          </p>
          <div class="center-item-content">
            <div class="content-title">
              <span>升压变01</span>
              <img src="../assets/Hosting.png" alt="">
            </div>
            <p>
              <span>低压侧：289.1v</span>
              <span>高压侧：10v</span>
            </p>
            <p>
              <span>频率：50HZ</span>
              <span>功率： 0.19MW</span>
            </p>
            <p>
              <span>功率因数：0.95</span>
              <span>下级设备：逆变器</span>
            </p>
          </div>
        </div>
        <div class="page-warp1">
          <p>
            <span>1</span>
            <span class="page-item-active">2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>></span>
          </p>
        </div>
        <div class="center-item">
          <p class="center-item-title">
              逆变器（01）
          </p>
          <div class="center-item-content">
            <div class="content-title">
              <span>逆变器01</span>
              <img src="../assets/Hosting2.png" alt="">
            </div>
            <p>
              <span>低压侧：289.1v</span>
              <span>高压侧：10v</span>
            </p>
            <p>
              <span>频率：50HZ</span>
              <span>功率： 0.19MW</span>
            </p>
            <p>
              <span>功率因数：0.95</span>
              <span>下级设备：逆变器</span>
            </p>
          </div>
          <div class="center-item-content center-item-error">
            <div class="content-title">
              <span>逆变器01</span>
              <img src="../assets/Hosting2_errror.png" alt="">
            </div>
            <p>
              <span>低压侧：289.1v</span>
              <span>高压侧：10v</span>
            </p>
            <p>
              <span>频率：50HZ</span>
              <span>功率： 0.19MW</span>
            </p>
            <p>
              <span>功率因数：0.95</span>
              <span>下级设备：逆变器</span>
            </p>
          </div>
        </div>
        <div class="page-warp1">
          <p>
            <span>1</span>
            <span class="page-item-active">2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </p>
        </div>
        <div class="center-item">
          <p class="center-item-title">
            汇流箱（5）
          </p>
          <div class="center-item-content">
            <div class="content-title">
              <span>汇流箱01</span>
              <img src="../assets/Hosting3.png" alt="">
            </div>
            <p>
              <span>低压侧：289.1v</span>
              <span>高压侧：10v</span>
            </p>
            <p>
              <span>频率：50HZ</span>
              <span>功率： 0.19MW</span>
            </p>
            <p>
              <span>功率因数：0.95</span>
              <span>下级设备：逆变器</span>
            </p>
          </div>
          <div class="center-item-content center-item-warning">
            <div class="content-title">
              <span>汇流箱01</span>
              <img src="../assets/Hosting3_warning.png" alt="">
            </div>
            <p>
              <span>低压侧：289.1v</span>
              <span>高压侧：10v</span>
            </p>
            <p>
              <span>频率：50HZ</span>
              <span>功率： 0.19MW</span>
            </p>
            <p>
              <span>功率因数：0.95</span>
              <span>下级设备：逆变器</span>
            </p>
          </div>
        </div>
        <div class="page-warp1">
          <p>
            <span>1</span>
            <span class="page-item-active">2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>></span>
          </p>
        </div>
          <div class="center-item">
            <p class="center-item-title">
              光伏组串（5）
            </p>
            <div class="center-item-content">
              <div class="content-title">
                <span>光伏组串01</span>
                <img src="../assets/Hosting4.png" alt="">
              </div>
              <p>
                <span>低压侧：289.1v</span>
                <span>高压侧：10v</span>
              </p>
              <p>
                <span>频率：50HZ</span>
                <span>功率： 0.19MW</span>
              </p>
              <p>
                <span>功率因数：0.95</span>
                <span>下级设备：逆变器</span>
              </p>
            </div>
        </div>
        <div class="page-warp1">
          <p>
            <span>1</span>
            <span class="page-item-active">2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
            <span>7</span>
            <span>8</span>
            <span>9</span>
            <span>></span>
          </p>
        </div> -->
      </div>
    </div>
    </div>
</div>
  <!-- <div class="container">
    <div>升压变</div>
    <el-row :gutter="10">
      <el-col :span="5" v-for="inverter in inverterList" :key="inverter.deviceId">
        <el-card>
          <div class="grid-content">
            <h5>{{inverter.deviceName}}</h5>
            <p>{{inverter.deviceId}}</p>
            <el-button plain>{{inverter.subDevices}}</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div>逆变器</div>
    <el-row :gutter="10">
      <el-col :span="5" v-for="inverter in inverterList" :key="inverter.deviceId">
        <el-card>
          <div class="grid-content">
            <h5>{{inverter.deviceName}}</h5>
            <p>{{inverter.deviceId}}</p>
            <el-button plain>{{inverter.subDevices}}</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div>汇流箱</div>
    <el-row :gutter="10">
      <el-col :span="5" v-for="inverter in inverterList" :key="inverter.deviceId">
        <el-card>
          <div class="grid-content">
            <h5>{{inverter.deviceName}}</h5>
            <p>{{inverter.deviceId}}</p>
            <el-button plain>{{inverter.subDevices}}</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div>光伏组串</div>
    <el-row :gutter="10">
      <el-col :span="5" v-for="inverter in inverterList" :key="inverter.deviceId">
        <el-card>
          <div class="grid-content">
            <h5>{{inverter.deviceName}}</h5>
            <p>{{inverter.deviceId}}</p>
            <el-button plain>{{inverter.subDevices}}</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
    <router-link :to="`/monitordetail/1`">跳转实时监测详情页面</router-link>
  </div> -->
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance, ref, watch } from 'vue'
import { ColumnProps, InverterProps, GlobalDataProps, MeteoProps } from '../store'
import { useStore } from 'vuex'
import Dropdown from '../components/Dropdown.vue'
import DropdownItem from '../components/DropdownItem.vue'
import MonitorColumnList from '../components/MonitorColumnList.vue'

export default defineComponent({
  name: 'Monitor',
  components: {
    Dropdown,
    DropdownItem,
    MonitorColumnList
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
    // 逆变器
    const inverterList: InverterProps[] = [
      {
        deviceName: 'INT-01',
        deviceId: 'XXXX-XXXX',
        deviceStaus: 1,
        subDevices: '汇流箱(2)',
        deviceInfos: 'string'
      },
      {
        deviceName: 'INT-02',
        deviceId: 'XXXX-XXXX',
        deviceStaus: 1,
        subDevices: '汇流箱(2)',
        deviceInfos: 'string'
      }
    ]
    const showDeviceTypeChoose = ref(false)
    const handleDeviceTypeChoose = () => {
      showDeviceTypeChoose.value = !showDeviceTypeChoose.value
      console.log('showDeviceTypeChoose', showDeviceTypeChoose)
    }

    const showDeviceStatusChoose = ref(false)
    const handleDeviceStatusChoose = () => {
      showDeviceStatusChoose.value = !showDeviceStatusChoose.value
      console.log('showDeviceStatusChoose', showDeviceStatusChoose)
    }

    const store = useStore<GlobalDataProps>()
    // 获取当前气象数据
    store.dispatch('getMeteoData')
    // TODO 跨域
    // const meteoData = computed(() => store.state.meteoData)
    const meteoData: MeteoProps = {
      temperature: 13.5,
      humidity: 85.4,
      pressure: 101153.0,
      windDirection: '西风',
      windSpeed: 0.0,
      poa: 0.0
    }
    console.log('meteoData', meteoData)
    const titleDeviceStatus = '全部'

    // 监听选项修改
    const options1 = { }
    watch(options1, (oldValue, newValue) => {
      console.log('')
    })
    // 监听选项修改
    const options2 = { }
    watch(options2, (oldValue, newValue) => {
      console.log('')
    })

    const columnListTitle = '啊啊啊啊啊'
    const columnList = [{
      id: 1,
      title: '',
      avatar: '',
      description: ''
    }, {
      id: 2,
      title: '',
      avatar: '',
      description: ''
    }]
    return {
      logout,
      inverterList,
      handleDeviceTypeChoose,
      showDeviceTypeChoose,
      handleDeviceStatusChoose,
      showDeviceStatusChoose,
      meteoData, // 环境数据
      titleDeviceStatus,
      columnListTitle,
      columnList
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
  margin-right: 0.2rem;
}
.main-right-header p span{
  margin-right: 0.2rem;
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
.select-input{
  width: 2rem;
  height: 0.46rem;
  border: 1px solid;
  border-image: linear-gradient(90deg, rgba(0, 177, 255, 1), rgba(0, 177, 255, 0.2), rgba(0, 177, 255, 1)) 1 1;
  background: rgba(0, 177, 255, 0.2);
  padding: 0 0.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: pointer;
}

.select-item{
  width: 2rem;
  overflow: hidden;
  background: #00B1FF;
  padding: 0 0.1rem;
  box-sizing: border-box;
  position: absolute;
  top: 0.47rem;
  right: 0;
  z-index: 99;
  cursor: pointer;
}
.select-item li{
  width: 100%;
  display: flex;
  height: 0.4rem;
  align-items: center;
  justify-content: space-between;
  color: #fff;
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
