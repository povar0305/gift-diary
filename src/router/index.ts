import { createRouter, createWebHashHistory } from 'vue-router'

import PeoplePage from "@/pages/people/PeoplePage.vue";
import GiftsPage from "@/pages/gifts/GiftsPage.vue";
import HumanPage from "@/pages/people/[id]/HumanPage.vue";


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
  },
  {
    path: '/people/:id',
    name: 'current.people',
    component: HumanPage,
  },
  {
    path: '/gifts',
    name: 'gifts',
    component: GiftsPage,
    meta: {
      title: 'Подарки',
      icon: 'mdi-account-group-outline',
      showInNav: true,
    },
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
export { routes }