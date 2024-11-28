import { Router } from "express"
import { container } from "tsyringe"
import { CustomerControllers } from "../controllers/customers.controllers"
import { ValidateCustomerGetById } from "../middlewares/validateCustomer.middlewares"

const customerControllers = container.resolve(CustomerControllers)

export const customerRouter = Router()

customerRouter.post("/", (req, res) => {
  customerControllers.register(req, res)
})

customerRouter.get(
  "/:id",
  (req, res, next) => {
    ValidateCustomerGetById(req, res, next)
  },
  (req, res) => {
    customerControllers.getById(req, res)
  }
)
