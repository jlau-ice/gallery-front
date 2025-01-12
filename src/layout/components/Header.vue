<template>
  <div id="header">
    <a-row :wrap="false">
      <a-col flex="180px">
        <router-link to="/">
          <div class="title-bar">
            <img src="@/assets/logo.png" alt="logo" class="logo" />
            <div class="title">智 能 云 图 库</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="items"
          @click="menuClick"
        />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="longinUserStore.loginUser.id">
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                <a-space>
                  <a-avatar :src="longinUserStore.loginUser.userAvatar" />
                  <div>{{ longinUserStore.loginUser.userName }}</div>
                </a-space>
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="logout">
                    <LoginOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
          <div v-else>
            <a-button type="primary" href="/user/login"> 登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { HomeOutlined, LoginOutlined } from '@ant-design/icons-vue'
import { type MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStateStore.ts'
import { userLogoutUsingPost } from '@/api/userController.ts'

const longinUserStore = useLoginUserStore()
const items = ref<MenuProps['items']>([
  {
    key: '/home',
    icon: h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',
    // icon: h(AppstoreOutlined),
    label: '关于',
    title: '关于',
  },
  {
    key: '/other',
    // icon: h(SettingOutlined),
    label: h('a', { href: 'https://ant.design', target: '_blank' }, '其他'),
    title: '设置',
  },
])
const router = useRouter()

const menuClick = ({ key }: { key: string }) => {
  router.push(key)
}

// 默认高亮
const current = ref<string[]>([''])
router.afterEach((to, from, next) => {
  current.value = [to.path]
})

const logout = async () => {
  const res = await userLogoutUsingPost();
  if (res.data.code === 0) {
    longinUserStore.setLoginUser({userName: '未登录'})
    message.success('退出成功')
    await router.push({
      path: '/user/login',
      replace: true,
    })
  } else {
    message.error('退出失败：' + res.data.message)
  }
}
</script>
<style lang="scss" scoped>
.title-bar {
  display: flex;
  align-items: center;

  .title {
    color: black;
    font-size: 18px;
    margin-left: 15px;
  }

  .logo {
    height: 30px;
  }
}
</style>
