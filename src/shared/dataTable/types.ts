import type { Component } from 'vue'

export interface TableColumn<T = never> {
  key: string
  title: string
  width?: string | number
  align?: 'start' | 'center' | 'end'
  component?: Component
  componentProps?: Record<string, never>
  formatter?: (value: never, item: T) => string
}