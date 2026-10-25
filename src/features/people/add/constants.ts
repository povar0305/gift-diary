import { FieldFormType, type FormFieldConfig } from "@/shared";
import { z } from 'zod'
import {
  PackagingIconItems,
  PackagingIconSchema,
  type People,
  RelationPeople,
  RelationPeopleItems
} from "@/entities/people";

export const FieldsPeopleAdd: FormFieldConfig[] = [
  {
    key: 'name',
    label: 'Имя',
    type: FieldFormType.Text,
    required: true
  },
  {
    key: 'relation',
    label: 'Связь',
    type: FieldFormType.Select,
    items: RelationPeopleItems,
    required: true
  },
  {
    key: 'icon',
    label: 'Иконка упаковки',
    items: PackagingIconItems,
    type: FieldFormType.Icon,
    required: true
  },
]

export const PeopleAddSchema = z.object({
  icon: PackagingIconSchema,
  name: z
    .string()
    .min(2, 'Имя должно быть не менее 2 символов')
    .trim(),
  relation: z.enum(RelationPeople, 'Выберите, кем приходится человек'),
})
export type PeopleAddFormData = Omit<People, 'id'>

