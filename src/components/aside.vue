<template>
  <div class="aside-container">
    <el-col>
      <el-row v-for="(val, index) of navs" :key="`nav-${val.path}-${index}`">
        <el-col :span="24">
          <router-link :to="val.path">{{val.name}}</router-link>
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
      { name: '首页', path: '/' },
      { name: '标杆组串', path: '/benchmarking' },
      { name: '实时监测', path: '/monitor' },
      { name: '设备预警', path: '/warning' },
      { name: '能效分析', path: '/analysis' },
      { name: '运维建议', path: '/suggestion' },
      { name: '系统设置', path: '/setting' }
    ]
    return {
      navs
    }
  }
})
</script>

<style lang="scss">
.aside__item {
  flex: 1;
  &--active {
    color: #fff
  }
}
</style>
