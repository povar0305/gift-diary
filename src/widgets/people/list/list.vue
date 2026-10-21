<script lang="ts" setup>

import { PeopleAdd } from "@/features/people";
import { onMounted, onUnmounted, ref } from "vue";
import { RelationPeopleLabels, usePeopleStore } from "@/entities/people";
import { DataTable, Title } from "@/shared";
import { storeToRefs } from "pinia";

const isAddDialogOpen = ref(false)

const peopleStore = usePeopleStore()
const { people, isLoading } = storeToRefs(peopleStore)

onMounted(() => {
  peopleStore.getPeopleList()
})

onUnmounted(() => {
  peopleStore.stopGetPeopleList()
})

const columnsPeople = [
  {
    key: 'name',
    title: 'Имя'
  },
  {
    key: 'relation',
    title: 'Связь'
  },
  {
    key: 'icon',
    title: 'Иконка'
  },
  {
    key: 'color',
    title: 'Цвет'
  },
  {
    key: 'delete',
    title: ''
  },
]

</script>

<template>
  <div class="d-flex flex-column ga-4">
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

    <DataTable
      :columns="columnsPeople"
      :items="people"
      :loading="isLoading"
    >
      <template #cell-relation="{item}">
        {{ RelationPeopleLabels[item.relation] }}
      </template>

      <template #cell-icon="{item}">
        <v-icon :icon="item.icon" />
      </template>
      
      <template #cell-color="{item}">
        <div
          :style="{background: item.color }"
          class="color-picker"
        />
      </template>

      <template #cell-delete="{item}">
        <v-btn
          color="error"
          icon="mdi-trash-can-outline"
          variant="text"
          @click="() => {peopleStore.removePeople(item.id)}"
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