<script lang="ts" setup>

import { PeopleAdd } from "@/features/people";
import { onMounted, onUnmounted, ref } from "vue";
import {
  type People,
  PEOPLE_KEYS_TABLE,
  PeopleFormLabels,
  RelationPeopleLabels,
  usePeopleStore
} from "@/entities/people";
import { DataTable, type TableColumn, Title } from "@/shared";
import { storeToRefs } from "pinia";
import { customFilterPeopleList } from "./constants";

const isAddDialogOpen = ref(false)
const search = ref(null)

const peopleStore = usePeopleStore()
const { people, isLoading } = storeToRefs(peopleStore)

onMounted(() => {
  peopleStore.getPeopleList()
})

onUnmounted(() => {
  peopleStore.stopGetPeopleList()
})

const columnsPeople = PEOPLE_KEYS_TABLE.map((key): TableColumn => ({
  key,
  title: PeopleFormLabels[key],
})).concat({
  key: 'actions',
  title: '',
  sortable: false
})
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <DataTable
      :columns="columnsPeople"
      :custom-filter="customFilterPeopleList"
      :items="people as People[]"
      :loading="isLoading"
      :search="search"
    >
      <template #header>
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
      </template>


      <template #cell-relation="{ item }: { item: People }">
        {{ RelationPeopleLabels[item.relation] }}
      </template>

      <template #cell-icon="{ item }: { item: People }">
        <v-icon :icon="item.icon" />
      </template>

      <template #cell-color="{ item }: { item: People }">
        <div
          :style="{background: item.color }"
          class="color-picker"
        />
      </template>

      <template #cell-actions="{ item }: { item: People }">
        <v-btn
          color="error"
          icon="mdi-trash-can-outline"
          variant="text"
          @click="() => {peopleStore.removePeople(item.id)}"
        />
      </template>

      <template #no-data>
        <v-btn
          density="compact"
          prepend-icon="mdi-plus"
          text="Создать человека"
          variant="tonal"
          @click="isAddDialogOpen = !isAddDialogOpen"
        />
      </template>
    </DataTable>

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