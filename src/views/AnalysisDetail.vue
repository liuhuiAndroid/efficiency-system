<template>
<div class="container">
    测试
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, computed, reactive, ref, watch } from 'vue'
// 获取路由信息
import { useRoute } from 'vue-router'
import { GlobalDataProps, NameWrapper, DailyPvStringLosses } from '@/store'
import { useStore } from 'vuex'
import * as echarts from 'echarts'
import { currentTime, get30AgoTime } from '@/utils/DateUtils'
import { Percentage } from '@/utils/NumberUtils'

export default defineComponent({

})
</script>

<style lang="scss" scoped>

</style>
