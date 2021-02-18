<template>
  <div class="main__wrap">
    <div class="main__warp__header" id="headerWarp">
      <header-component/>
    </div>
    <div class="main__warp__content">
      <aside-component />
      <router-view class="main__warp__content__container"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from '../components/Header.vue'
import AsideComponent from '../components/Aside.vue'

export default defineComponent({
  name: 'Main',
  components: {
    HeaderComponent,
    AsideComponent
  }
})
</script>

<style lang="scss" scoped>
.main__wrap{
  max-width: 1920px;
  min-width: 1200px;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
</style>
