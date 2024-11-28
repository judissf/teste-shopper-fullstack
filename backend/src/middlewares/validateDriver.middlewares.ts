import { Request, Response, NextFunction } from "express"

export const ValidateDriverGetById = (req: Request, res: Response, next: NextFunction) => {
  const id = +req.params.id

  if (isNaN(id)) {
    return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Os dados fornecidos na requisição são inválidos" })
  }

  next()
}