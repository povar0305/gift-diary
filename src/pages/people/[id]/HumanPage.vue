<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, onUnmounted } from 'vue'
import { usePeopleStore } from "@/entities/people";
import { PeopleCard } from '@/widgets/people'
import { GiftList } from "@/widgets/gifts";
import { orderBy, where } from "firebase/firestore";

const route = useRoute()


const personId = computed(() => route.params.id as string)

const peopleStore = usePeopleStore()

const person = computed(() => {
  return peopleStore.people.find(p => p.id === personId.value)
})

onMounted(() => {
  peopleStore.getPeopleList()
})

onUnmounted(() => {
  peopleStore.stopGetPeopleList()
})

const assemblyFilters = () => [
  where('personId', '==', personId.value),
  orderBy('status', 'asc')
]
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <PeopleCard
      v-if="person"
      :person="person"
      variant="default"
    />

    <GiftList :get-filters="assemblyFilters" />
  </div>
</template>