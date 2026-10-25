<script lang="ts" setup>

import { PeopleAdd } from "@/features/people";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { usePeopleStore } from "@/entities/people";
import { Text, Title } from "@/shared";
import { storeToRefs } from "pinia";
import { PeopleCard } from "@/widgets/people";
import { customFilterPeopleList } from "./constants";

const isAddDialogOpen = ref(false)
const search = ref(null)

const peopleStore = usePeopleStore()
const { people, isLoadingPeople } = storeToRefs(peopleStore)

const filteredPeople = computed(() => {
  if (!search.value) return people.value

  return people.value.filter(person => {
    return customFilterPeopleList('', search.value!, person)
  })
})

onMounted(() => {
  peopleStore.getPeopleList()
})

onUnmounted(() => {
  peopleStore.stopGetPeopleList()
})

</script>

<template>
  <div class="d-flex flex-column ga-4">
    <div class="d-flex justify-space-between align-center w-full">
      <div class="d-flex ga-2 align-center">
        <Title>
          Люди
        </Title>

        <v-btn
          density="compact"
          icon="mdi-plus"
          variant="text"
          @click="isAddDialogOpen = !isAddDialogOpen"
        />
      </div>

      <v-text-field
        v-model="search"
        clearable
        density="compact"
        hide-details
        label="Поиск по любому параметру"
        prepend-inner-icon="mdi-magnify"
        style="max-width: 300px;"
        variant="outlined"
      />
    </div>

    <v-row v-if="isLoadingPeople">
      <v-col
        v-for="index in 12"
        :key="index"
        cols="12"
        md="4"
        sm="6"
      >
        <v-skeleton-loader

          type="list-item-avatar"
        />
      </v-col>
    </v-row>


    <v-row v-else-if="filteredPeople.length> 0 && !isLoadingPeople">
      <v-col
        v-for="human in filteredPeople"
        :key="human.id"
        cols="12"
        md="4"
        sm="6"
      >
        <PeopleCard :person="human" />
      </v-col>
    </v-row>

    <div
      v-else
      class="d-flex align-center justify-center flex-column ga-4"
    >
      <Text class="d-flex justify-center ">
        К сожалению, не нашлось людей
      </Text>

      <v-btn
        prepend-icon="mdi-plus"
        text="Добавить человека"
        variant="tonal"
        @click="isAddDialogOpen = !isAddDialogOpen"
      />
    </div>

    <PeopleAdd
      v-model="isAddDialogOpen"
    />
  </div>
</template>

<style>
.color-picker {
  width: 2rem;
  height: 1rem;
  cursor: pointer;
  border-radius: 1rem;
  margin-left: 0.5rem;
}
</style>