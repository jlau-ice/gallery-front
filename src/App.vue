<template>
  <div id="app">
    <a-config-provider :locale="zhCN">
      <router-view/>
    </a-config-provider>
  </div>
</template>
<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

import { useLoginUserStore } from '@/stores/useLoginUserStateStore.ts'

const longinUserStore = useLoginUserStore()
longinUserStore.fetchLoginUser()
</script>

<style scoped></style>
