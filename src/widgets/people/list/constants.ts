import { RelationPeopleLabels } from "@/entities/people";

// eslint-disable-next-line
export const customFilterPeopleList = (_value: string, search: string, item: any) => {
  if (!search) return true

  const searchLower = search.toLowerCase()

  if (item.raw.name?.toLowerCase().includes(searchLower)) return true

  const relationLabel = RelationPeopleLabels[item.raw.relation as keyof typeof RelationPeopleLabels]
  if (relationLabel?.toLowerCase().includes(searchLower)) return true

  return false
}