<template>
  <div class="container">
    <header-component />
    <router-view class="main"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from './components/header.vue'

export default defineComponent({
  name: 'App',
  components: {
    HeaderComponent
  }
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  padding: 12px 20px;
}
</style>
