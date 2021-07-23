<template>
    <div class="box">
    <img src="@/assets/bacg.png" class="bac">
    <div class="top">
        <img v-if="pvstringDetailProps!=null && pvstringDetailProps.status==0" src="@/assets/Hosting.png" alt="" class="pic">
        <img v-else-if="pvstringDetailProps!=null && pvstringDetailProps.status==1" src="@/assets/Hosting_error.png" alt="" class="pic">
        <img v-else-if="pvstringDetailProps!=null" src="@/assets/Hosting_warning.png" alt="" class="pic">
        <p class="name">健康诊断</p>
        <img src="@/assets/hide.png" class="hide" @click="hiddenWindow">
    </div>
    <div class="body">
        <div class="content">
            <el-upload
                :before-upload="beforeUpload"
                :show-file-list="false"
                :limit="1">
                <img src="@/assets/icon_health_btn.png" alt="" class="avatar">
                <div class="choose_file">选择文件</div>
            </el-upload>
            <el-divider class="divider"></el-divider>
            <div class="info" v-for="(item,index) of healthdiagnosis.results" :key="index">
                {{index+1}}:&#32;&#32;{{item}}
            </div>
            <div v-show="healthdiagnosis.results==null">
              <p class="hint">请拍摄并上传一张设备的照片进行健康诊断，照片文件格式为png或者jpg。</p>
            </div>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { PvstringDetailProps } from '@/store'
export default defineComponent({
  props: {
    pvstringDetailProps: {
      type: Object as PropType<PvstringDetailProps>,
      required: true
    },
    currentDeviceId: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const store = useStore()
    const hiddenWindow = () => {
      context.emit('key', false)
      store.commit('setHealthdiagnosis', null)
    }
    const beforeUpload = (file:File) => {
      const isJPG = (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png')
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isJPG) {
        ElMessage.warning({
          message: '格式不正确',
          type: 'warning'
        })
      }
      if (!isLt10M) {
        ElMessage.warning({
          message: '上传图片大小不能超过10MB!',
          type: 'warning'
        })
      }
      const param = new FormData()
      param.append('deviceId', props.currentDeviceId)
      param.append('deviceType', '1')
      param.append('devicePhoto', file)
      store.dispatch('healthdiagnosis', param)
    }
    const healthdiagnosis = computed(() => store.state.healthdiagnosis)
    return {
      hiddenWindow,
      beforeUpload,
      healthdiagnosis
    }
  }
})
</script>
<style>
    .hint {
      color: #fff;
    }
    .box {
        position: absolute;
        width: 340px;
        height: 300px;
    }
    .box .bac {
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .box .top{
        position: absolute;
        height: 60px;
        width: 100%;
    }
    .box .top .pic {
        position: absolute;
        left: 25px;
        top: 15px;
        width: 30px;
        height: 30px;
        z-index: 100;
    }
    .box .top .name {
        position: absolute;
        width: 240px;
        padding: 0;
        margin: 0;
        padding-left: 70px;
        line-height: 60px;
        z-index: 100;
        color: #fff;
        font-size: 16px;
    }
    .box .top .hide {
        position: absolute;
        width: 95px;
        height: 60px;
        right: 0px;
        z-index: 100;
    }
    .box .body {
        position: absolute;
        width: 95%;
        height: 240px;
        top: 55px;
        padding-left: 24px;
        overflow-y: scroll;
        z-index: 1000;
    }
    .box .body::-webkit-scrollbar{
        padding-top: 15px;
        padding-left: 15px;
        width: 10px;
    }
    .box .body::-webkit-scrollbar-thumb{
        border-radius: 3px;
        background-color: #00B1FF;
    }
    .box .body .content {
        box-sizing: border-box;
        width: 90%;
    }
    .box .body .info {
        width: 100%;
        line-height: 20px;
        margin-bottom: 5px;
        padding-bottom: 5px;
        color: #fff;
    }
    .box .body .divider {
        margin-top: 45px;
    }
  .avatar {
    position: absolute;
    width: 110px;
    height: 41px;
  }
  .choose_file {
    position: absolute;
    color: #fff;
    width: 110px;
    height: 41px;
    line-height: 41px;
  }
</style>
