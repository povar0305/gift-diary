import type { People } from "@/entities/people";
import { z } from "zod";

export enum GiftStatus {
  ToThink = 'variant',
  Approved = 'approved',
  ToOrder = 'to_order',
  Ordered = 'ordered',
  InTransit = 'in_transit',
  ToPickup = 'to_pickup',
  AtHome = 'at_home',
  Wrapped = 'wrapped',
}

export type Gift = {
  id: string
  personId: People['id']
  title: string
  status: GiftStatus
  price?: number
  link?: string
  datePickup?: Date
}


export const GiftCreateSchema = z.object({
  personId: z.string().min(1, 'Выберите человека'),
  title: z
    .string()
    .min(2, 'Название должно быть не менее 2 символов')
    .trim(),
  status: z.enum(GiftStatus, 'Выберите корректный статус'),
  price: z.coerce.number().positive('Цена должна быть больше нуля'),
  link: z
    .url('Введите корректную ссылку (https://...)')
    .optional()
    .or(z.literal('')),
  datePickup: z.string().optional(),
})

export type GiftCreateFormData = z.infer<typeof GiftCreateSchema>