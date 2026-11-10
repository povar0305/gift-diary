<script lang="ts" setup>
import { computed } from "vue";
import { DynamicForm, Title } from '@/shared'
import { type Holiday, type HolidayCreateFormData, HolidayCreateSchema, useHolidayStore } from "@/entities/holiday";
import { getFieldsHolidayCreate } from "./constants";

const props = defineProps<{
  modelValue: boolean
  holiday?: Holiday
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const store = useHolidayStore()

const isEdit = computed(() => Boolean(props.holiday))

const initialValues = computed(() => props.holiday
  ? {
      title: props.holiday.title,
      date: props.holiday.date,
      icon: props.holiday.icon,
      note: props.holiday.note,
    }
  : {})

const close = () => emit('update:modelValue', false)

const onSubmit = (data: HolidayCreateFormData) => {
  if (props.holiday) {
    store.updateHolidayData(props.holiday.id, data)
  } else {
    store.createHoliday(data)
  }

  close()
}
</script>

<template>
  <v-dialog
    :model-value="modelValue"
    max-width="500"
    persistent
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card class="pa-6 rounded-xl">
      <div class="d-flex justify-space-between align-center mb-6">
        <Title :text="isEdit ? 'Редактирование праздника' : 'Создание праздника'" />

        <v-btn
          density="comfortable"
          icon="mdi-close"
          variant="text"
          @click="close"
        />
      </div>

      <DynamicForm
        :fields="getFieldsHolidayCreate()"
        :initial-values="initialValues"
        :schema="HolidayCreateSchema"
        :submit-label="isEdit ? 'Сохранить' : 'Создать'"
        @submit="onSubmit"
      />
    </v-card>
  </v-dialog>
</template>
