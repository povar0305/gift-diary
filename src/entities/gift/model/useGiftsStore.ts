import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addDoc, collection, onSnapshot } from 'firebase/firestore'
import { db } from '@/app/firebase'
import type { Gift, GiftCreateFormData } from './types'
import { useNotificationStore } from "@/shared/appSnackbar";

export const useGiftStore = defineStore('gift', () => {
  const gifts = ref<Gift[]>([])
  const isLoading = ref(true)

  let unsubscribe: (() => void) | null = null
  const notify = useNotificationStore()

  function fetchGifts() {
    isLoading.value = true
    const q = collection(db, 'gifts')

    unsubscribe = onSnapshot(q, (snapshot) => {
      gifts.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Gift[]
      isLoading.value = false
    })
  }

  function stopFetching() {
    if (unsubscribe) unsubscribe()
  }

  async function createGift(newGift: GiftCreateFormData) {
    try {
      await addDoc(collection(db, 'gifts'), newGift)
      notify.success('Подарок создан!')
    } catch (error) {
      notify.error(`Ошибка при добавлении подарка: ${error}`)
    }
  }

  return { gifts, isLoading, fetchGifts, stopFetching, createGift }
})