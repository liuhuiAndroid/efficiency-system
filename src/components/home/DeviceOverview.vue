<template>
<table border="1" v-if="deviceOverview">
    <tr v-if="deviceOverview[0]">
        <td>{{deviceOverview[0][0]}}</td>
        <td>{{deviceOverview[0][1]}}</td>
        <td>{{deviceOverview[0][2]}}</td>
        <td>{{deviceOverview[0][3]}}</td>
        <td>{{deviceOverview[0][4]}}</td>
    </tr>
    <tr v-if="deviceOverview[1]">
        <td>{{deviceOverview[1][0]}}</td>
        <td>{{deviceOverview[1][1]}}</td>
        <td>{{deviceOverview[1][2]}}</td>
        <td>{{deviceOverview[1][3]}}</td>
        <td>{{deviceOverview[1][4]}}</td>
    </tr>
    <tr v-if="deviceOverview[2]">
        <td>{{deviceOverview[2][0]}}</td>
        <td>{{deviceOverview[2][1]}}</td>
        <td>{{deviceOverview[2][2]}}</td>
        <td>{{deviceOverview[2][3]}}</td>
        <td>{{deviceOverview[2][4]}}</td>
    </tr>
    <tr v-if="deviceOverview[3]">
        <td>{{deviceOverview[3][0]}}</td>
        <td>{{deviceOverview[3][1]}}</td>
        <td>{{deviceOverview[3][2]}}</td>
        <td>{{deviceOverview[3][3]}}</td>
        <td>{{deviceOverview[3][4]}}</td>
    </tr>
    <tr v-if="deviceOverview[4]">
        <td>{{deviceOverview[4][0]}}</td>
        <td>{{deviceOverview[4][1]}}</td>
        <td>{{deviceOverview[4][2]}}</td>
        <td>{{deviceOverview[4][3]}}</td>
        <td>{{deviceOverview[4][4]}}</td>
    </tr>
</table>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export default defineComponent({
  name: 'DeviceOverview',
  setup() {
    const store = useStore<GlobalDataProps>()
    const deviceOverviewCom = computed(() => store.state.deviceOverview)
    const deviceOverview = ref()

    watch(deviceOverviewCom, () => {
      deviceOverview.value = store.state.deviceOverview
    })
    onMounted(() => {
      // 获取电站设备概况
      store.dispatch('getDeviceOverview')
    })
    return {
      deviceOverview
    }
  }
})
</script>

<style lang="scss" scoped>
td{
    width: .1rem;
    line-height: .4rem;
    color: white;
    font-size: 14px;
    text-align: center;
    border:1px solid #FFF;
}
</style>
