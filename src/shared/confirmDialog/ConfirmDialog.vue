<script lang="ts" setup>
import { Text, Title } from "@/shared";

defineProps<{
  modelValue: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'confirm'): void
}>()

const close = () => emit('update:modelValue', false)

const handleConfirm = () => {
  emit('confirm')
  close()
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="400"
    persistent
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card class="pa-6 rounded-xl">
      <div class="d-flex flex-column ga-4">
        <Title :text="title" />

        <Text>
          {{ message }}
        </Text>

        <div class="d-flex justify-end ga-2 mt-4">
          <v-btn
            variant="text"
            @click="close"
          >
            {{ cancelText || 'Отмена' }}
          </v-btn>

          <v-btn
            color="error"
            variant="tonal"
            @click="handleConfirm"
          >
            {{ confirmText || 'Удалить' }}
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
