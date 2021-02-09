<template>
  <div class="container">
    <router-link :to="`/monitordetail/1`">跳转实时监测详情页面</router-link>
    <el-pagination
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
  </div>
</template>
