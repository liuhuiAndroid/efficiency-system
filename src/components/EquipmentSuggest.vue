<template>
  <div class="equipment-suggest-item" v-for="(item,index) of deviceSuggestion" :key="index">
    <img src="@/assets/bac.png" alt="" class="bac">
    <div class="top">
      <span v-if="item.deviceType== 4">升压变</span>
      <span v-if="item.deviceType== 3">逆变器</span>
      <span v-if="item.deviceType== 2">汇流箱</span>
      <span v-if="item.deviceType== 1">光伏组串</span>
      {{item.deviceNo }}
    </div>
    <div class="body">
      <router-link v-if="item.deviceType== 4" :to="`/transformerdetail/${item.deviceId}`">
        <img v-if="item.deviceStatus==0" src="@/assets/Hosting.png" alt="" class="pic">
        <img v-else-if="item.deviceStatus==1" src="@/assets/Hosting_error.png" alt="" class="pic">
        <img v-else src="@/assets/Hosting_warning.png" alt="" class="pic">
      </router-link>
      <router-link v-if="item.deviceType== 3" :to="`/inverterdetail/${item.deviceId}`">
        <img v-if="item.deviceStatus==0" src="@/assets/Hosting2.png" alt="" class="pic">
        <img v-else-if="item.deviceStatus==1" src="@/assets/Hosting2_error.png" alt="" class="pic">
        <img v-else src="@/assets/Hosting2_warning.png" alt="" class="pic">
      </router-link>
      <router-link v-if="item.deviceType== 2" :to="`/combinerdetail/${item.deviceId}`">
        <img v-if="item.deviceStatus==0" src="@/assets/Hosting3.png" alt="" class="pic">
        <img v-else-if="item.deviceStatus==1" src="@/assets/Hosting3_error.png" alt="" class="pic">
        <img v-else src="@/assets/Hosting3_warning.png" alt="" class="pic">
      </router-link>
      <router-link v-if="item.deviceType== 1" :to="`/pvstringdetail/${item.deviceId}`">
        <img v-if="item.deviceStatus==0" src="@/assets/Hosting4.png" alt="" class="pic">
        <img v-else-if="item.deviceStatus==1" src="@/assets/Hosting4_error.png" alt="" class="pic">
        <img v-else src="@/assets/Hosting4_warning.png" alt="" class="pic">
      </router-link>
      <span class="line"></span>
      <span class="suggestion">
        <p v-for="(sug,index) of item.suggestions.slice(0,3)" :key="index">
          {{index+1}}:&#32;&#32;{{sug}}
        </p>
      </span>
      <span class="lookMore" @click="showInfo(item)">查看全部</span>
    </div>
  </div>
  <teleport to='#app'>
    <div class="box" v-show="show">
      <div class="mask">
      </div>
      <div class="showInfo">
          <Window :info="deviceInfo" @key="receiveflag"/>
      </div>
    </div>
  </teleport>
</template>
<script>
import { defineComponent, computed, ref } from 'vue'
import { useStore } from 'vuex'
import Window from '@/components/window.vue'
export default defineComponent({
  components: { Window },
  setup() {
    const store = useStore()
    store.dispatch('getDeviceSuggestion')
    const show = ref(false)
    const deviceInfo = ref({})
    const deviceSuggestion = computed(() => store.state.deviceSuggestion)
    const showInfo = (item) => {
      deviceInfo.value.deviceNo = item.deviceNo
      deviceInfo.value.suggestions = item.suggestions
      show.value = true
    }
    const receiveflag = (e) => {
      show.value = e
    }
    return {
      deviceSuggestion,
      showInfo,
      show,
      deviceInfo,
      receiveflag
    }
  }
})
</script>
<style>
  .box {
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .showInfo {
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 340px;
    height: 300px;
  }
  .mask {
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(58, 1, 1, 0.747);
    opacity: 0.6;
  }
  .equipment-suggest-item{
    width: 3.95rem;
    height: 1.63rem;
    margin-right: 0.1rem;
    margin-bottom: 0.1rem;
    float: left;
  }
  .bac {
  position: absolute;
  width: 3.95rem;
  height: 1.63rem;
  }
  .top {
    position: absolute;
    line-height: 0.4rem;
    font-size: 0.2rem;
    padding-left: 0.1rem;
    color: #fff;
  }
  .body {
    box-sizing: border-box;
    height: 1.3rem;
    width: 3.95rem;
    margin-top: 0.4rem;
    position: absolute;
    padding-top: 0.1rem;
  }
  .pic {
    margin-left: 0.2rem;
    width: 1rem;
    height: 1rem;
  }
  .line {
    position: absolute;
    left: 1.4rem;
    border-right: 1px solid rgba(41, 196, 207, 0.753);
    height: 1rem;
  }
  .suggestion {
    position: absolute;
    padding: 0;
    margin: 0;
    top: 0.1rem;
    right: 0.1rem;
    left: 1.55rem;
    bottom: 0.33rem;
    color: #fff;
    word-break:break-all;
    overflow: hidden;
  }
  .suggestion p {
    font-size: 0.12rem;
    margin-top: 0;
  }
  .lookMore {
    position: absolute;
    bottom: 0.2rem;
    left: 2.3rem;
    color: rgb(47, 142, 231);
    cursor:pointer;
  }
  p {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>
