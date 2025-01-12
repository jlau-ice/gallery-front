<template>
  <div id="userLogin">
    <h1 class="title">智能协同云图库</h1>
    <div class="desc">企业级智能协同云图库</div>
    <a-form :model="formState" name="basic" autocomplete="off" @finish="handelSubmit">
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
      <div class="tips">
        没有账号?
        <RouterLink to="/user/register">去注册</RouterLink>
      </div>
      <a-form-item>
        <a-button class="login-button" type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { userLoginUsingPost } from '@/api/userController.ts'
import { useLoginUserStore } from '@/stores/useLoginUserStateStore.ts'
import { message } from 'ant-design-vue'
import router from '@/router'

const loginUserStore = useLoginUserStore()

const formState = reactive<API.UserLoginRequest>({
  userAccount: '',
  userPassword: '',
})

const handelSubmit = async (values: API.UserLoginRequest) => {
  const res = await userLoginUsingPost(values)
  if (res.data.code === 0 && res.data.data) {
    await loginUserStore.fetchLoginUser()
    message.success('登录成功')
    await router.push({
      path: '/home',
      replace: true,
    })
  } else {
    message.error('登录失败：' + res.data.message)
  }
}
</script>

<style scoped lang="scss">
#userLogin {
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
