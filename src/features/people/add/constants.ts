import { FieldFormType, type FormFieldConfig } from "@/shared";
import { z } from 'zod'
import { type HexColor, PackagingIconItems, type People, RelationPeople, RelationPeopleItems } from "@/entities/people";

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
    key: 'color',
    label: 'Цвет лейбла',
    type: FieldFormType.Color
  },
  {
    key: 'icon',
    label: 'Иконка упаковки',
    items: PackagingIconItems,
    type: FieldFormType.Icon,
    required: true
  },
]

export const HexColorSchema = z
  .string()
  .regex(/^#[0-9A-F]{6}$/i, 'Неверный формат цвета')
  .transform((val) => val as HexColor)


export const PeopleAddSchema = z.object({
  color: HexColorSchema,
  name: z
    .string()
    .min(2, 'Имя должно быть не менее 2 символов')
    .trim(),
  relation: z.enum(RelationPeople, 'Выберите, кем приходится человек'),
})
export type PeopleAddFormData = Omit<People, 'id'>

