export type People = {
  id: string
  name: string
  relation: RelationPeople
  icon?: string
}

export enum RelationPeople {
  Family = 'family',
  Friend = 'friend',
  Colleague = 'colleague',
}

export const PEOPLE_KEYS_TABLE = [
  'name',
  'icon',
  'relation',
] as const

export type PeopleTableKey = typeof PEOPLE_KEYS_TABLE[number]

export const PeopleFormLabels: Record<PeopleTableKey, string> = {
  name: 'Имя',
  relation: 'Связь',
  icon: 'Иконка',
}

