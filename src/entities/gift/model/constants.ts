import { GiftStatus } from "./types";

export const GiftStatusLabels: Record<GiftStatus, string> = {
  [GiftStatus.Idea]: 'Идея',
  [GiftStatus.Approved]: 'Утвержден',
  [GiftStatus.Ordered]: 'Заказан',
  [GiftStatus.InTransit]: 'В пути',
  [GiftStatus.ToPickup]: 'Забрать (ПВЗ)',
  [GiftStatus.AtHome]: 'Дома',
  [GiftStatus.Wrapped]: 'Упакован',
  [GiftStatus.Given]: 'Вручен',
}

export const GiftStatusColors: Record<GiftStatus, string> = {
  [GiftStatus.Idea]: 'grey',
  [GiftStatus.Approved]: 'indigo-lighten-1',
  [GiftStatus.Ordered]: 'blue',
  [GiftStatus.InTransit]: 'cyan-darken-1',
  [GiftStatus.ToPickup]: 'orange-darken-1',
  [GiftStatus.AtHome]: 'deep-purple-lighten-1',
  [GiftStatus.Wrapped]: 'pink-lighten-1',
  [GiftStatus.Given]: 'success',
}

export const GiftStatusItems = Object.entries(GiftStatusLabels).map(
  ([value, title]) => ({
    title,
    value,
    color: GiftStatusColors[value as GiftStatus],
  })
)