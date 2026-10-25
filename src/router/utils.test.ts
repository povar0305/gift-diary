import { describe, expect, it } from 'vitest'
import { buildNavigation } from './utils'
import type { RouteRecordRaw } from 'vue-router'

describe('buildNavigation', () => {
  const mockRoutes: RouteRecordRaw[] = [
    {
      path: '/',
      redirect: '/people',
    },
    {
      path: '/people',
      name: 'people',
      component: {},
      meta: {
        title: 'Люди',
        icon: 'mdi-account-group-outline',
        showInNav: true,
      },
    },
    {
      path: '/gifts',
      name: 'gifts',
      component: {},
      meta: {
        title: 'Подарки',
        icon: 'mdi-gift',
        showInNav: true,
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: {},
      meta: {
        title: 'Настройки',
        icon: 'mdi-cog',
        showInNav: false,
      },
    },
    {
      path: '/hidden',
      name: 'hidden',
      component: {},
      meta: {
        showInNav: true,
      },
    },
  ]

  it('должен собирать только те роуты, у которых showInNav === true и есть title/icon', () => {
    const result = buildNavigation(mockRoutes)

    expect(result).toHaveLength(2)

    expect(result[0]).toEqual({
      name: 'people',
      title: 'Люди',
      icon: 'mdi-account-group-outline',
      to: '/people',
    })

    expect(result[1]).toEqual({
      name: 'gifts',
      title: 'Подарки',
      icon: 'mdi-gift',
      to: '/gifts',
    })
  })

  it('должен возвращать пустой массив, если нет подходящих роутов', () => {
    const routesWithoutNav = mockRoutes.filter(r => !r.meta?.showInNav)
    const result = buildNavigation(routesWithoutNav)

    expect(result).toEqual([])
  })
})