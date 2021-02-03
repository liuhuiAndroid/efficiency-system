<template>
  <div class="header">
    <div class="logo cp" @click="routeToHome">光魄能效云系统</div>
    <div class="nav-wrapper">
      <!-- 导航 -->
      <router-link
        class="nav cp"
        v-for="(val, index) of navs"
        :key="`nav-${val.path}-${index}`"
        :to="val.path"
      >{{val.name}}</router-link>
    </div>
    <div>2021-02-03</div>
    <div>退出系统</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderItem',
  data: () => ({
    navs: [
      { name: '首页', path: '/' },
      { name: '标杆组串', path: '/benchmarking' },
      { name: '实时监测', path: '/monitor' },
      { name: '设备预警', path: '/warning' },
      { name: '能效分析', path: '/analysis' },
      { name: '运维建议', path: '/suggestion' },
      { name: '系统设置', path: '/setting' },
    ],
  }),
});
</script>

<style lang="less">
.header {
  display: flex;
  align-items: center;
  
  .logo,
  .nav-wrapper {
    padding: 0 16px;
    height: 48px;
    line-height: 48px;
  }

  .nav-wrapper {
    flex: 1;
  }

.nav {
    display: inline-block;
    padding: 0 8px;
    text-decoration: none;
    transition: all 300ms;

    &-button {
      border-color: transparent;
      padding: 8px 16px;
      margin-right: 16px;
      &:hover {
        border-color: transparent;
      }
    }

    &-user {
      padding: 8px 16px;
      font-weight: 300;
    }
  }
}
</style>
