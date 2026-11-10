<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useGiftStore } from "@/entities/gift";
import { usePeopleStore } from "@/entities/people";
import { Text, Title } from "@/shared";
import { PeopleCard } from "@/widgets/people";

const props = defineProps<{
  holidayId: string
}>()

const giftStore = useGiftStore()
const peopleStore = usePeopleStore()

const { gifts } = storeToRefs(giftStore)
const { people, isLoadingPeople } = storeToRefs(peopleStore)

const uniqueParticipants = computed(() => {
  const participantIds = new Set(
    gifts.value
      .filter(gift => gift.holidayId === props.holidayId)
      .map(gift => gift.personId)
  )

  return people.value.filter(person => participantIds.has(person.id))
})

onMounted(() => {
  peopleStore.getPeopleList()
})

onUnmounted(() => {
  peopleStore.stopGetPeopleList()
})
</script>

<template>
  <div class="d-flex flex-column ga-4">
    <div class="d-flex ga-2 align-center">
      <Title>
        Участники
      </Title>

      <Text>
        ({{ uniqueParticipants.length }})
      </Text>
    </div>

    <v-row v-if="isLoadingPeople">
      <v-col
        v-for="index in 12"
        :key="index"
        cols="12"
        md="4"
        sm="6"
      >
        <v-skeleton-loader
          type="list-item-avatar"
        />
      </v-col>
    </v-row>

    <v-row v-else-if="uniqueParticipants.length > 0">
      <v-col
        v-for="person in uniqueParticipants"
        :key="person.id"
        cols="12"
        md="4"
        sm="6"
      >
        <PeopleCard :person="person" />
      </v-col>
    </v-row>

    <div
      v-else
      class="d-flex align-center justify-center flex-column ga-4"
    >
      <Text class="d-flex justify-center">
        Пока нет участников с подарками на этот праздник
      </Text>
    </div>
  </div>
</template>
