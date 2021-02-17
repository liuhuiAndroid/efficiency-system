<template>
<div class="select-main" ref="dropdownRef">
  <p class="select-input" @click.prevent="toggleOpen">{{title}}</p>
  <ul class="select-item" v-if="isOpen" @click.prevent="handleChoose">
    <slot></slot>
  </ul>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
export default defineComponent({
  name: 'Dropdown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup() {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const handleChoose = () => {
      isOpen.value = false
    }
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      handleChoose,
      dropdownRef
    }
  }
})
</script>

<style lang="scss" scoped>
.select-main{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.select-input{
  width: 2rem;
  height: 0.46rem;
  border: 1px solid;
  border-image: linear-gradient(90deg, rgba(0, 177, 255, 1), rgba(0, 177, 255, 0.2), rgba(0, 177, 255, 1)) 1 1;
  background: rgba(0, 177, 255, 0.2);
  padding: 0 0.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  cursor: pointer;
}
.select-item{
  width: 2rem;
  overflow: hidden;
  background: #00B1FF;
  padding: 0 0.1rem;
  box-sizing: border-box;
  position: absolute;
  top: 0.47rem;
  right: 0;
  z-index: 99;
  cursor: pointer;
}
.select-item li{
  width: 100%;
  display: flex;
  height: 0.4rem;
  align-items: center;
  justify-content: space-between;
  color: #fff;
}
</style>
