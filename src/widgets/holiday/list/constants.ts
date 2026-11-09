import type { Holiday } from "@/entities/holiday";
import type { TableColumn } from "@/shared";
import type { FilterFunction } from "vuetify/framework";
import dayjs from 'dayjs'

export const columnsHolidays: TableColumn[] = [
  {
    key: 'title',
    title: 'Название',
  },
  {
    key: 'date',
    title: 'Дата',
  },
  {
    key: 'icon',
    title: 'Иконка',
  },
  {
    key: 'note',
    title: 'Заметка',
  },
  {
    key: 'actions',
    title: '',
  },
]

export const formatHolidayDate = (date?: string) => {
  if (!date || date.length === 0) return ''
  return dayjs(date).format('DD.MM.YYYY')
}

export const customFilterHolidays: FilterFunction = (value, search, item) => {
  if (!search) return true

  const holiday = (item as { raw?: Holiday }).raw
  if (!holiday) return false

  const searchLower = search.toLowerCase()

  if (holiday.title?.toLowerCase().includes(searchLower)) return true

  if (holiday.date && formatHolidayDate(holiday.date).toLowerCase().includes(searchLower)) return true

  if (holiday.note?.toLowerCase().includes(searchLower)) return true

  return false
}
