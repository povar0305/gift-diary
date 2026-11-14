import type { Gift } from "@/entities/gift";

export type ReadyGift = Gift & {
  personName: string
  personIcon?: string
  statusLabel: string
}
