import type { Component } from 'vue'
import type { FilterFunction } from "vuetify/framework";

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

export type DataTableProps<T> = {
  items: T[]
  columns: TableColumn[]
  loading?: boolean
  search?: string | null
  customFilter?: FilterFunction
}