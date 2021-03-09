<template>
    <table class="station">
        <tr>
          <td class="station__name">装机容量</td>
          <td class="station__value">{{powerStationInfo.capacity}}</td>
        </tr>
        <tr>
          <td class="station__name">当日发电量</td>
          <td class="station__value">{{powerStationInfo.powerToday}}</td>
        </tr>
        <tr>
          <td class="station__name">当月发电量</td>
          <td class="station__value">{{powerStationInfo.powerThisMonth}}</td>
        </tr>
        <tr>
          <td class="station__name">当年发电量</td>
          <td class="station__value">{{powerStationInfo.powerThisYear}}</td>
        </tr>
        <tr>
          <td class="station__name">累计发电量</td>
          <td class="station__value">{{powerStationInfo.powerTotal}}</td>
        </tr>
    </table>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'StationInfo',
  setup() {
    const store = useStore<GlobalDataProps>()
    const powerStationInfo = computed(() => store.state.powerStationInfo)
    return {
      powerStationInfo
    }
  }
})
</script>

<style lang="scss" scoped>
.station {
    width: 4.6rem;
    line-height: .4rem;
    font-size: .22rem;
    text-align: center;
    margin-left: .2rem;
    margin-bottom: .2rem;
    tr {
        border-bottom: .02rem solid #64A396;
    }
    &__name {
        width: 1.6rem;
        color: #333;
        background-color: #A9CE98;
        font-weight: 800;
    }
    &__value {
        width: 3rem;
        color: #FFF;
        background-color: #4F917E;
        font-weight: 800;
    }
}
</style>
