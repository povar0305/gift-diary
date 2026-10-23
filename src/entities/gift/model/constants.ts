import { GiftStatus } from "./types";

export const GiftStatusLabels: Record<GiftStatus, string> = {
  [GiftStatus.ToThink]: 'Подумать',
  [GiftStatus.Approved]: 'Согласован',
  [GiftStatus.ToOrder]: 'Заказать',
  [GiftStatus.Ordered]: 'Заказан',
  [GiftStatus.InTransit]: 'В пути',
  [GiftStatus.ToPickup]: 'Забрать (ПВЗ)',
  [GiftStatus.AtHome]: 'Дома',
  [GiftStatus.Wrapped]: 'Упакован',
}

export const GiftStatusItems = Object.entries(GiftStatusLabels).map(
  ([value, title]) => ({
    title,
    value,
  })
)