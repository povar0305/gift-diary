import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { usePeopleStore } from './usePeopleStore'
import { RelationPeople } from './types'
import { addDoc, deleteDoc, onSnapshot } from 'firebase/firestore'

vi.mock('firebase/firestore', () => ({
  collection: vi.fn(() => ({ type: 'collection' })),
  query: vi.fn(),
  onSnapshot: vi.fn(),
  addDoc: vi.fn(),
  deleteDoc: vi.fn(),
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

describe('usePeopleStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('должен успешно добавлять человека и переключать isLoadingPeople', async () => {
    const store = usePeopleStore()
    const newPerson = {
      name: 'Иван',
      relation: RelationPeople.Family,
      icon: 'mdi-star',
      color: '#5B5BD6'
    }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(addDoc).mockResolvedValue({ id: 'person-1' } as any)

    expect(store.isLoadingPeople).toBe(false)

    await store.addPeople(newPerson)

    expect(addDoc).toHaveBeenCalledTimes(1)
    expect(addDoc).toHaveBeenCalledWith(
      { type: 'collection' },
      expect.objectContaining({ name: 'Иван', relation: RelationPeople.Family })
    )

    expect(store.isLoadingPeople).toBe(false)
  })

  it('должен успешно удалять человека', async () => {
    const store = usePeopleStore()

    vi.mocked(deleteDoc).mockResolvedValue()

    await store.removePeople('person-1')

    expect(deleteDoc).toHaveBeenCalledTimes(1)
    expect(deleteDoc).toHaveBeenCalledWith({ type: 'doc' })
  })

  it('должен пробрасывать ошибку, если удаление не удалось', async () => {
    const store = usePeopleStore()

    vi.mocked(deleteDoc).mockRejectedValue(new Error('Network Error'))

    await expect(store.removePeople('person-1')).rejects.toThrow('Network Error')
  })

  it('должен подписываться на изменения и обновлять список людей', () => {
    const store = usePeopleStore()

    const mockUnsubscribe = vi.fn()

    vi.mocked(onSnapshot).mockImplementation((_q, callback) => {
      const mockSnapshot = {
        docs: [
          { id: '1', data: () => ({ name: 'Анна', relation: RelationPeople.Friend }) },
          { id: '2', data: () => ({ name: 'Павел', relation: RelationPeople.Colleague }) }
        ]
      }

      if (typeof callback === 'function') {
        (callback as (snap: unknown) => void)(mockSnapshot)
      }
      return mockUnsubscribe
    })

    store.getPeopleList()

    expect(store.people).toHaveLength(2)
    expect(store.people[0]?.name).toBe('Анна')
    expect(store.people[1]?.name).toBe('Павел')

    expect(store.isLoadingPeople).toBe(false)
    expect(onSnapshot).toHaveBeenCalledTimes(1)

    store.stopGetPeopleList()
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1)
  })
})