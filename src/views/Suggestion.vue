<template>
  <div class="main-right">
    <div class="right-equipment-suggest">
      <h3>设备提升建议</h3>
      <div class="equipment-box">
        <!-- <div class="item" v-for="(dv,index) of deviceSuggestion" :key="index">
          <EquipmentSuggest/>
        </div> -->
        <EquipmentSuggest/>
      </div>
    </div>
    <div class="right-station-suggest">
      <h3>整站提升建议</h3>
      <div class="station-suggest-list">
        <div class="list-item" v-for="(item,index) of stationSuggestion" :key="index">
          <span class="num">{{index+1}}</span>
          <img src="@/assets/pic.png" alt="">
          <span class="suggestion">{{item}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EquipmentSuggest from '@/components/EquipmentSuggest.vue'
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  components: { EquipmentSuggest },
  setup() {
    const store = useStore()
    store.dispatch('getStationSuggestion')
    const stationSuggestion = computed(() => store.state.stationSuggestion)
    return {
      stationSuggestion
    }
  }
})
</script>

<style lang="scss" scoped>
  .main-right {
    position: absolute;
    top: 1rem;
    bottom: 0.1rem;
    left: 2.2rem;
    right: 0.2rem;
  }
  .right-equipment-suggest {
    position: absolute;
    width: 8.5rem;
    top: 0;
    left: 0;
    bottom: 0;
    border: 1px solid #00B1FF;
    border-radius: 0.1rem;
  }
  .equipment-box {
    position: absolute;
    top: 0.8rem;
    left: 0.1rem;
    right: 0.1rem;
    bottom: 0.2rem;
    overflow-y: scroll;
  }
  .equipment-box::-webkit-scrollbar{
    padding-top: 15px;
    padding-left: 15px;
    width: 10px;
  }
  .equipment-box::-webkit-scrollbar-thumb{
    border-radius: 3px;
    background-color: #00B1FF;
    float: left;
  }
  .right-station-suggest {
    position: absolute;
    width: 8rem;
    top: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #00B1FF;
    border-radius: 0.1rem;
  }
  h3 {
    padding: 0;
    margin: 0;
    text-align: center;
    line-height: 0.6rem;
    font-size: 0.25rem;
    color: #00B1FF;
    border-bottom: 1px solid #00B1FF;
  }
  .station-suggest-list {
    height: 7rem;
    overflow-y: scroll;
  }
  .station-suggest-list::-webkit-scrollbar{
    padding-top: 15px;
    padding-left: 15px;
    width: 10px;
  }
  .station-suggest-list::-webkit-scrollbar-thumb{
    border-radius: 3px;
    background-color: #00B1FF;
    float: left;
  }
  .list-item {
    position: relative;
    height: 0.9rem;
    border-bottom: 1px solid #00B1FF;
  }
  .list-item .num {
    display: inline-block;
    width: 0.4rem;
    color: #fff;
    line-height: 0.9rem;
    text-align: center;
    border-right: 1px solid #00B1FF;
  }
  .list-item img {
    top: 0.1rem;
    left: 0.5rem;
    position: absolute;
    height: 0.7rem;
    width: 0.7rem;
  }
  .list-item .suggestion {
    left: 1.2rem;
    top: 0.2rem;
    bottom: 0.1rem;
    position: absolute;
    color: #fff;
    right: 0.2rem;
  }

</style>
