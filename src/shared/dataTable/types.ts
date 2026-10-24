import type { Component } from 'vue'

export type TableColumn = {
  key: string
  title: string
  width?: string | number
  align?: 'start' | 'center' | 'end'
  component?: Component
  componentProps?: Record<string, unknown>
  formatter?: (value: unknown) => string
  sortable?: boolean
}