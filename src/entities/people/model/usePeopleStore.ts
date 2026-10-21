import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type People } from "./types";
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/app/firebase'

export const usePeopleStore = defineStore('people', () => {
  const people = ref<People[]>([])
  const isLoading = ref(false)

  async function addPeople(newPerson: Omit<People, 'id'>) {
    isLoading.value = true
    try {
      await addDoc(collection(db, 'people'), newPerson)
    } catch (error) {
      console.error('Ошибка Firebase:', error)
    } finally {
      isLoading.value = false
    }
  }

  return { people, isLoading, addPeople }
})