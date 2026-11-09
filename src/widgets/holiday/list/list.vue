<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { type Holiday, useHolidayStore } from "@/entities/holiday";
import { storeToRefs } from "pinia";
import { DataTable, Text, Title } from "@/shared";
import { columnsHolidays, customFilterHolidays, formatHolidayDate } from "./constants";
import { HolidayAdd } from "@/features/holiday";

const isCreateDialogOpen = ref(false)
const editHolidayId = ref<string | null>(null)
const search = ref(null)

const holidayStore = useHolidayStore()
const { holidays, isLoadingHolidays } = storeToRefs(holidayStore)

const editingHoliday = computed(() => holidays.value.find(h => h.id === editHolidayId.value) ?? undefined)

const handleDeleteHoliday = (id: Holiday['id']) => {
  holidayStore.removeHoliday(id)
}

const handleEditHoliday = (id: Holiday['id']) => {
  editHolidayId.value = id
}

onMounted(() => {
  holidayStore.getHolidaysList()
})

onUnmounted(() => {
  holidayStore.stopFetchingHolidays()
})
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <DataTable
      :columns="columnsHolidays"
      :custom-filter="customFilterHolidays"
      :items="holidays as any"
      :loading="isLoadingHolidays"
      :search="search"
    >
      <template #header>
        <div class="d-flex justify-space-between align-sm-center w-full flex-sm-row flex-column ga-2 ga-sm-0">
          <div class="d-flex ga-2 align-center">
            <Title>
              Праздники
            </Title>

            <Text>
              ({{ holidays.length }})
            </Text>

            <v-btn
              density="compact"
              icon="mdi-plus"
              variant="text"
              @click="isCreateDialogOpen = !isCreateDialogOpen"
            />
          </div>

          <v-text-field
            v-model="search"
            clearable
            density="compact"
            hide-details
            label="Поиск по названию, дате или заметке"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 350px; min-width: 250px; width: 100%;"
            variant="outlined"
          />
        </div>
      </template>

      <template #cell-actions="{ item }: { item: Holiday }">
        <v-btn-group
          density="comfortable"
          variant="outlined"
        >
          <v-btn
            color="primary"
            icon="mdi-pencil-outline"
            size="small"
            variant="text"
            @click="handleEditHoliday(item.id)"
          />

          <v-btn
            color="error"
            icon="mdi-trash-can-outline"
            size="small"
            variant="text"
            @click="handleDeleteHoliday(item.id)"
          />
        </v-btn-group>
      </template>

      <template #cell-date="{ item }: { item: Holiday }">
        {{ formatHolidayDate(item.date) }}
      </template>

      <template #cell-icon="{ item }: { item: Holiday }">
        <v-icon
          v-if="item.icon"
          :icon="item.icon"
        />
      </template>

      <template #no-data>
        <v-btn
          prepend-icon="mdi-plus"
          text="Создать праздник"
          variant="tonal"
          @click="isCreateDialogOpen = !isCreateDialogOpen"
        />
      </template>
    </DataTable>

    <HolidayAdd
      v-if="!editingHoliday"
      v-model="isCreateDialogOpen"
    />

    <HolidayAdd
      v-else
      :holiday="editingHoliday"
      :model-value="editHolidayId !== null"
      @update:model-value="(v) => { if (!v) editHolidayId = null }"
    />
  </div>
</template>
