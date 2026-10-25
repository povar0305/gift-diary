<script generic="T extends Record<string, unknown>" lang="ts" setup>
import { computed, useSlots } from 'vue'
import { Text } from '@/shared'
import { type DataTableProps } from './types'

const props = defineProps<DataTableProps<T>>()

const vuetifyHeaders = computed(() => {
  return props.columns.map((col) => ({
    title: col.title,
    key: col.key,
    sortable: col.sortable ?? true,
    align: col.align || 'start',
    width: col.width,
  }))
})

const slots = useSlots()
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <slot name="header" />

    <v-data-table
      :custom-filter="customFilter"
      :headers="vuetifyHeaders"
      :items="items"
      :loading="loading"
      :search="search || ''"
      class="elevation-0 rounded-lg border"
      hover
    >
      <template
        v-for="col in columns"
        :key="col.key"
        #[`item.${col.key}`]="{ item }"
      >
        <slot
          v-if="slots[`cell-${col.key}`]"
          :item="item as T"
          :name="`cell-${col.key}`"
          :value="item[col.key]"
        />

        <component
          :is="col.component"
          v-else-if="col.component"
          v-bind="{ ...col.componentProps, item: item as T }"
        />

        <span v-else>
          {{ col.formatter ? col.formatter(item[col.key]) : item[col.key] }}
        </span>
      </template>

      <template #no-data>
        <div class="no-data">
          <slot name="no-data">
            <Text>К сожалению, ничего не нашлось</Text>
          </slot>
        </div>
      </template>
    </v-data-table>
  </div>
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

.no-data {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-table__wrapper {
  display: flex;
}
</style>