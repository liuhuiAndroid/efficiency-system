<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="formObj" :rules="rules" label-width="100px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="formObj.username" placeholder="请输入账号" prefix-icon="el-icon-user" clearable maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="formObj.password" placeholder="请输入密码" prefix-icon="el-icon-user" clearable maxlength="10"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" round @click="submitForm()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, unref, reactive } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
// 定义路由行为
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()

    const loginFormRef = ref()
    const formObj = reactive({
      username: '',
      password: ''
    })

    const rules = {
      username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
      ]
    }

    const onSubmitAdd = async (values: any) => {
      console.log('onSubmitAdd', values)
      const currentId = 1
      console.log('router', router)
      router.push('/monitordetail/1')
      store.commit('login')
    }

    const submitForm = async () => {
      const form = unref(loginFormRef)
      if (!form) {
        console.log('form', false)
        return
      }
      await form.validate(() => {
        onSubmitAdd(formObj)
      })
    }

    return {
      loginFormRef,
      formObj,
      rules,
      submitForm
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
