import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type People, RelationPeople } from "./types";
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/app/firebase'

export const usePeopleStore = defineStore('people', () => {
  const people = ref<People[]>([
    { id: '1', name: 'Мама', relation: RelationPeople.Family, color: '#5B5BD6' },
    { id: '2', name: 'Папа', relation: RelationPeople.Family, color: '#10B981' },
  ])
  const isLoading = ref(false)

  async function addPerson(newPerson: Omit<People, 'id'>) {
    isLoading.value = true
    try {
      await addDoc(collection(db, 'people'), newPerson)
    } catch (error) {
      console.error('Ошибка Firebase:', error)
    } finally {
      isLoading.value = false
    }
  }

  return { people, isLoading, addPerson }
})