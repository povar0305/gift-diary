import { type People, RelationPeopleLabels } from "@/entities/people";


export const customFilterPeopleList = (_value: string, search: string, item: People) => {
  if (!search) return true

  const searchLower = search.toLowerCase()

  if (item.name?.toLowerCase().includes(searchLower)) return true

  const relationLabel = RelationPeopleLabels[item.relation as keyof typeof RelationPeopleLabels]
  if (relationLabel?.toLowerCase().includes(searchLower)) return true

  return false
}