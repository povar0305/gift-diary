import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useNotificationStore } from './useNotificationStore'

describe('useNotificationStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('должен показывать уведомление с дефолтными настройками', () => {
    const store = useNotificationStore()

    store.show({ message: 'Тестовое сообщение' })

    expect(store.isVisible).toBe(true)
    expect(store.message).toBe('Тестовое сообщение')
    expect(store.color).toBe('success')
    expect(store.timeout).toBe(3000)
  })

  it('должен показывать уведомление с кастомными настройками', () => {
    const store = useNotificationStore()

    store.show({
      message: 'Ошибка!',
      color: 'error',
      icon: 'mdi-close',
      timeout: 5000
    })

    expect(store.isVisible).toBe(true)
    expect(store.color).toBe('error')
    expect(store.icon).toBe('mdi-close')
    expect(store.timeout).toBe(5000)
  })

  it('должен ставить в очередь второе уведомление, если первое еще видно', () => {
    const store = useNotificationStore()

    store.success('Первое сообщение')
    expect(store.isVisible).toBe(true)
    expect(store.message).toBe('Первое сообщение')

    store.error('Второе сообщение')

    expect(store.message).toBe('Первое сообщение')
  })

  it('должен показывать следующее уведомление из очереди после закрытия текущего', () => {
    const store = useNotificationStore()

    store.success('Первое')
    store.error('Второе')
    store.close()
    
    expect(store.isVisible).toBe(false)

    vi.advanceTimersByTime(300)

    expect(store.isVisible).toBe(true)
    expect(store.message).toBe('Второе')
    expect(store.color).toBe('error')
  })

  it('должен использовать правильные иконки для методов-оберток (success, error, info)', () => {
    const store = useNotificationStore()

    store.success('Успех')
    expect(store.icon).toBe('mdi-check-circle')

    store.close()
    vi.advanceTimersByTime(300)

    store.error('Ошибка')
    expect(store.icon).toBe('mdi-alert-circle')

    store.close()
    vi.advanceTimersByTime(300)

    store.info('Инфо')
    expect(store.icon).toBe('mdi-information')
  })
})