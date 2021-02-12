<template>
  <div class="container">
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
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { ColumnProps, InverterProps } from '../store'

export default defineComponent({
  name: 'Monitor',
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
    return {
      logout,
      inverterList
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
