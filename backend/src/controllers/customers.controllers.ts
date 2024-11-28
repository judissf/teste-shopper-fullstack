import { Request, Response } from "express"
import { injectable } from "tsyringe"
import { CustomerServices } from "../services/customers.services"
import { container } from "tsyringe"

const customerServices = container.resolve(CustomerServices)

@injectable()
export class CustomerControllers {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const response = await customerServices.register(req.body)

      if (response == 409) {
        return res.status(409).json({ error: "O cliente já existe com esse e-mail" })
      }

      return res.status(201).json(response)  
    } catch (error) {
      return res.status(500).json({ error: "Erro no servidor" })
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id

      const response = await customerServices.getById(id)
  
      if (response == 404) {
        return res.status(404).json({ error_code: "CUSTOMER_NOT_FOUND", error_description: "Cliente não encontrado" })
      }
  
      return res.status(200).json(response)  
    } catch (error) {
      return res.status(500).json({ error: "Erro no servidor" })
    }
  }
}
