import { injectable } from "tsyringe"
import { prisma } from "../database/prisma"
import { TDriver, TDriverRegisterBody } from "../schemas/drivers.schemas"

@injectable()
export class DriverServices {
  async register(body: TDriverRegisterBody): Promise<TDriver> {
    const driver = await prisma.driver.create({ data: body })

    return driver
  }

  async getById(id: number): Promise<TDriver | number> {
    const driver = await prisma.driver.findUnique({ where: { id } })

    if (!driver) {
      return 404
    }

    return driver
  }
}
