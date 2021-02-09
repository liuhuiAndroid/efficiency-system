<template>
  <div class="container">
    <el-row :gutter="10">
      <el-col :span="5" v-for="column in testData" :key="column.id">
        <el-card>
          <div class="grid-content">
            <h5>{{column.title}}</h5>
            <p>{{column.description}}</p>
            <el-button plain>进入专栏</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
    <router-link :to="`/monitordetail/1`">跳转实时监测详情页面</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import { ColumnProps } from '../store'

export default defineComponent({
  name: 'Monitor',
  setup() {
    const currentInstance = getCurrentInstance()
    const logout = () => {
      if (currentInstance) {
        currentInstance.appContext.app.config.globalProperties.$confirm(
          '退出系统?',
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          console.log('退出')
        }).catch(() => {
          console.log('取消')
        })
      }
    }
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
      },
      {
        id: 3,
        title: 'test3的专栏',
        description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 4,
        title: 'test3的专栏',
        description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 5,
        title: 'test3的专栏',
        description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 6,
        title: 'test3的专栏',
        description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      },
      {
        id: 7,
        title: 'test3的专栏',
        description: '这是的test3专栏，有一段非常有意思的简介，可以更新一下欧',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
      }
    ]
    return {
      logout,
      testData
    }
  }
})
</script>

<style>

</style>
