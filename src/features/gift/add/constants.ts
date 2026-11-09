import { FieldFormType, type FormFieldConfig } from "@/shared";
import type { People } from "@/entities/people";
import type { Holiday } from "@/entities/holiday";
import { GiftStatus, GiftStatusItems } from "@/entities/gift";

export const getFieldsGiftCreate = (people: People[], holidays: Holiday[]): FormFieldConfig[] => {
  return [
    {
      key: 'title',
      label: 'Название',
      type: FieldFormType.Text,
      required: true
    },
    {
      key: 'personId',
      label: 'Выберите получателя',
      type: FieldFormType.Select,
      required: true,
      items: people.map((item) => {
        return { value: item.id, title: item.name }
      })
    },
    {
      key: 'status',
      label: 'Статус',
      type: FieldFormType.Select,
      required: true,
      items: GiftStatusItems
    },
    {
      key: 'price',
      label: 'Стоимость',
      type: FieldFormType.Number,
      required: true
    },
    {
      key: 'link',
      label: 'Ссылка',
      type: FieldFormType.Text,
      required: true
    },
    {
      key: 'datePickup',
      label: 'Дата прихода',
      type: FieldFormType.Date,
      required: false,
      condition: (formData) => {
        const status = formData.status as GiftStatus
        return [
          GiftStatus.Ordered,
          GiftStatus.InTransit,
          GiftStatus.ToPickup
        ].includes(status)
      }
    },
    {
      key: 'holidayId',
      label: 'Праздник',
      type: FieldFormType.Select,
      items: holidays.map((item) => ({
        title: item.title,
        value: item.id,
      })),
      required: false,
    },
  ]
}


export const GitsCreateInitialValues = {
  status: GiftStatus.Idea
}