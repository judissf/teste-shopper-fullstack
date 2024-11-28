import { Request, Response, NextFunction } from "express"

export const ValidateCustomerGetById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id

  if (typeof id != "string") {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Os dados fornecidos na requisição são inválidos" })
  }

  next()
}