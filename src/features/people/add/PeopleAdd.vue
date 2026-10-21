<script lang="ts" setup>
import { DynamicForm, Title } from '@/shared'
import { FieldsPeopleAdd, type PeopleAddFormData, PeopleAddSchema } from './constants'
import { usePeopleStore } from "@/entities/people";

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', data: PeopleAddFormData): void
}>()

const store = usePeopleStore()

const close = () => emit('update:modelValue', false)

const onSubmit = (data: PeopleAddFormData) => {
  store.addPeople(data)

  emit('submit', data)
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
        <Title text="Добавление человека" />
        <v-btn
          density="comfortable"
          icon="mdi-close"
          variant="text"
          @click="close"
        />
      </div>

      <DynamicForm
        :fields="FieldsPeopleAdd"
        :schema="PeopleAddSchema"
        submit-label="Добавить"
        @submit="onSubmit"
      />
    </v-card>
  </v-dialog>
</template>