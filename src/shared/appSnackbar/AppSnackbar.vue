<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useNotificationStore } from './model/useNotificationStore'

const store = useNotificationStore()
const { isVisible, message, color, timeout, icon } = storeToRefs(store)
</script>

<template>
  <v-snackbar
    v-model="isVisible"
    :color="color"
    :timeout="timeout"
    location="top right"
    rounded="pill"
    variant="outlined"
    @update:model-value="(val) => !val && store.close()"
  >
    <div class="d-flex align-center">
      <v-icon
        :icon="icon"
        class="mr-3"
      />
      <span class="text-body-1">{{ message }}</span>
    </div>

    <template #actions>
      <v-btn
        density="comfortable"
        icon="mdi-close"
        variant="text"
        @click="store.close()"
      />
    </template>
  </v-snackbar>
</template>