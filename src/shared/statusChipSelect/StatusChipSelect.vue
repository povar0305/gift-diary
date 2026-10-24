<script lang="ts" setup>
import { computed } from 'vue'
import type { StatusChipProps } from "./types";

const props = defineProps<StatusChipProps>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const selectedOption = computed(() => {
  return props.items.find(item => item.value === props.modelValue) || props.items[0]
})

const selectOption = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <v-menu>
    <template #activator="{ props: menuProps }">
      <v-chip
        :color="selectedOption?.color || 'primary'"
        append-icon="mdi-chevron-down"
        class="cursor-pointer"
        v-bind="menuProps"
        variant="tonal"
      >
        {{ selectedOption?.title }}
      </v-chip>
    </template>

    <v-list density="compact">
      <v-list-item
        v-for="item in items"
        :key="item.value"
        :active="item.value === modelValue"
        @click="selectOption(item.value)"
      >
        <template #prepend>
          <v-icon
            :color="item.color"
            icon="mdi-circle"
            size="12"
          />
        </template>

        <v-list-item-title> {{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

:deep(.v-list-item__prepend) {
  width: 24px !important;
  margin-right: 8px;
}
</style>