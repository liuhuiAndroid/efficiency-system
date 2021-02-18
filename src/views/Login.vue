<template>
<div class="login__container">
  <el-card>
    <h2>光魄能效云系统</h2>
    <el-form ref="loginForm" :model="loginFormObj" :rules="loginRules" label-width="100px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="loginFormObj.username" placeholder="请输入账号" prefix-icon="el-icon-user" clearable maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginFormObj.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password clearable maxlength="10"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" round @click="handleLogin()">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, reactive } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
// 定义路由行为
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

// 处理登录逻辑
const useLoginEffect = () => {
  const router = useRouter()
  const store = useStore<GlobalDataProps>()
  const loginForm = ref()
  const loginFormObj = reactive({ username: '', password: '' })
  const loginRules = {
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
      { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
    ]
  }

  const handleLogin = async () => {
    router.push('/')
    const form = unref(loginForm)
    if (!form) {
      return
    }
    await form.validate(() => async () => {
      const payload = {
        username: loginFormObj.username,
        password: loginFormObj.password
      }
      // 请求数据
      store.dispatch('loginAndFetch', payload).then(() => {
        ElMessage.success('登录成功 2秒后跳转首页')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }).catch(e => {
        console.log(e)
      })
    })
  }
  return { loginForm, loginFormObj, loginRules, handleLogin }
}

export default defineComponent({
  setup() {
    const { loginForm, loginFormObj, loginRules, handleLogin } = useLoginEffect()
    return { loginForm, loginFormObj, loginRules, handleLogin }
  }
})
</script>

<style lang="scss" scoped>
.login__container {
  display: flex;
  justify-content: center;
  margin-top: 150px;
}
h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #000;
  text-align: center;
}
</style>
