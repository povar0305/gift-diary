<script lang="ts" setup>

import { PeopleAdd, type PeopleAddFormData } from "@/features/people";
import { ref } from "vue";

const isAddDialogOpen = ref(false)

const handlePersonAdded = (data: PeopleAddFormData) => {
  console.debug('Новый человек добавлен:', data)
}
</script>

<template>
  <v-btn
    density="compact"
    icon="mdi-plus"
    variant="text"
    @click="isAddDialogOpen = !isAddDialogOpen"
  />

  <PeopleAdd
    v-model="isAddDialogOpen"
    @submit="handlePersonAdded"
  />
</template>