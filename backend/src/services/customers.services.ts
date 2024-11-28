import { injectable } from "tsyringe"
import { prisma } from "../database/prisma"
import { TCustomerRegisterBody, TCustomer } from "../schemas/customers.schemas"

@injectable()
export class CustomerServices {
  async register(body: TCustomerRegisterBody): Promise<TCustomer | number> {
    const find_customer = await prisma.customer.findUnique({ where: { email: body.email } })

    if (find_customer) {
      return 409
    }
    
    const customer = await prisma.customer.create({ data: body })

    return customer
  }

  async getById(id: string): Promise<TCustomer | number> {
    const customer = await prisma.customer.findUnique({ where: { id } })

    if (!customer) {
      return 404
    }

    return customer
  }
}
