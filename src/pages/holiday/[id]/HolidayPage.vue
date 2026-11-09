<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { type Holiday, useHolidayStore } from "@/entities/holiday";
import { GiftList } from "@/widgets/gifts";
import { HolidayPeopleList } from '@/widgets/holiday';
import { orderBy, where } from "firebase/firestore";
import { Text, Title } from "@/shared";
import dayjs from 'dayjs'

const route = useRoute()
const holidayId = computed(() => route.params.id as string)

const router = useRouter()

const holidayStore = useHolidayStore()
const { holidays } = storeToRefs(holidayStore)

const holiday = computed<Holiday | undefined>(() => {
  return holidays.value.find(h => h.id === holidayId.value)
})

const formatDate = (date?: string) => {
  if (!date || date.length === 0) return ''
  return dayjs(date).format('DD.MM.YYYY')
}

const assemblyFilters = () => [
  where('holidayId', '==', holidayId.value),
  orderBy('status', 'asc')
]

onMounted(() => {
  holidayStore.getHolidaysList()
})

onUnmounted(() => {
  holidayStore.stopFetchingHolidays()
})
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <v-card
      v-if="holiday"
      class="pa-4"
      elevation="0"
    >
      <div class="d-flex justify-space-between align-start">
        <div class="d-flex align-center">
          <v-avatar
            v-if="holiday.icon"
            class="mr-4"
            color="primary"
            size="32"
            variant="tonal"
          >
            <v-icon
              :icon="holiday.icon"
              size="20"
            />
          </v-avatar>

          <div class="d-flex flex-column ga-1">
            <Title :text="holiday.title" />
            <Text>Дата: {{ formatDate(holiday.date) }}</Text>
            <Text v-if="holiday.note">Заметка: {{ holiday.note }}</Text>
          </div>
        </div>

        <v-btn
          color="#DC2626"
          density="compact"
          icon="mdi-trash-can-outline"
          variant="text"
          @click="() => { holidayStore.removeHoliday(holidayId); router.push({ name: 'holidays' }) }"
        />
      </div>
    </v-card>

    <HolidayPeopleList
      v-if="holiday"
      :holiday-id="holidayId"
    />

    <GiftList :get-filters="assemblyFilters" />
  </div>
</template>

<style scoped>

</style>
