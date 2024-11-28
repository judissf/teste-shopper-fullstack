import { Router } from "express"
import { container } from "tsyringe"
import { DriverControllers } from "../controllers/drivers.controllers"
import { ValidateDriverGetById } from "../middlewares/validateDriver.middlewares"

const driverControllers = container.resolve(DriverControllers)

export const driverRouter = Router()

driverRouter.post("/", (req, res) => {
  driverControllers.register(req, res)
})

driverRouter.get(
  "/:id",
  (req, res, next) => {
    ValidateDriverGetById(req, res, next)
  },
  (req, res) => {
    driverControllers.getById(req, res)
  }
)
