import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type People } from "./types";
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { useNotificationStore } from "@/shared/appSnackbar";

export const usePeopleStore = defineStore('people', () => {
  const people = ref<People[]>([])
  const isLoading = ref(false)

  const notify = useNotificationStore()

  async function addPeople(newPerson: Omit<People, 'id'>) {
    isLoading.value = true
    try {
      await addDoc(collection(db, 'people'), newPerson)
      notify.success('Человек успешно добавлен!')
    } catch (error) {
      notify.error(`Не удалось добавить человека:${error}`)
    } finally {
      isLoading.value = false
    }
  }

  return { people, isLoading, addPeople }
})