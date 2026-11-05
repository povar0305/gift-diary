<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { usePeopleStore } from "@/entities/people"
import { GiftStatus, useGiftStore } from "@/entities/gift"
import { storeToRefs } from 'pinia'
import { PeopleCard } from "@/widgets/people"
import { Text, Title } from "@/shared"
import { customFilterPeopleWithoutGift } from './constants'

const peopleStore = usePeopleStore()
const { people, isLoadingPeople } = storeToRefs(peopleStore)

const giftsStore = useGiftStore()
const { gifts, isLoadingGifts } = storeToRefs(giftsStore)

const search = ref(null)

const peopleWithoutActiveGift = computed(() => {
  const peopleWithActiveGift = new Set(
      gifts.value
          .filter(gift => gift.status !== GiftStatus.Given)
          .map(gift => gift.personId)
  )

  return people.value.filter(person => !peopleWithActiveGift.has(person.id))
})

const filteredPeopleWithoutGift = computed(() => {
  if (!search.value) return peopleWithoutActiveGift.value
  return peopleWithoutActiveGift.value.filter(person => {
    return customFilterPeopleWithoutGift('', search.value!, person)
  })
})

onMounted(() => {
  peopleStore.getPeopleList()
  giftsStore.getGiftsList()
})

onUnmounted(() => {
  peopleStore.stopGetPeopleList()
  giftsStore.stopFetchingGifts()
})
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <div class="d-flex justify-space-between align-sm-center w-full flex-column flex-sm-row w-100 ga-2 ga-sm-0">
      <div class="d-flex ga-2 align-center w-100">
        <Title>
          Люди без подарка
        </Title>

        <Text>
          ({{ peopleWithoutActiveGift.length }})
        </Text>
      </div>

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
    </div>

    <v-row v-if="isLoadingPeople || isLoadingGifts">
      <v-col
        v-for="index in 12"
        :key="index"
        cols="12"
        md="4"
        sm="6"
      >
        <v-skeleton-loader type="list-item-avatar" />
      </v-col>
    </v-row>

    <v-row v-else-if="filteredPeopleWithoutGift.length > 0 && !isLoadingPeople">
      <v-col
        v-for="person in filteredPeopleWithoutGift"
        :key="person.id"
        cols="12"
        md="4"
        sm="6"
      >
        <PeopleCard :person="person" />
      </v-col>
    </v-row>

    <div
      v-else
      class="d-flex align-center justify-center flex-column ga-4"
    >
      <Text class="d-flex justify-center">
        К сожалению, все люди уже с подарком
      </Text>
    </div>
  </div>
</template>
