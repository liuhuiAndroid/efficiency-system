<template>
  <div class="center-item">
    <p class="center-item-title">
      {{title}}
    </p>
    <div class="center-item-content" v-for="column in columnList" :key="column.deviceId">
      <div :class="{'center-item-bg-normal':column.status==0, 'center-item-bg-error':column.status==1,'center-item-bg-warning':column.status==2}" >
          <div class="content-title">
          <span v-if="currentTypeId == 1">升压变 </span>
          <span v-else-if="currentTypeId == 2">逆变器 </span>
          <span v-else-if="currentTypeId == 3">汇流箱 </span>
          <span v-else>光伏组串 </span>
          <span>{{column.deviceName}}</span>
          <router-link v-if="currentTypeId == 1" :to="`/transformerdetail/${column.deviceId}/2`">
              <img v-if="column.status==0" src="../assets/Hosting.png" alt="">
              <img v-else-if="column.status==1" src="../assets/Hosting_error.png" alt="">
              <img v-else src="../assets/Hosting_warning.png" alt="">
          </router-link>
          <router-link v-if="currentTypeId == 2" :to="`/inverterdetail/${column.deviceId}/2`">
              <img v-if="column.status==0" src="../assets/Hosting2.png" alt="">
              <img v-else-if="column.status==1" src="../assets/Hosting2_error.png" alt="">
              <img v-else src="../assets/Hosting2_warning.png" alt="">
          </router-link>
          <router-link v-if="currentTypeId == 3" :to="`/combinerdetail/${column.deviceId}/2`">
              <img v-if="column.status==0" src="../assets/Hosting3.png" alt="">
              <img v-else-if="column.status==1" src="../assets/Hosting3_error.png" alt="">
              <img v-else src="../assets/Hosting3_warning.png" alt="">
          </router-link>
          <router-link v-if="currentTypeId == 4" :to="`/pvstringdetail/${column.deviceId}/2`">
              <img v-if="column.status==0" src="../assets/Hosting4.png" alt="">
              <img v-else-if="column.status==1" src="../assets/Hosting4_error.png" alt="">
              <img v-else src="../assets/Hosting4_warning.png" alt="">
          </router-link>
          </div>
          <p>
          <span>损失：{{column.loss}}</span>
          </p>
          <p>
          <span>损失百分比：{{column.lossPercent}}%</span>
          </p>
        </div>
        </div>
        <div class="page-warp" v-if="currentTypeId == 4">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :hide-on-single-page="hideOnSinglePage"
          :total="totalCount"
          @current-change="handleCurrentChange"
          v-model:currentPage="currentPage">
        </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { PvStringEfficiencyAnalysis } from '../store'
import { emitter } from '@/views/AnalysisDetail.vue'

export default defineComponent({
  name: 'AnalysisList',
  props: {
    list: {
      type: Array as PropType<PvStringEfficiencyAnalysis[]>,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    },
    currentTypeId: {
      type: String,
      required: true
    },
    lossType: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      console.log('analysis list', props.list)
      return props.list
    })
    const hideOnSinglePage = true

    const currentPage = ref(1)
    const pageSize = 5
    const handleCurrentChange = () => {
      console.log('handleCurrentChange', currentPage.value)
      emitter.emit('handleCurrentChange', { currentPage: currentPage.value, lossType: props.lossType })
    }
    return {
      columnList,
      hideOnSinglePage,
      handleCurrentChange,
      currentPage,
      pageSize
    }
  }
})
</script>

<style lang="scss" scoped>
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
  float: left;
  margin-right: 0.25rem;
}

.center-item-bg-normal{
  background: url(../assets/center_bg.png) no-repeat center;
  background-size: 100% 100%;
  width: 3rem;
  height: 2rem;
}

.center-item-bg-error{
  background: url(../assets/center_bg_error.png) no-repeat center;
  background-size: 100% 100%;
  width: 3rem;
  height: 2rem;
}
.center-item-bg-error .content-title{
  color: #FF0000;
}
.center-item-bg-error .content-title::after{
  content: '';
  clear: both;
  background: url(../assets/error_icon.png) no-repeat center;
  width: 0.2rem;
  height: 0.2rem;
  position: absolute;
  right: 0.1rem;
  top: 0.1rem;
}

.center-item-bg-warning{
  background: url(../assets/center_bg_warning.png) no-repeat center;
  background-size: 100% 100%;
  width: 3rem;
  height: 2rem;
}

.center-item-bg-warning .content-title{
  color: #FFBE02;
}

.center-item-bg-warning .content-title::after{
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
  left: 60%;
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

.pvstring {
  display: inline-block;
  width: 100%;
  text-align: left;
  padding-left: 0.1rem;
  box-sizing: border-box;
}

.page-warp{
  width: 100%;
  box-sizing: border-box;
  padding-right: 0.3rem;
  padding-top: .1rem;
  color: #fff;
  font-size: 0.16rem;
  align-items: center;
  display: flex;
  justify-content: flex-end;
}

::v-deep {
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    /*对页数的样式进行修改*/
    background-color: #013D63;
    color: #FFF;
  }
}
</style>
