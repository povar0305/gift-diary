import type { People } from "@/entities/people";

export type PeopleCardProps = {
  person: People
  variant?: variantsCardPeople
}

export type variantsCardPeople = 'table' | 'default'
