import type { Marketplace } from "@/widgets/gifts/list/types.ts";
import type { ExternalUrl } from "@/entities/gift";
import type { TableColumn } from "@/shared";

export const columnsGifts: TableColumn[] = [
  {
    key: 'personId',
    title: 'Кому',
  },
  {
    key: 'title',
    title: 'Название',
  },
  {
    key: 'status',
    title: 'Статус',
  },
  {
    key: 'datePickup',
    title: 'Дата получения'
  },
  {
    key: 'price',
    title: 'Цена',
    formatter: (value: unknown): string => {
      return `${value} ₽ `
    }
  },
  {
    key: 'actions',
    title: '',
  },

]

const marketplaceConfig = {
  ozon: { icon: 'mdi-alpha-o-circle', color: '#005BFF', name: 'Ozon' },
  wildberries: { icon: 'mdi-alpha-w-circle', color: '#CB11AB', name: 'Wildberries' },
  yandex: { icon: 'mdi-alpha-y-circle', color: '#FC3F1D', name: 'Яндекс' },
  unknown: { icon: 'mdi-link', color: 'grey', name: 'Другое' },
} satisfies Record<string, Marketplace>

export const getMarketplaceFromUrl = (url: ExternalUrl | '' | undefined | null): Marketplace => {
  if (!url) return marketplaceConfig.unknown

  const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`
  const hostname = new URL(urlWithProtocol).hostname.toLowerCase()

  if (hostname.includes('ozon.')) return marketplaceConfig.ozon

  if (hostname.includes('wildberries.') || hostname.includes('wb.ru')) return marketplaceConfig.wildberries

  if (hostname.includes('market.yandex.') || hostname.includes('yandex.market')) return marketplaceConfig.yandex

  return marketplaceConfig.unknown

}