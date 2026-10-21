import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface NotificationOptions {
  message: string
  color?: 'success' | 'error' | 'warning' | 'info' | string
  timeout?: number
  icon?: string
}

export const useNotificationStore = defineStore('notification', () => {
  const isVisible = ref(false)
  const message = ref('')
  const color = ref('success')
  const timeout = ref(3000)
  const icon = ref('mdi-check-circle')

  const queue = ref<NotificationOptions[]>([])

  function show(options: NotificationOptions) {
    if (isVisible.value) {
      queue.value.push(options)
      return
    }

    display(options)
  }

  function display(options: NotificationOptions) {
    message.value = options.message
    color.value = options.color || 'success'
    timeout.value = options.timeout ?? 3000
    icon.value = options.icon || getDefaultIcon(color.value)
    isVisible.value = true
  }

  function close() {
    isVisible.value = false
    if (queue.value.length > 0) {
      const next = queue.value.shift()
      if (next) {
        setTimeout(() => display(next), 300)
      }
    }
  }

  const success = (message: string) => show({ message, color: 'success', icon: 'mdi-check-circle' })
  const error = (message: string) => show({ message, color: 'error', icon: 'mdi-alert-circle' })
  const warning = (message: string) => show({ message, color: 'warning', icon: 'mdi-alert' })
  const info = (message: string) => show({ message, color: 'info', icon: 'mdi-information' })

  function getDefaultIcon(c: string) {
    const map: Record<string, string> = {
      success: 'mdi-check-circle',
      error: 'mdi-alert-circle',
      warning: 'mdi-alert',
      info: 'mdi-information',
    }
    return map[c] || 'mdi-information'
  }

  return {
    isVisible,
    message,
    color,
    timeout,
    icon,
    show,
    close,
    success,
    error,
    warning,
    info,
  }
})