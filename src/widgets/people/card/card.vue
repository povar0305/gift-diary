<script lang="ts" setup>
import type { PeopleCardProps } from "./types";
import { RelationPeopleLabels } from "@/entities/people";

const { person } = defineProps<PeopleCardProps>()

</script>

<template>
  <div class="d-flex flex-column ga-4 w-100">
    <v-card
      class="person-card pa-4 h-100"
      elevation="0"
      link
    >
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-avatar
            class="mr-4"
            color="primary"
            size="48"
            variant="tonal"
          >
            <v-icon
              :icon="person.icon"
              size="28"
            />
          </v-avatar>

          <div class="d-flex flex-column ga-0.5">
            <div class="text-h6 font-weight-bold">
              {{ person.name }}
            </div>

            <div class="text-caption text-medium-emphasis">
              {{ RelationPeopleLabels[person.relation] }}
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>