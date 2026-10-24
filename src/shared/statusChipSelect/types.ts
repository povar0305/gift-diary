export type StatusChipOption = {
  title: string
  value: string,
  color?: string
}

export type StatusChipProps = {
  modelValue: string
  items: StatusChipOption[]
}