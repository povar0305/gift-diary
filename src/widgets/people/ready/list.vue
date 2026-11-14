<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { type Gift, GiftStatus, GiftStatusItems, GiftStatusLabels, useGiftStore } from "@/entities/gift";
import { useHolidayStore } from "@/entities/holiday";
import { usePeopleStore } from "@/entities/people";
import { DataTable, StatusChipSelect, Text, Title } from "@/shared";
import { columnsReadyGifts, customFilterReadyGifts } from "./constants";
import type { ReadyGift } from "./types";

const giftStore = useGiftStore();
const holidayStore = useHolidayStore();
const peopleStore = usePeopleStore();

const { gifts, isLoadingGifts } = storeToRefs(giftStore);
const { holidays, isLoadingHolidays } = storeToRefs(holidayStore);
const { people, isLoadingPeople } = storeToRefs(peopleStore);

const search = ref<string | null>(null);
const selectedHolidayId = ref<string | null>(null);

const availableHolidayIds = computed(() => {
  return new Set(gifts.value.filter(g => g.holidayId).map(g => g.holidayId));
});

const availableHolidays = computed(() => {
  return holidays.value.filter(h => availableHolidayIds.value.has(h.id));
});

const holidayItems = computed(() => {
  return availableHolidays.value.map(h => ({ title: h.title, value: h.id }));
});

watchEffect(() => {
  const holidayIds = holidayItems.value.map(item => item.value);

  if (!selectedHolidayId.value || !holidayIds.includes(selectedHolidayId.value)) {
    selectedHolidayId.value = holidayIds[0] ?? null;
  }
});

const readyGifts = computed<ReadyGift[]>(() => {
  const holidayId = selectedHolidayId.value;
  if (!holidayId) return [];

  const giftsByPerson = new Map<string, Gift[]>();

  for (const gift of gifts.value) {
    if (gift.holidayId !== holidayId) continue;

    const personGifts = giftsByPerson.get(gift.personId);

    if (personGifts) {
      personGifts.push(gift);
    } else {
      giftsByPerson.set(gift.personId, [gift]);
    }
  }

  return [...giftsByPerson.values()]
      .filter(personGifts => personGifts.every(g => g.status === GiftStatus.AtHome))
      .flat()
      .map(gift => {
        const person = people.value.find(p => p.id === gift.personId);

        return {
          ...gift,
          personName: person?.name ?? '',
          personIcon: person?.icon,
          statusLabel: GiftStatusLabels[gift.status],
        };
      });
});

onMounted(() => {
  giftStore.getGiftsList();
  holidayStore.getHolidaysList();
  peopleStore.getPeopleList();
});

onUnmounted(() => {
  giftStore.stopFetchingGifts();
  holidayStore.stopFetchingHolidays();
  peopleStore.stopGetPeopleList();
});
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <DataTable
      :columns="columnsReadyGifts"
      :custom-filter="customFilterReadyGifts"
      :items="readyGifts"
      :loading="isLoadingGifts || isLoadingPeople || isLoadingHolidays"
      :search="search"
    >
      <template #header>
        <div class="d-flex justify-space-between align-sm-center w-full flex-sm-row flex-column ga-2 ga-sm-0">
          <div
            class="d-flex ga-2 align-center w-100"
          >
            <Title>
              Нужно упаковать
            </Title>

            <Text>
              ({{ readyGifts.length }})
            </Text>
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
              :items="availableHolidays.map(h => ({ title: h.title, value: h.id }))"
              density="compact"
              hide-details
              label="Праздник"
              style="max-width: 250px; min-width: 200px; width: 100%;"
              variant="outlined"
            />
          </div>
        </div>
      </template>

      <template #cell-title="{ item }: { item: ReadyGift }">
        {{ item.title }}
      </template>

      <template #cell-personIcon="{ item }: { item: ReadyGift }">
        <v-icon
          v-if="item.personIcon"
          :icon="item.personIcon"
        />
      </template>

      <template #cell-personName="{ item }: { item: ReadyGift }">
        {{ item.personName }}
      </template>

      <template #cell-status="{ item }: { item: ReadyGift }">
        <StatusChipSelect
          :items="GiftStatusItems"
          :model-value="item.status"
          @update:model-value="(value) => {
            giftStore.updateGift(item.id, 'status', value as GiftStatus)
          }"
        />
      </template>

      <template #no-data>
        <Text>
          Нет людей с полным комплектом подарков для выбранного праздника
        </Text>
      </template>
    </DataTable>
  </div>
</template>
