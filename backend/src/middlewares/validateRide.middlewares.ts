import { Request, Response, NextFunction } from "express"

export const ValidateRideEstimate = (req: Request, res: Response, next: NextFunction) => {
  const { customer_id, origin, destination } = req.body
  
  if ((typeof customer_id != "string") || typeof origin != "string" || typeof destination != "string") {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Os dados fornecidos na requisição são inválidos" })
  }

  if (!customer_id) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "O atributo 'customer_id' é obrigatório" })
  }

  if (!origin) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "O atributo 'origin' é obrigatório" })
  }

  if (!destination) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "O atributo 'destination' é obrigatório" })
  }

  if (customer_id.length == 0 || origin.length == 0 || destination.length == 0) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Existem dados em branco na requisição" })
  }

  if (origin == destination) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Os endereços de origem e destino não podem ser iguais" })
  }

  return next()
}

export const ValidateRideConfirm = (req: Request, res: Response, next: NextFunction) => {
  const { distance, duration, driver, value } = req.body

  if (!distance) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "O atributo 'distance' é obrigatório" })
  }

  if (typeof distance != "number") {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Os dados fornecidos no corpo da requisição são inválidos" })
  }

  if (!duration) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "O atributo 'distance' é obrigatório" })
  }

  if (typeof duration != "string") {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Os dados fornecidos no corpo da requisição são inválidos" })
  }

  if (!driver) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "O atributo 'driver' é obrigatório" })
  }

  return next()
}

export const ValidateRideHistoric = (req: Request, res: Response, next: NextFunction) => {
  const customer_id = req.params.customer_id

  const driver_id = req.query.driver_id
  
  if (!customer_id) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "O atributo 'customer_id' é obrigatório" })
  }
  
  if (driver_id === undefined) {
    return next()
  }

  if (isNaN(+driver_id!)) {
    return res.status(400).json({ error_code: "INVALID_DRIVER", error_description: "Motorista inválido" })
  }

  return next()
}
