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
import type { Holiday, HolidayCreateFormData } from './types'
import { useNotificationStore } from "@/shared/appSnackbar";

export const useHolidayStore = defineStore('holiday', () => {
  const holidays = ref<Holiday[]>([])
  const isLoadingHolidays = ref(true)

  let unsubscribe: (() => void) | null = null
  const notify = useNotificationStore()

  function getHolidaysList(filters: QueryConstraint[] = []) {
    isLoadingHolidays.value = true

    const holidaysRef = collection(db, 'holidays')
    const q = query(holidaysRef, ...filters)

    if (unsubscribe) {
      unsubscribe()
    }

    unsubscribe = onSnapshot(q, (snapshot) => {
      holidays.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Holiday[]
      isLoadingHolidays.value = false
    }, (error) => {
      notify.error(`Ошибка при получении списка праздников: ${error}`)
      isLoadingHolidays.value = false
    })
  }

  function stopFetchingHolidays() {
    if (unsubscribe) unsubscribe()
  }

  async function createHoliday(newHoliday: HolidayCreateFormData) {
    try {
      await addDoc(collection(db, 'holidays'), newHoliday)
      notify.success('Праздник создан!')
    } catch (error) {
      notify.error(`Ошибка при добавлении праздника: ${error}`)
    }
  }

  async function removeHoliday(holidayId: Holiday['id']) {
    try {
      const holidayRef = doc(db, 'holidays', holidayId)
      await deleteDoc(holidayRef)

      notify.success('Праздник удален!')
    } catch (error) {
      notify.error(`Ошибка при удалении праздника: ${error}`)
    }
  }

  async function updateHoliday<K extends keyof Holiday>(holidayId: Holiday['id'], key: K, value: Holiday[K]) {
    try {
      const holidayRef = doc(db, 'holidays', holidayId)

      await updateDoc(holidayRef, {
        [key]: value
      })

      notify.success('Праздник обновлен!')
    } catch (error) {
      notify.error(`Ошибка при обновлении праздника: ${error}`)
      throw error
    }
  }

  async function updateHolidayData(holidayId: Holiday['id'], data: HolidayCreateFormData) {
    try {
      const holidayRef = doc(db, 'holidays', holidayId)

      await updateDoc(holidayRef, { ...data })

      notify.success('Праздник обновлен!')
    } catch (error) {
      notify.error(`Ошибка при обновлении праздника: ${error}`)
    }
  }

  return { holidays, isLoadingHolidays, getHolidaysList, stopFetchingHolidays, createHoliday, removeHoliday, updateHoliday, updateHolidayData }
})
