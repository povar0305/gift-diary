import { createRouter, createWebHistory } from 'vue-router'

import PeoplePage from "@/pages/people/PeoplePage.vue";


const routes = [
  {
    path: '/',
    redirect: '/people',
  },
  {
    path: '/people',
    name: 'people',
    component: PeoplePage,
    meta: {
      title: 'Люди',
      icon: 'mdi-account-group-outline',
      showInNav: true,
    },
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
export { routes }