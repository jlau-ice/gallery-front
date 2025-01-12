<template>
  <div id="userRegister">
    <h1 class="title">智能协同云图库</h1>
    <div class="desc">企业级智能协同云图库</div>
    <a-form :model="formState" name="basic" autocomplete="off" @finish="handelRegister">
      <a-form-item name="userAccount" :rules="[{ required: true, message: '请输入账号！' }]">
        <a-input v-model:value="formState.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        name="userPassword"
        :rules="[
          { required: true, message: '请输入密码' },
          { min: 8, message: '密码长度不能小于8位' },
        ]"
      >
        <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item
        name="checkPassword"
        :rules="[
          { required: true, message: '请输入确认密码' },
          { min: 8, message: '确认密码长度不能小于8位' },
        ]"
      >
        <a-input-password v-model:value="formState.checkPassword" placeholder="请输入确认密码" />
      </a-form-item>
      <div class="tips">
        已有账号?
        <RouterLink to="/user/login">去登录</RouterLink>
      </div>
      <a-form-item>
        <a-button class="login-button" type="primary" html-type="submit">注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import { userRegisterUsingPost } from '@/api/userController.ts'
import { message } from 'ant-design-vue'
import router from '@/router'

const formState = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
})

const handelRegister = async (values: API.UserRegisterRequest) => {
  if (values.userPassword !== values.checkPassword) {
    message.error('两次密码不一致')
    return
  }
  const res = await userRegisterUsingPost(values)
  if (res.data.code === 0 && res.data.data) {
    message.success('注册成功')
    await router.push({
      path: '/user/login',
      replace: true,
    })
  } else {
    message.error('注册失败：' + res.data.message)
  }
}
</script>

<style scoped lang="scss">
#userRegister {
  padding: 50px;
  max-width: 360px;
  margin: 0 auto;

  .title {
    text-align: center;
    margin-bottom: 16px;
  }

  .desc {
    text-align: center;
    color: #bbb;
    margin-bottom: 16px;
  }

  .tips {
    text-align: right;
    font-size: 13px;
    color: #bbb;
    margin-bottom: 16px;
  }

  .login-button {
    width: 100%;
  }
}
</style>
