import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useGiftStore } from './useGiftsStore'
import { GiftStatus } from './types'
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

describe('useGiftStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })


  it('должен успешно создавать подарок', async () => {
    const store = useGiftStore()
    const newGift = {
      title: 'Новый подарок',
      personId: 'person-123',
      status: GiftStatus.Idea,
      price: 1500
    }

    vi.mocked(addDoc).mockResolvedValue({ id: 'gift-1' } as never)

    await store.createGift(newGift)

    expect(addDoc).toHaveBeenCalledTimes(1)
    expect(addDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ title: 'Новый подарок' })
    )
  })

  it('должен успешно удалять подарок', async () => {
    const store = useGiftStore()

    vi.mocked(deleteDoc).mockResolvedValue()

    await store.removeGift('gift-1')

    expect(deleteDoc).toHaveBeenCalledTimes(1)
  })

  it('должен успешно обновлять статус подарка', async () => {
    const store = useGiftStore()

    vi.mocked(updateDoc).mockResolvedValue()

    await store.updateGift('gift-1', 'status', GiftStatus.Given)

    expect(updateDoc).toHaveBeenCalledTimes(1)
    expect(updateDoc).toHaveBeenCalledWith(
      expect.anything(),
      { status: GiftStatus.Given }
    )
  })

  it('должен подписываться на изменения (getGiftsList)', () => {
    const store = useGiftStore()

    const mockUnsubscribe = vi.fn()
    vi.mocked(onSnapshot).mockImplementation((_q, callback) => {
      const mockSnapshot = {
        docs: [
          { id: '1', data: () => ({ title: 'Подарок 1' }) },
          { id: '2', data: () => ({ title: 'Подарок 2' }) }
        ]
      }

      if (typeof callback === 'function') {
        (callback as (snap: unknown) => void)(mockSnapshot)
      }

      return mockUnsubscribe
    })

    store.getGiftsList()

    expect(store.gifts).toHaveLength(2)
    expect(store.gifts?.[0]?.title).toBe('Подарок 1')
    expect(store.isLoadingGifts).toBe(false)

    expect(onSnapshot).toHaveBeenCalledTimes(1)

    store.stopFetchingGifts()
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1)
  })
})