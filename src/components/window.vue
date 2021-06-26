<template>
    <div class="box">
    <img src="@/assets/bacg.png" class="bac">
    <div class="top">
        <p class="name">{{ info.deviceNo }}</p>
        <img src="@/assets/hide.png" class="hide" @click="hiddenWindow">
    </div>
    <div class="body">
        <div class="content">
            <div class="info" v-for="(item,index) of info.suggestions" :key="index">
                {{index+1}}:&#32;&#32;{{item}}
            </div>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { DeviceSuggestion } from '@/store'
export default defineComponent({
  props: {
    info: {
      info: Object as PropType<DeviceSuggestion>,
      required: true
    //   default: function() {
    //     return { value: { deviceId: '000', deviceNo: '000', deviceType: 1, deviceStatus: 0, suggestions: [] } }
    //   }
    }
  },
  setup(props, context) {
    const hiddenWindow = () => {
      context.emit('key', false)
    }
    return {
      hiddenWindow
    }
  }
})
</script>
<style>
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
        left: 10px;
        top: 5px;
        width: 50px;
        height: 50px;
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
        font-size: 21px;
    }
    .box .top .hide {
        position: absolute;
        width: 95px;
        height: 60px;
        right: 6px;
        z-index: 100;
    }
    .box .body {
        position: absolute;
        width: 89%;
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
        width: 95%;
    }
    .box .body .info {
        width: 100%;
        line-height: 20px;
        margin-bottom: 5px;
        padding-bottom: 10px;
        color: #fff;
        border-bottom: 1px solid #ccc;
    }
</style>
