<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { type Gift, GiftStatus, GiftStatusItems, useGiftStore } from "@/entities/gift";
import { type People, usePeopleStore } from "@/entities/people";
import { useHolidayStore } from "@/entities/holiday";
import { storeToRefs } from "pinia";
import { DataTable, StatusChipSelect, Text, Title } from "@/shared";
import { columnsGifts, getMarketplaceFromUrl } from "./constants";
import { GiftAdd } from "@/features/gift";
import dayjs from 'dayjs'
import { orderBy, type QueryConstraint, where } from 'firebase/firestore'
import type { GiftsListProps } from "./types";

const props = defineProps<GiftsListProps>()

const isCreateDialogOpen = ref(false)
const editGiftId = ref<string | null>(null)

const giftsStore = useGiftStore()
const { gifts, isLoadingGifts } = storeToRefs(giftsStore)
const editingGift = computed(() => gifts.value.find(g => g.id === editGiftId.value) ?? undefined)
const formatGiftDate = (date?: string) => {
  if (!date || date.length === 0) return ''
  return dayjs(date).format('DD.MM.YYYY')
}

const peopleStore = usePeopleStore()
const { people, isLoadingPeople } = storeToRefs(peopleStore)

const holidayStore = useHolidayStore()
const { holidays } = storeToRefs(holidayStore)

const search = ref(null)

const selectedHolidayId = ref<string | null>(null)
const isShowedGiven = ref(false)

