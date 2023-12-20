import { createRouter, createWebHistory } from 'vue-router'
import Lists from '../views/Private/Lists.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Lists
    },

  ]
})

export default router
