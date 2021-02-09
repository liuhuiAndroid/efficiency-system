<template>
  <el-row :gutter="20">
    <el-col :span="8" v-for="column in testData" :key="column.id">
      <el-card>
        <div class="grid-content">
          <img :src="column.avatar" :alt="column.title">
          <h5>{{column.title}}</h5>
          <p>{{column.description}}</p>
          <el-button plain>进入专栏</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ColumnProps } from '../store'

export default defineComponent({
  name: 'ColumnList',
  setup() {
    const testData: ColumnProps[] = [
      {
        id: 1,
        title: 'test1的专栏',
        description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 2,
        title: 'test2的专栏',
        description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      }
    ]
    return {
      testData
    }
  }
})
</script>

<style>
.el-row .el-col {
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