const giftFilter = computed(() => createGiftFilter(people.value))
const createGiftFilter = (peopleList: People[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (value: string, search: string, item: any) => {
    if (!item || !item?.raw) return false
    if (!search) return true

    const searchLower = search.toLowerCase()
    const gift = item?.raw as Gift

    if (gift.title?.toLowerCase().includes(searchLower)) return true
    if (gift.price?.toString().toLowerCase().includes(searchLower)) return true

    if (gift.personId) {
      const person = peopleList.find(p => p.id === gift.personId)

      if (person && person.name.toLowerCase().includes(searchLower)) {
        return true
      }
    }

    if (gift.link) {
      const marketplace = getMarketplaceFromUrl(gift.link)
      if (marketplace?.name.toLowerCase().includes(searchLower)) {
        return true
      }
    }

    if (gift.holidayId) {
      const holiday = holidays.value.find(h => h.id === gift.holidayId)
      if (holiday && holiday.title.toLowerCase().includes(searchLower)) {
        return true
      }
    }

    return false
  }
}
const getCurrentFilters = (): QueryConstraint[] => {
  const parentFilters = props.getFilters ? props.getFilters() : []

  let internalFilters: QueryConstraint[] = []

  if (isShowedGiven.value) {
    internalFilters = [
      where('status', '==', GiftStatus.Given),
      orderBy('datePickup', 'desc')
    ]
  } else {
    internalFilters = [
      where('status', '!=', GiftStatus.Given),
      orderBy('datePickup', 'asc')
    ]
  }

  if (selectedHolidayId.value) {
    internalFilters.push(where('holidayId', '==', selectedHolidayId.value))
  }

  return [...parentFilters, ...internalFilters]
}
const updateGiftsList = () => {
  giftsStore.getGiftsList(getCurrentFilters())
}
const totalPrice = computed(() => gifts.value
    .reduce((total, item) => total + (item['price'] as number), 0))
const totalPriceApproved = computed(() => gifts.value
    .filter(item => item.status !== GiftStatus.Idea)
    .reduce((total, item) => total + (item['price'] as number), 0))

watch(isShowedGiven, () => {
  updateGiftsList()
})

watch(selectedHolidayId, () => {
  updateGiftsList()
})

onMounted(() => {
  updateGiftsList()
  peopleStore.getPeopleList()
  holidayStore.getHolidaysList()
})

onUnmounted(() => {
  giftsStore.stopFetchingGifts()
  peopleStore.stopGetPeopleList()
  holidayStore.stopFetchingHolidays()
})
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <DataTable
      :columns="columnsGifts"
      :custom-filter="giftFilter"
      :items="gifts as any"
      :loading="isLoadingGifts || isLoadingPeople"
      :search="search"
    >
      <template #header>
        <div class="d-flex justify-space-between align-sm-center w-full flex-sm-row flex-column ga-2 ga-sm-0">
          <div class="d-flex ga-2 align-center">
            <slot name="header">
              <Title>
                Подарки
              </Title>

              <Text>
                ({{ gifts.length }})
              </Text>
            </slot>


            <v-btn
              density="compact"
              icon="mdi-plus"
              variant="text"
              @click="isCreateDialogOpen = !isCreateDialogOpen"
            />
          </div>

          <div class="d-flex ga-4 align-sm-center flex-sm-row flex-column w-sm-100 justify-sm-end">
            <v-text-field
              v-model="search"
              clearable
              density="compact"
              hide-details
              label="Поиск по любому параметру"
              prepend-inner-icon="mdi-magnify"
              style="max-width: 350px; min-width: 250px; width: 100%;"
              variant="outlined"
            />

            <v-select
              v-model="selectedHolidayId"
              :items="[{ title: 'Все праздники', value: null }, ...holidays.map(h => ({ title: h.title, value: h.id }))]"
              clearable
              density="compact"
              hide-details
              label="Фильтр по празднику"
              style="max-width: 250px; min-width: 200px; width: 100%;"
              variant="outlined"
            />

            <v-switch
              v-model="isShowedGiven"
              density="compact"
              hide-details
              inset
              label="Врученые"
              size="x-small"
            />
          </div>
        </div>
      </template>

      <template #cell-actions="{ item }">
        <v-btn-group
          density="comfortable"
          variant="outlined"
        >
          <v-btn
            color="primary"
            icon="mdi-pencil-outline"
            size="small"
            variant="text"
            @click="editGiftId = (item as Gift).id"
          />

          <v-btn
            color="error"
            icon="mdi-trash-can-outline"
            size="small"
            variant="text"
            @click="() => { giftsStore.removeGift((item as Gift).id) }"
          />
        </v-btn-group>
      </template>

      <template #cell-personId="{ item }">
        {{ people.find((hero) => hero?.id === item?.personId)?.name }}
      </template>

      <template #cell-datePickup="{ item }">
        <div
          v-if="item?.link"
          class="d-flex ga-2 align-center"
        >
          {{ formatGiftDate((item as Gift).datePickup) }}

          <v-btn
            :color="getMarketplaceFromUrl((item as Gift).link || '').color"

            :href="item.link as string"
            :icon="getMarketplaceFromUrl((item as Gift).link || '').icon"
            size="small"
            target="_blank"
            variant="plain"
          />
        </div>
      </template>

      <template #cell-status="{ item }: { item: Gift }">
        <div class="d-flex ga-4 align-center">
          <StatusChipSelect
            :items="GiftStatusItems"
            :model-value="item.status"
            @update:model-value="(newStatus) => {
              giftsStore.updateGift(item.id, 'status', newStatus as GiftStatus)
            }"
          />

          <v-icon
            v-if="[
              GiftStatus.AtHome,
              GiftStatus.Wrapped
            ].includes(item.status)"
            :icon="people.find((hero) => hero?.id === item?.personId)?.icon"
          />
        </div>
      </template>

      <template #cell-holidayId="{ item }: { item: Gift }">
        {{ holidays.find(h => h.id === item.holidayId)?.title }}
      </template>

      <template #no-data>
        <v-btn
          prepend-icon="mdi-plus"
          text="Создать подарок"
          variant="tonal"
          @click="isCreateDialogOpen = !isCreateDialogOpen"
        />
      </template>
    </datatable>

    <Text v-if="totalPrice>0">
      Общая сумма: {{ totalPrice }} ₽, подтверждено {{ totalPriceApproved }} ₽
    </Text>

    <GiftAdd
      v-if="!editingGift"
      v-model="isCreateDialogOpen"
    />

    <GiftAdd
      v-else
      :gift="editingGift"
      :model-value="editGiftId !== null"
      @update:model-value="(v) => { if (!v) editGiftId = null }"
    />
  </div>
</template>