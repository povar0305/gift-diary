export interface People {
  id: string
  name: string
  relation: RelationPeople
  color: HexColor
}

export enum RelationPeople {
  Family = 'family',
  Friend = 'friend',
  Colleague = 'colleague',
}

export type HexColor = `#${string}`
