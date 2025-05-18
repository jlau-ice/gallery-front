<template>
  <div id="layout">
    <a-layout class="main">
      <a-layout-header class="header">
        <Header />
      </a-layout-header>
      <a-layout-content class="p-[20px] mt-[64px] mb-[20px]">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"> carbon-dioxide</a-layout-footer>
    </a-layout>
  </div>
</template>
<script setup lang="ts">
import Header from '@/layout/components/Header.vue'
</script>

<style scoped lang="scss">
.main {
  min-height: 100vh;

  .header {
    background: white;
    color: unset;
    margin-bottom: 16px;
    padding-inline: 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
  }

  .content {
    padding: 20px;
    background: linear-gradient(to right, #fefefe, #fff);
    margin-bottom: 20px;
    margin-top: 64px;
  }

  .footer {
    background: #efefef;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    height: 30px;
  }
}
</style>
