export enum FieldFormType {
  Text = 'text',
  Textarea = 'textarea',
  Select = 'select',
  Color = 'color',
  Icon = 'icon',
  Checkbox = 'checkbox',
  Number = 'number',
  Date = 'date',
}

export type FormFieldConfig = {
  key: string
  label: string
  type: FieldFormType
  items?: { title: string; value: unknown }[]
  placeholder?: string
  props?: Record<string, unknown>
  required?: boolean
}