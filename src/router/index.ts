import { createRouter, createWebHashHistory } from 'vue-router'

import PeoplePage from "@/pages/people/PeoplePage.vue";
import PeopleWithoutGiftPage from "@/pages/people/without-gift/PeopleWithoutGiftPage.vue";
import GiftsPage from "@/pages/gifts/GiftsPage.vue";
import HumanPage from "@/pages/people/[id]/HumanPage.vue";
import HolidaysPage from "@/pages/holidays/HolidaysPage.vue";
import HolidayPage from "@/pages/holiday/[id]/HolidayPage.vue";

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
    path: '/people/without-gifts',
    name: 'people.without-gifts',
    component: PeopleWithoutGiftPage,
    meta: {
      title: 'Люди без подарка',
      icon: 'mdi-account-off-outline',
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
  },
  {
    path: '/holidays',
    name: 'holidays',
    component: HolidaysPage,
    meta: {
      title: 'Праздники',
      icon: 'mdi-gift-outline',
      showInNav: true,
    },
  },
  {
    path: '/holidays/:id',
    name: 'current.holiday',
    component: HolidayPage,
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
export { routes }