<script lang="ts" setup>
import { computed } from "vue";
import { DynamicForm, Title } from '@/shared'
import { type Gift, type GiftCreateFormData, GiftCreateSchema, useGiftStore } from "@/entities/gift";
import { getFieldsGiftCreate, GitsCreateInitialValues } from "./constants";
import { usePeopleStore } from "@/entities/people";
import { useHolidayStore } from "@/entities/holiday";
import { storeToRefs } from "pinia";
import { onMounted, onUnmounted } from "vue";

const props = defineProps<{
  modelValue: boolean
  gift?: Gift
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const store = useGiftStore()

const isEdit = computed(() => Boolean(props.gift))

const initialValues = computed(() => props.gift
  ? {
      personId: props.gift.personId,
      title: props.gift.title,
      status: props.gift.status,
      price: props.gift.price,
      link: props.gift.link,
      datePickup: props.gift.datePickup,
      holidayId: props.gift.holidayId,
    }
  : GitsCreateInitialValues)

const peopleStore = usePeopleStore()
const { people } = storeToRefs(peopleStore)

const holidayStore = useHolidayStore()
const { holidays } = storeToRefs(holidayStore)

onMounted(() => {
  peopleStore.getPeopleList()
  holidayStore.getHolidaysList()
})

onUnmounted(() => {
  peopleStore.stopGetPeopleList()
  holidayStore.stopFetchingHolidays()
})

const close = () => emit('update:modelValue', false)

const onSubmit = (data: GiftCreateFormData) => {
  if (props.gift) {
    store.updateGiftData(props.gift.id, data)
  } else {
    store.createGift(data)
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
        <Title :text="isEdit ? 'Редактирование подарка' : 'Создание подарка'" />

        <v-btn
          density="comfortable"
          icon="mdi-close"
          variant="text"
          @click="close"
        />
      </div>

      <DynamicForm
        :fields="getFieldsGiftCreate(people, holidays)"
        :initial-values="initialValues"
        :schema="GiftCreateSchema"
        :submit-label="isEdit ? 'Сохранить' : 'Создать'"
        @submit="onSubmit"
      />
    </v-card>
  </v-dialog>
</template>