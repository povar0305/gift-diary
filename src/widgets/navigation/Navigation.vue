<script lang="ts" setup>

import { useRoute, useRouter } from "vue-router";
import { navigationItems } from "@/router/utils";

const route = useRoute()
const router = useRouter()

const goBack = () => {
  if (window.history.length > 2) {
    router.back()
  } else {
    router.push('/people')
  }
}
</script>

<template>
  <v-app-bar
    flat
    height="64"
  >
    <div class="d-flex align-center w-100 px-4">
      <v-btn
        icon="mdi-arrow-left"
        variant="plain"
        @click="goBack"
      />
      
      <nav class="d-flex ga-2">
        <v-btn
          v-for="item in navigationItems"
          :key="item.name"
          :color="route.name === item.name ? 'primary' : undefined"
          :prepend-icon="item.icon"
          :to="item.to"
          class="text-none"
          variant="text"
        >
          {{ item.title }}
        </v-btn>
      </nav>
    </div>
  </v-app-bar>
</template>

<style scoped>

</style>