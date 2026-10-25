<script lang="ts" setup>
import { DynamicForm, Title } from '@/shared'
import { getFieldsPeopleAdd, type PeopleAddFormData, PeopleAddSchema } from './constants'
import { usePeopleStore } from "@/entities/people";
import { storeToRefs } from "pinia";
import { computed } from "vue";

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const peopleStore = usePeopleStore()

const close = () => emit('update:modelValue', false)

const onSubmit = (data: PeopleAddFormData) => {
  peopleStore.addPeople(data)

  close()
}


const { people } = storeToRefs(peopleStore)
const usedIcons = computed(() => {
  return people.value
      .map(p => p.icon)
      .filter((icon): icon is string => Boolean(icon))
})

const fields = computed(() => getFieldsPeopleAdd(usedIcons.value))

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
        :fields="fields"
        :schema="PeopleAddSchema"
        submit-label="Добавить"
        @submit="onSubmit"
      />
    </v-card>
  </v-dialog>
</template>