<script lang="ts" setup>
import type { PeopleCardProps } from "./types";
import { RelationPeopleLabels, usePeopleStore } from "@/entities/people";

const { person, variant = 'table' } = defineProps<PeopleCardProps>()

const peopleStore = usePeopleStore()
</script>

<template>
  <div class="d-flex flex-column ga-4 w-100">
    <v-card
      :to="{name: 'current.people', params: { id: person.id } }"
      class="pa-4"
      density="compact"
      elevation="0"
      link
    >
      <div class="d-flex justify-space-between align-start">
        <div class="d-flex align-center">
          <v-avatar
            class="mr-4"
            color="primary"
            size="32"
            variant="tonal"
          >
            <v-icon
              :icon="person.icon"
              size="20"
            />
          </v-avatar>

          <div
            :class="[
              'd-flex ',
              { 'flex-row ga-2' : variant === 'default' },
              { 'flex-column ga-0.5' : variant === 'table' },
            ]"
          >
            <div class="text-h6 font-weight-bold">
              {{ person.name }}
            </div>

            <div class="text-caption text-medium-emphasis">
              {{ RelationPeopleLabels[person.relation] }}
            </div>
          </div>
        </div>

        <v-btn
          color="#DC2626"
          density="compact"
          icon="mdi-trash-can-outline"
          variant="text"
          @click.prevent.stop="() => {peopleStore.removePeople(person.id)}"
        />
      </div>
    </v-card>
  </div>
</template>