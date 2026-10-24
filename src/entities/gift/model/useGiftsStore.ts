import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  type QueryConstraint,
  updateDoc
} from 'firebase/firestore'
import { db } from '@/app/firebase'
import type { Gift, GiftCreateFormData } from './types'
import { useNotificationStore } from "@/shared/appSnackbar";

export const useGiftStore = defineStore('gift', () => {
  const gifts = ref<Gift[]>([])
  const isLoadingGifts = ref(true)

  let unsubscribe: (() => void) | null = null
  const notify = useNotificationStore()

  function getGiftsList(filters: QueryConstraint[] = []) {
    isLoadingGifts.value = true

    const giftsRef = collection(db, 'gifts')
    const q = query(giftsRef, ...filters)

    if (unsubscribe) {
      unsubscribe()
    }

    unsubscribe = onSnapshot(q, (snapshot) => {
      gifts.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Gift[]
      isLoadingGifts.value = false
    }, (error) => {
      notify.error(`Ошибка при получении списка подарков: ${error}`)
      isLoadingGifts.value = false
    })
  }

  function stopFetchingGifts() {
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

  async function removeGift(giftId: Gift['id']) {
    try {
      const personRef = doc(db, 'gifts', giftId)
      await deleteDoc(personRef)

      notify.success('Подарок удален!')
    } catch (error) {
      notify.error(`Ошибка при удалении подарка: ${error}`)
    }
  }

  async function updateGift<K extends keyof Gift>(giftId: Gift['id'], key: K, value: Gift[K]) {
    try {
      const giftRef = doc(db, 'gifts', giftId)

      await updateDoc(giftRef, {
        [key]: value
      })

      notify.success('Подарок обновлен!')
    } catch (error) {
      notify.error(`Ошибка при обновлении подарка: ${error}`)
      throw error
    }
  }

  return { gifts, isLoadingGifts, getGiftsList, stopFetchingGifts, createGift, removeGift, updateGift }
})