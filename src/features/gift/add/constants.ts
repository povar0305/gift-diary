import { FieldFormType, type FormFieldConfig } from "@/shared";
import type { People } from "@/entities/people";
import { GiftStatus, GiftStatusItems } from "@/entities/gift";

export const getFieldsGiftCreate = (people: People[]): FormFieldConfig[] => {
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
  ]
}


export const GitsCreateInitialValues = {
  status: GiftStatus.ToThink
}