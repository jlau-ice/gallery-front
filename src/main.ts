// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/access'
const app = createApp(App)

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
// import * as Icons from "@ant-design/icons-vue";
// const icons: any = Icons;

import '@/style/main.css'
app.use(Antd)
app.use(createPinia())
app.use(router)

app.mount('#app')
// for (const i in icons) {
//   app.component(i, icons[i]);
// }
