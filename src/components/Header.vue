<template>
  <div id="header">
    <a-row :wrap="false">
      <a-col flex="150px">
        <router-link to="/">
          <div class="title-bar">
            <img src="@/assets/cloud.png" alt="logo" class="logo" />
            <div class="title">智能云图库</div>
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
          <a-button type="primary" href="/user/login"> 登录</a-button>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import type { MenuProps } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const items = ref<MenuProps['items']>([
  {
    key: '/',
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
