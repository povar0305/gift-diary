<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { type Gift, GiftStatus, GiftStatusItems, useGiftStore } from "@/entities/gift";
import { type People, usePeopleStore } from "@/entities/people";
import { storeToRefs } from "pinia";
import { DataTable, StatusChipSelect, Text, Title } from "@/shared";
import { columnsGifts, getMarketplaceFromUrl } from "./constants";
import { GiftAdd } from "@/features/gift";
import dayjs from 'dayjs'
import { orderBy, type QueryConstraint, where } from 'firebase/firestore'
import type { GiftsListProps } from "./types";


const props = defineProps<GiftsListProps>()


const isCreateDialogOpen = ref(false)

const giftsStore = useGiftStore()
const { gifts, isLoadingGifts } = storeToRefs(giftsStore)


const peopleStore = usePeopleStore()
const { people, isLoadingPeople } = storeToRefs(peopleStore)

const getCurrentFilters = (): QueryConstraint[] => {
  // 1. Если родитель передал свою функцию — используем её
  if (props.getFilters) {
    return props.getFilters()
  }

  // 2. Иначе используем стандартную логику
  if (isShowedGiven.value) {
    return [
      where('status', '==', GiftStatus.Given),
      orderBy('datePickup', 'desc')
    ]
  } else {
    return [
      where('status', '!=', GiftStatus.Given),
      orderBy('datePickup', 'asc')
    ]
  }
}
const updateGiftsList = () => {
  giftsStore.getGiftsList(getCurrentFilters())
}

onMounted(() => {
  updateGiftsList()
  peopleStore.getPeopleList()
})

onUnmounted(() => {
  giftsStore.stopFetchingGifts()
  peopleStore.stopGetPeopleList()
})

const isShowedGiven = ref(false)

watch(isShowedGiven, () => {
  updateGiftsList()
})
const search = ref(null)

const totalPrice = computed(() => gifts.value.reduce((total, item) => total + (item['price'] as number), 0))

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

    return false
  }
}
const giftFilter = computed(() => createGiftFilter(people.value))

const formatGiftDate = (date?: string) => {
  if (!date || date.length === 0) return ''
  return dayjs(date).format('DD.MM.YYYY')
}
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
        <div class="d-flex justify-space-between align-center w-full">
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

          <div class="d-flex ga-4 align-center">
            <v-text-field
              v-model="search"
              clearable
              density="compact"
              hide-details
              label="Поиск по любому параметру"
              prepend-inner-icon="mdi-magnify"
              style="width: 300px;"
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
        <v-btn
          :href="item.link as string"
          color="grey-lighten-1"
          icon="mdi-open-in-new"
          size="small"
          target="_blank"
          variant="text"
        />

        <v-btn
          color="error"
          icon="mdi-trash-can-outline"
          variant="text"
          @click="() => { giftsStore.removeGift((item as Gift).id) }"
        />
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
            :icon="getMarketplaceFromUrl((item as Gift).link || '').icon"
            size="small"
            variant="plain"
          />
        </div>
      </template>

      <template #cell-status="{ item }">
        <div class="d-flex ga-4 align-center">
          <StatusChipSelect
            :items="GiftStatusItems"
            :model-value="(item as Gift).status"
            @update:model-value="(newStatus) => {
              giftsStore.updateGift((item as Gift).id, 'status', newStatus as GiftStatus)
            }"
          />

          <v-icon
            v-if="[
              GiftStatus.AtHome,
              GiftStatus.Wrapped
            ].includes((item as Gift).status)"
            :icon="people.find((hero) => hero?.id === item?.personId)?.icon"
          />
        </div>
      </template>

      <template #no-data>
        <v-btn
          density="compact"
          prepend-icon="mdi-plus"
          text="Создать подарок"
          variant="tonal"
          @click="isCreateDialogOpen = !isCreateDialogOpen"
        />
      </template>
    </datatable>

    <Text v-if="totalPrice>0">
      Общая сумма: {{ totalPrice }} ₽
    </Text>

    <GiftAdd
      v-model="isCreateDialogOpen"
    />
  </div>
</template>