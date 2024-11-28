import { Request, Response } from "express"
import { injectable } from "tsyringe"
import { RideServices } from "../services/rides.services"
import { container } from "tsyringe"
import "dotenv/config"
import { TRideConfirmResponse } from "../schemas/rides.schemas"

const rideServices = container.resolve(RideServices)

@injectable()
export class RideControllers {
  async estimate(req: Request, res: Response) {
    try {
      const api_routes = await fetch(
        "https://routes.googleapis.com/directions/v2:computeRoutes/?fields=*",
        {
          method: "POST",
          body: JSON.stringify({
            origin: {
              address: req.body.origin,
            },
            destination: {
              address: req.body.destination,
            },
          }),
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.GOOGLE_API_KEY!,
          },
        }
      )

      const customer_id = req.body.customer_id

      const route_response = await api_routes.json()

      const response = await rideServices.estimate(customer_id, route_response)

      if (response == 404) {
        return res.status(404).json({ error_code: "CUSTOMER_NOT_FOUND", error_description: "Cliente não encontrado" })
      }

      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ error: "Erro no servidor" })
    }
  }

  async confirm(req: Request, res: Response) {
    try {
      const response = await rideServices.confirm(req.body)

      console.log("response =>", response)

      if (response === "Cliente não encontrado") {
        return res.status(404).json({ error_code: "CUSTOMER_NOT_FOUND", error_description: response })
      }
      
      if (response === "Motorista não encontrado") {
        return res.status(404).json({ error_code: "DRIVER_NOT_FOUND", error_description: response })
      }

      if (response === "Motorista contém dado inválido") {
        return res.status(404).json({ error_code: "INVALID_DATA", error_description: response })
      }

      if (response === "Quilometragem inválida para o motorista") {
        return res.status(406).json({ error_code: "INVALID_DISTANCE", error_description: response })
      }

      return res.status(200).json(response)
    } catch (error) {
      return res.status(500).json({ error: "Erro no servidor" })
    }
  }

  async historic(req: Request, res: Response) {
    try {
      const customer_id = req.params.customer_id

      const driver_id = req.query.driver_id

      if (!driver_id) {

        const response = await rideServices.historic(customer_id)

        if (response === "Cliente não encontrado") {
          return res.status(400).json({ error_code: "INVALID_CUSTOMER", error_description: "Cliente inválido" })
        }
        
        return res.status(200).json(response)
        
      } else {
        const response = await rideServices.historic(customer_id, +driver_id!)

        if (response === "Cliente não encontrado") {
          return res.status(400).json({ error_code: "INVALID_CUSTOMER", error_description: "Cliente inválido" })
        }
        
        if (response === "Motorista não encontrado") {
          return res.status(400).json({ error_code: "INVALID_DRIVER", error_description: "Motorista inválido" })
        }

        if (response === 404) {
          return res.status(404).json({ error_code: "NO_RIDES_FOUND", error_description: "Nenhum registro encontrado" })
        }
        
        return res.status(200).json(response)
      }
    } catch (error) {
      return res.status(500).json({ error: "Erro no servidor" })
    }
  }
}
