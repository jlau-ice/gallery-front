// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
app.use(Antd)
app.use(createPinia())
app.use(router)

app.mount('#app')
