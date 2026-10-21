<script setup>
import { Navigation } from "@/widgets/navigation";
import { AppSnackbar } from "@/shared";
</script>

<template>
  <v-app>
    <Navigation />

    <v-main>
      <v-container
        class="pa-6"
        max-width="1200"
      >
        <router-view />
      </v-container>
    </v-main>

    <AppSnackbar />
  </v-app>
</template>

<style scoped>
</style>