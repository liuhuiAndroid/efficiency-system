<template>
  <div class="login-container">
    <el-space direction="vertical">
      <el-input v-model="username" placeholder="请输入账号" prefix-icon="el-icon-user" clearable maxlength="10"></el-input>
    </el-space>
    <el-space direction="vertical">
      <el-input v-model="password" placeholder="请输入密码" prefix-icon="el-icon-lock" clearable maxlength="10"></el-input>
    </el-space>
    <el-space direction="vertical">
      <el-button type="primary" round>登录</el-button>
    </el-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
// 定义路由行为
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore<GlobalDataProps>()
    // todo login
    store.commit('login')

    // const router = useRouter()
    // const currentId = 1
    // router.push({ path: `/monitordetail/${currentId}` })
    return {
      username: ref(''),
      password: ref('')
    }
  }
})
</script>
<style>
 .login-container {
    display: inline-block;
    width: 300px;
  }
</style>
