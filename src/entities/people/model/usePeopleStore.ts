import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'
import { type People } from "./types";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore'
import { db } from '@/app/firebase'
import { useNotificationStore } from "@/shared/appSnackbar";

export const usePeopleStore = defineStore('people', () => {
  const people: Ref<People[]> = ref<People[]>([])
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

  let unsubscribe: (() => void) | null = null

  function getPeopleList() {
    isLoading.value = true
    const q = query(collection(db, 'people'))

    unsubscribe = onSnapshot(q, (snapshot) => {
      people.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as People[]
      isLoading.value = false
    }, (error) => {
      notify.error(`Ошибка при получении списка людей: ${error}`)
      isLoading.value = false
    })
  }

  async function removePeople(personId: People['id']) {
    try {
      const personRef = doc(db, 'people', personId)
      await deleteDoc(personRef)
      notify.success('Человек успешно удален!')
    } catch (error) {
      notify.error(`Ошибка при удалении : ${error}`)
      throw error
    }
  }

  function stopGetPeopleList() {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }

  return { people, isLoading, addPeople, getPeopleList, stopGetPeopleList, removePeople }
})