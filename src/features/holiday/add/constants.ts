import { FieldFormType, type FormFieldConfig } from "@/shared";
import { HolidayIconItems } from "@/entities/holiday";

export const getFieldsHolidayCreate = (): FormFieldConfig[] => {
  return [
    {
      key: 'title',
      label: 'Название',
      type: FieldFormType.Text,
      required: true
    },
    {
      key: 'date',
      label: 'Дата',
      type: FieldFormType.Date,
      required: true
    },
    {
      key: 'icon',
      label: 'Иконка',
      type: FieldFormType.Icon,
      items: HolidayIconItems,
      required: false
    },
    {
      key: 'note',
      label: 'Заметка',
      type: FieldFormType.Textarea,
      required: false
    },
  ]
}
