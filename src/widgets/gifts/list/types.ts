import type { QueryConstraint } from 'firebase/firestore'

export type Marketplace = {
  name: string,
  icon: string,
  color: string,
}

export type GiftsListProps = {
  getFilters?: () => QueryConstraint[]
}