import { Request, Response } from "express"
import { injectable } from "tsyringe"
import { DriverServices } from "../services/drivers.services"
import { container } from "tsyringe"

const driversServices = container.resolve(DriverServices)

@injectable()
export class DriverControllers {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const response = await driversServices.register(req.body)

      return res.status(201).json(response)  
    } catch (error) {
      return res.status(500).json({ error: "Erro no servidor" })
    }
    
  }

  async getById(req: Request, res: Response) {
    try {
      const id = +req.params.id

      const response = await driversServices.getById(id)
  
      if (response == 404) {
        return res.status(404).json({ error_code: "DRIVER_NOT_FOUND", error_description: "Motorista não encontrado" })
      }
  
      return res.status(200).json(response)  
    } catch (error) {
      return res.status(500).json({ error: "Erro no servidor" })
    }
  }
}
