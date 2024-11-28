import { Router } from "express"
import { container } from "tsyringe"
import { RideControllers } from "../controllers/rides.controllers"
import { ValidateRideEstimate, ValidateRideConfirm, ValidateRideHistoric } from "../middlewares/validateRide.middlewares"

const rideControllers = container.resolve(RideControllers)

export const rideRouter = Router()

// POST /ride/estimate
rideRouter.post(
  "/estimate",
  (req, res, next) => {
    ValidateRideEstimate(req, res, next)
  },
  (req, res) => {
    rideControllers.estimate(req, res)
  }
)

// PATCH /ride/confirm
rideRouter.patch(
  "/confirm",
  (req, res, next) => {
    ValidateRideEstimate(req, res, next)
  },
  (req, res, next) => {
    ValidateRideConfirm(req, res, next)
  },
  (req, res) => {
    rideControllers.confirm(req, res)
  }
)

// GET /ride/{customer_id}?driver_id={id do motorista}
rideRouter.get(
  "/:customer_id",
  (req, res, next) => {
    ValidateRideHistoric(req, res, next)
  },
  (req, res) => {
    rideControllers.historic(req, res)
  }
)
