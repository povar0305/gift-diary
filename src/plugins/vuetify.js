import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'

const lightTheme = {
  dark: false,
  colors: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    primary: '#5B5BD6',
    'primary-darken-1': '#4F4FBF',
    secondary: '#10B981',
    'secondary-darken-1': '#0D9668',
    error: '#EF4444',
    info: '#3B82F6',
    success: '#10B981',
    warning: '#F59E0B',
    'on-background': '#1E293B',
    'on-surface': '#1E293B',
    'on-primary': '#FFFFFF',
  },
  variables: {
    'border-radius-root': '10px', // Мягкие, но не «пузырчатые» углы
    'font-family-root': "'Manrope', sans-serif",
  },
}

const darkTheme = {
  dark: true,
  colors: {
    background: '#0F172A',
    surface: '#1E293B',
    primary: '#818CF8',
    'primary-darken-1': '#6B74E8',
    secondary: '#34D399',
    error: '#F87171',
    info: '#60A5FA',
    success: '#34D399',
    warning: '#FBBF24',
    'on-background': '#F1F5F9',
    'on-surface': '#F1F5F9',
    'on-primary': '#0F172A',
  },
  variables: {
    'border-radius-root': '10px',
    'font-family-root': "'Manrope', sans-serif",
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
})