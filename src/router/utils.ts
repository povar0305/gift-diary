import type { RouteRecordRaw } from 'vue-router'
import { routes } from './index'
import type { NavigationItem } from './types'

/**
 * Собирает элементы навигации из роутов.
 * Берёт только те, у которых meta.showInNav === true
 * и присутствуют meta.title и meta.icon.
 */
export function buildNavigation(routeList: readonly RouteRecordRaw[]): NavigationItem[] {
  return routeList
    .filter((route) => route.meta?.showInNav && route.meta?.title && route.meta?.icon)
    .map((route) => ({
      name: String(route.name),
      title: route.meta!.title as string,
      icon: route.meta!.icon as string,
      to: route.path,
    }))
}

export const navigationItems = buildNavigation(routes)