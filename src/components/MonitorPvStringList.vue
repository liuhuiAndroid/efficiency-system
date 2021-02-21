<template>
  <div class="center-item">
    <p class="center-item-title">
      {{title}}
    </p>
    <div class="center-item-content" v-for="column in columnList" :key="column.deviceId">
      <div class="content-title">
        <span>{{column.deviceName}}</span>
        <img src="../assets/Hosting4.png" alt="">
      </div>
      <p>
        <span>电压：{{column.u}}</span>
        <span>电流：{{column.i}}</span>
      </p>
      <p>
        <span>功率：{{column.p}}</span>
        <span></span>
      </p>
      <p>
        <span></span>
        <span></span>
      </p>
    </div>
    <div class="page-warp">
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
import { PvstringInfo } from '../store'
import { emitter } from '@/views/Monitor.vue'

export default defineComponent({
  name: 'MonitorPvStringList',
  props: {
    list: {
      type: Array as PropType<PvstringInfo[]>,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const columnList = computed(() => {
      console.log('list', props.list)
      return props.list
    })
    const hideOnSinglePage = true

    const currentPage = ref(1)
    const pageSize = 5
    const handleCurrentChange = () => {
      console.log('handleCurrentChange', currentPage.value)
      emitter.emit('handleCurrentChange', { currentPage: currentPage.value })
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
.page-warp{
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
::v-deep {
  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li {
    /*对页数的样式进行修改*/
    background-color: #013D63;
    color: #FFF;
  }
}
</style>
