import { z } from "zod"

const driverSchema = z.object({
  id: z.number(),
  name: z.string()
})

export const ridesSchema = z.object({
  id: z.number(),
  date: z.date(),
  origin: z.string(),
  destination: z.string(),
  distance: z.number(),
  duration: z.string(),
  driverId: z.number(),
  driver: driverSchema,
  value: z.number()
}).transform((data) => {
  const { driverId, ...filteredRide } = data
  return filteredRide
})

type TDriverOnRideRequest = {
  id: number
  name: string
}

export type TRideConfirmRequest = {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver: TDriverOnRideRequest
  value: number
}

type TDriverOnRideResponse = {
  id: number
  name: string
}

type TRides = {
  id: number
  date: Date
  origin: string
  destination: string
  distance: number
  duration: string
  driver: TDriverOnRideResponse
  value: number
}

type TRideResponse = {
  customer_id: string
  rides: TRides
}

export type TRideEstimateRequest = {
  customer_id: string
  origin: string
  destination: string
}
interface IRideError404 {
  error_code: number
  message: string
}
interface IRideConfirmedSuccess {
  success: boolean
}

export type TRideConfirmResponse = IRideError404 | IRideConfirmedSuccess;