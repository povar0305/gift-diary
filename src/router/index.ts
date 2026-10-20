import {createRouter, createWebHistory} from 'vue-router'

import PeoplePage from "@/pages/people/PeoplePage.vue";
import PeopleAddPage from "@/pages/people/add/PeopleAddPage.vue";


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
    path: '/people/add',
    name: 'people.add',
    component: PeopleAddPage,
    meta: {
      title: 'Люди',
      icon: 'mdi-account-group-outline',
    },
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
})

export default router
export {routes}