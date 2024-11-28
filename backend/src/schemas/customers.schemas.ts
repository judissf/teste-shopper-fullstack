import { z } from "zod"

const customerSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  email: z.string().email({ message: "E-mail inválido" }).min(1)
})

export const customer = customerSchema.required({
  name: true,
  email: true
})

export type TCustomer = z.infer<typeof customer>

export const customerRegisterBodySchema = customerSchema.omit({ id: true })

export type TCustomerRegisterBody = z.infer<typeof customerRegisterBodySchema>
