import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useHolidayStore } from './useHolidaysStore'
import { addDoc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore'

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => ({ type: 'collection' })),
  query: vi.fn(),
  onSnapshot: vi.fn(),
  addDoc: vi.fn(),
  deleteDoc: vi.fn(),
  updateDoc: vi.fn(),
  doc: vi.fn(() => ({ type: 'doc' })),
}))
vi.mock('@/app/firebase', () => ({
  db: {}
}))

vi.mock('@/shared/appSnackbar', () => ({
  useNotificationStore: () => ({
    success: vi.fn(),
    error: vi.fn(),
  })
}))

describe('useHolidayStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })


  it('должен успешно создавать праздник', async () => {
    const store = useHolidayStore()
    const newHoliday = {
      title: 'Новый год',
      date: '2026-12-31',
      icon: 'mdi-tree',
      note: 'Заказываем заранее'
    }

    vi.mocked(addDoc).mockResolvedValue({ id: 'holiday-1' } as never)

    await store.createHoliday(newHoliday)

    expect(addDoc).toHaveBeenCalledTimes(1)
    expect(addDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ title: 'Новый год' })
    )
  })

  it('должен успешно удалять праздник', async () => {
    const store = useHolidayStore()

    vi.mocked(deleteDoc).mockResolvedValue()

    await store.removeHoliday('holiday-1')

    expect(deleteDoc).toHaveBeenCalledTimes(1)
  })

  it('должен успешно обновлять поле праздника', async () => {
    const store = useHolidayStore()

    vi.mocked(updateDoc).mockResolvedValue()

    await store.updateHoliday('holiday-1', 'title', '8 Марта')

    expect(updateDoc).toHaveBeenCalledTimes(1)
    expect(updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      { title: '8 Марта' }
    )
  })

  it('должен успешно обновлять все поля праздника', async () => {
    const store = useHolidayStore()

    vi.mocked(updateDoc).mockResolvedValue()

    const data = {
      title: 'День рождения Ани',
      date: '2026-05-15',
      icon: 'mdi-cake',
      note: 'Не забыть купить свечки'
    }

    await store.updateHolidayData('holiday-1', data)

    expect(updateDoc).toHaveBeenCalledTimes(1)
    expect(updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        title: 'День рождения Ани',
        date: '2026-05-15',
        icon: 'mdi-cake'
      })
    )
  })

  it('должен подписываться на изменения (getHolidaysList)', () => {
    const store = useHolidayStore()

    const mockUnsubscribe = vi.fn()
    vi.mocked(onSnapshot).mockImplementation((_q, callback) => {
      const mockSnapshot = {
        docs: [
          { id: '1', data: () => ({ title: 'Новый год' }) },
          { id: '2', data: () => ({ title: '8 Марта' }) }
        ]
      }

      if (typeof callback === 'function') {
        (callback as (snap: unknown) => void)(mockSnapshot)
      }

      return mockUnsubscribe
    })

    store.getHolidaysList()

    expect(store.holidays).toHaveLength(2)
    expect(store.holidays?.[0]?.title).toBe('Новый год')
    expect(store.isLoadingHolidays).toBe(false)

    expect(onSnapshot).toHaveBeenCalledTimes(1)

    store.stopFetchingHolidays()
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1)
  })
})
