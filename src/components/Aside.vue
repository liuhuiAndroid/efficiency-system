<template>
  <div class="aside__container">
    <el-col>
      <el-row v-for="(val, index) of navs" :key="`nav-${val.path}-${index}`">
        <router-link :to="val.to">
          <div :class="{'aside__container__item': true, 'aside__container__item--active': index === currentIndex}">
            <p><img :src="index === currentIndex ? val.img_active : val.img" alt=""><span>{{val.name}}</span></p>
          </div>
          </router-link>
      </el-row>
    </el-col>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'Aside',
  setup() {
    const navs = [
      { name: '首页', to: '/', img: require('../assets/left1.png'), img_active: require('../assets/left1_active.png') },
      { name: '标杆组串', to: '/benchmarking', img: require('../assets/left2.png'), img_active: require('../assets/left2_active.png') },
      { name: '实时监测', to: '/device', img: require('../assets/left3.png'), img_active: require('../assets/left3_active.png') },
      { name: '设备预警', to: '/warning', img: require('../assets/left4.png'), img_active: require('../assets/left4_active.png') },
      { name: '能效分析', to: '/analysis', img: require('../assets/left5.png'), img_active: require('../assets/left5_active.png') },
      { name: '运维建议', to: { name: 'Suggestion' }, img: require('../assets/left6.png'), img_active: require('../assets/left6_active.png') },
      { name: '系统设置', to: { name: 'Setting' }, img: require('../assets/left7.png'), img_active: require('../assets/left7_active.png') }
    ]
    const currentIndex = ref(0)
    const route = useRoute()
    watch(() => route.path, (to) => {
      if (to === '/') {
        currentIndex.value = 0
      } else if (to === '/benchmarking') {
        currentIndex.value = 1
      } else if (to === '/device') {
        currentIndex.value = 2
      } else if (to === '/warning') {
        currentIndex.value = 3
      } else if (to === '/analysis') {
        currentIndex.value = 4
      } else if (to === '/suggestion') {
        currentIndex.value = 5
      } else if (to === '/setting') {
        currentIndex.value = 6
      }
    })
    return {
      navs,
      currentIndex
    }
  }
})
</script>

<style lang="scss" scoped>
.aside__container {
  &__item{
    width: 2rem;
    height: 100%;
    font-size: 0.16rem;
    color: #D2FFFF;
    &--active{
      color: #00B1FF;
    }
  }
  a {
    text-decoration: none;
  }
  p {
    width: 90%;
    margin: 0 auto;
    height: 0.62rem;
    margin-bottom: 0.3rem;
    background: url(../assets/menu_bg.png) no-repeat center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
  }
  p span{
    display: block;
    width: 70%;
    height: 100%;
    float: right;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p img{
    width: 0.28rem;
    height: 0.28rem;
    margin: 0.16rem;
  }
  &_active{
    color: #00B1FF;
  }
}
</style>
