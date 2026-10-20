declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    showInNav?: boolean
  }
}

export type NavigationItem = { name: string, title: string, icon: string, to: string }