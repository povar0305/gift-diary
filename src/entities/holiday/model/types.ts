import { z } from "zod";

export type Holiday = {
  id: string
  title: string
  date: string
  icon?: string
  note?: string
}

export const HolidayCreateSchema = z.object({
  title: z.string().min(1, 'Введите название праздника'),
  date: z.string().min(1, 'Выберите дату'),
  icon: z.string().optional(),
  note: z.string().optional(),
})

export type HolidayCreateFormData = z.infer<typeof HolidayCreateSchema>
