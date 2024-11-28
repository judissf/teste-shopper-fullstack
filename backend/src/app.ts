import "reflect-metadata"
import "express-async-errors"
import "dotenv/config"
import express, { json } from "express"
import helmet from "helmet"
import cors from "cors"
require('dotenv').config({ path: "../../.env" });

import { customerRouter } from "./routes/customers.routes"
import { driverRouter } from "./routes/drivers.routes"
import { rideRouter } from "./routes/rides.routes"

export const app = express()

app.use(helmet())

app.use(json())

app.use(cors({ origin: 'http://localhost:80' }))

app.use("/customers", customerRouter)
app.use("/drivers", driverRouter)
app.use("/ride", rideRouter)
