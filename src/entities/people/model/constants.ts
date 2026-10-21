import { RelationPeople } from "./types";

export const RelationPeopleLabels: Record<RelationPeople, string> = {
  [RelationPeople.Family]: 'Родственник',
  [RelationPeople.Friend]: 'Друг',
  [RelationPeople.Colleague]: 'Коллега',
}

export const RelationPeopleItems = Object.entries(RelationPeopleLabels).map(
  ([value, title]) => ({
    title,
    value,
  })
)