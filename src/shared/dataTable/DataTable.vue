<script generic="T extends Record<string, any>" lang="ts" setup>
import type { TableColumn } from './types'
import { computed } from 'vue'

const props = defineProps<{
  items: T[]
  columns: TableColumn<T>[]
  loading?: boolean
}>()

const vuetifyHeaders = computed(() => {
  return props.columns.map((col) => ({
    title: col.title,
    key: col.key,
    sortable: true,
    align: col.align || 'start',
    width: col.width,
  }))
})
</script>

<template>
  <v-data-table
    :headers="vuetifyHeaders"
    :items="items"
    :loading="loading"
    class="elevation-0 rounded-xl border"
    hover
  >
    <template
      v-for="col in columns"
      :key="col.key"
      #[`item.${col.key}`]="{ item }"
    >
      <component
        :is="col.component"
        v-if="col.component"
        v-bind="{ ...col.componentProps, item: item }"
      />

      <span v-else>
        {{ col.formatter ? col.formatter(item[col.key], item) : item[col.key] }}
      </span>
    </template>
  </v-data-table>
</template>

<style scoped>
:deep(.v-data-table__th) {
  font-weight: 600 !important;
  color: rgba(0, 0, 0, 0.6) !important;
  background-color: #f8fafc !important;
}

.border {
  border: 1px solid rgba(15, 23, 42, 0.08);
}
</style>