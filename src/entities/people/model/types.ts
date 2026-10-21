export interface People {
  id: string
  name: string
  relation: RelationPeople
  color: HexColor
  icon?: string
}

export enum RelationPeople {
  Family = 'family',
  Friend = 'friend',
  Colleague = 'colleague',
}

export type HexColor = `#${string}`

export const PEOPLE_KEYS_TABLE = [
  'name',
  'relation',
  'color',
  'icon',
] as const

export type PeopleTableKey = typeof PEOPLE_KEYS_TABLE[number]

export const PeopleFormLabels: Record<PeopleTableKey, string> = {
  name: 'Имя',
  relation: 'Связь',
  color: 'Цвет',
  icon: 'Иконка',
}

