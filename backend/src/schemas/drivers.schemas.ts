import { JsonValue } from "@prisma/client/runtime/library"
import { z } from "zod"

const reviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
})

const driverSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(3),
  description: z.string().min(10),
  vehicle: z.string().min(1),
  review: reviewSchema,
  fee: z.number().positive(),
  min_distance: z.number().positive(),
})

export const driverRequired = driverSchema.required({
  name: true,
  description: true,
  vehicle: true,
  review: true,
  fee: true,
  min_distance: true,
})

export type TDriver = {
  id: number
  name: string
  description: string
  vehicle: string
  review: JsonValue
  fee: number
  min_distance: number
}

export type TDriverRegisterBody = z.infer<typeof driverRequired>

// export type TDriver = z.infer<typeof driverSchema>
