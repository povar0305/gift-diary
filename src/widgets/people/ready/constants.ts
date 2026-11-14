import type { TableColumn } from "@/shared";
import type { ReadyGift } from "./types";

export const columnsReadyGifts: TableColumn[] = [
  {
    key: 'personName',
    title: 'Получатель',
  },
  {
    key: 'personIcon',
    title: 'Иконка',
  },
  {
    key: 'title',
    title: 'Подарок',
  },
  {
    key: 'status',
    title: 'Статус',
  },
]

export const customFilterReadyGifts = (_value: string, search: string, item?: { raw?: ReadyGift }) => {
  if (!search) return true

  const gift = item?.raw
  if (!gift) return false

  const searchLower = search.toLowerCase()

  return [gift.title, gift.personName, gift.statusLabel]
    .some(value => value.toLowerCase().includes(searchLower))
}
