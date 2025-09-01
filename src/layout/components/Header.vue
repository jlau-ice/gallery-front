<template>
  <div id="header">
    <a-row :wrap="false">
      <a-col flex="180px">
        <router-link to="/">
          <div class="flex items-center h-full">
            <img src="@/assets/logo.png" alt="logo" class="h-[30px]" />
            <div class="text-black text-lg ml-[15px]">智 能 云 图 库</div>
          </div>
        </router-link>
      </a-col>
      <a-col flex="auto">
        <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" @click="menuClick" />
      </a-col>
      <a-col flex="120px">
        <div class="user-login-status">
          <div v-if="longinUserStore.loginUser.id">
            <a-dropdown placement="bottom" :trigger="['click']" :overlay-style="{ height: '10px' }">
              <a class="ant-dropdown-link h-[64px]" @click.prevent>
                <a-space>
                  <a-avatar :src="longinUserStore.loginUser.userAvatar" />
                  <div class="w-[50px] text-nowrap overflow-hidden text-ellipsis">
                    {{ longinUserStore.loginUser.userName }}
                  </div>
                  <DownOutlined />
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
import { computed, h, ref } from 'vue'
import { HomeOutlined, LoginOutlined, DownOutlined } from '@ant-design/icons-vue'
import { type MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStateStore.ts'
import { userLogoutUsingPost } from '@/api/userController.ts'

const longinUserStore = useLoginUserStore()
const router = useRouter()

const originItems = [
  {
    key: '/home',
    icon: h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/admin/userManager',
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/other',
    label: h('a', { href: 'https://ant.design', target: '_blank' }, '其他'),
    title: '设置',
  },
]
const items = computed<MenuProps['items']>(() => filterMenus(originItems))

const filterMenus = (menus = [] as MenuProps['items']) => {
  return menus?.filter((menus) => {
    const key = menus?.key?.toString()
    if (key?.startsWith('/admin')) {
      const loginUser = longinUserStore.loginUser
      // if (!loginUser || loginUser.userRole !== 'admin') {
      //   return false
      // }
      return loginUser && loginUser.userRole === 'admin'
    }
    return true
  })
}

const current = ref<string[]>([router.currentRoute.value.path])

const menuClick = ({ key }: { key: string }) => {
  router.push(key)
}

router.afterEach((to, from) => {
  current.value = [to.path]
  console.log(from)
})

const logout = async () => {
  const res = await userLogoutUsingPost()
  if (res.data.code === 0) {
    longinUserStore.setLoginUser({ userName: '未登录' })
    message.success('退出成功')
    await router.push({
      path: '/login',
      replace: true,
    })
  } else {
    message.error('退出失败：' + res.data.message)
  }
}
</script>
<style lang="scss" scoped></style>
