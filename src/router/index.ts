import { createRouter, createWebHistory } from 'vue-router'

import layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: layout,
      children: [
        {
          path: '/admin/userManager',
          name: 'userManager',
          component: () => import('@/views/admin/UserManager.vue'),
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/Home.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/UserLogin.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/user/UserRegister.vue'),
    },
  ],
})

export default router
