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
const { people, isLoadingPeople } = storeToRefs(peopleStore)

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
      :items="people as any"
      :loading="isLoadingPeople"
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


      <template #cell-relation="{ item }">
        {{ RelationPeopleLabels[(item as unknown as People).relation] }}
      </template>

      <template #cell-icon="{ item }">
        <v-icon :icon="(item as unknown as People).icon" />
      </template>

      <template #cell-name="{ item }">
        <router-link
          :to="{name: 'current.people', params: { id: (item as unknown as People).id } }"
          class="text-link text-primary"
        >
          {{ item.name }}
        </router-link>
      </template>

      <template #cell-actions="{ item }">
        <v-btn
          color="error"
          icon="mdi-trash-can-outline"
          variant="text"
          @click="() => {peopleStore.removePeople((item as unknown as People).id)}"
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