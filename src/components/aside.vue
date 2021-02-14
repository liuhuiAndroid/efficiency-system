<template>
  <div class="aside__container">
    <el-col>
      <el-row v-for="(val, index) of navs" :key="`nav-${val.path}-${index}`">
        <el-col :span="24">
          <router-link :to="val.path">
            <div class="aside__container__item">
              <p><img :src="val.img" alt=""><span>{{val.name}}</span></p>
            </div>
          </router-link>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Aside',
  setup() {
    const navs = [
      { name: '首页', path: '/', img: require('../assets/left1.png') },
      { name: '标杆组串', path: '/benchmarking', img: require('../assets/left2.png') },
      { name: '实时监测', path: '/monitor', img: require('../assets/left3.png') },
      { name: '设备预警', path: '/warning', img: require('../assets/left4.png') },
      { name: '能效分析', path: '/analysis', img: require('../assets/left5.png') },
      { name: '运维建议', path: '/suggestion', img: require('../assets/left6.png') },
      { name: '系统设置', path: '/setting', img: require('../assets/left7.png') }
    ]
    return {
      navs
    }
  }
})
</script>

<style lang="scss">
.aside__container {
  &__item{
    width: 2rem;
    height: 100%;
    font-size: 0.16rem;
    color: #D2FFFF;
  }
  &-active{
    color: #00B1FF;
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
