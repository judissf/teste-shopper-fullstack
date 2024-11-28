import { injectable } from "tsyringe"
import { prisma } from "../database/prisma"
import { ridesSchema, TRideConfirmRequest } from "../schemas/rides.schemas"

@injectable()
export class RideServices {
  async estimate(customer_id: string, route_response: any) {
    const customer = await prisma.customer.findUnique({ where: { id: customer_id } })

    if (!customer) {
      return 404
    }

    const duration = Math.round(
      +route_response.routes[0].legs[0].duration.slice(0, -1)
    )

    function formatTime(duration: number) {
      const minutes = Math.round(duration / 60)

      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60)
        const remainingMinutes = minutes % 60
        return `${hours} hora${hours > 1 ? "s" : ""}${
          remainingMinutes > 0
            ? ` e ${remainingMinutes} minuto${remainingMinutes > 1 ? "s" : ""}`
            : ""
        }`
      } else {
        return `${minutes} minuto${minutes > 1 ? "s" : ""}`
      }
    }

    const lat_origin =
      route_response.routes[0].legs[0].startLocation.latLng.latitude

    const lng_origin =
      route_response.routes[0].legs[0].startLocation.latLng.longitude

    const lat_destination =
      route_response.routes[0].legs[0].endLocation.latLng.latitude

    const lng_destination =
      route_response.routes[0].legs[0].endLocation.latLng.longitude

    const distance = +(
      route_response.routes[0].legs[0].distanceMeters / 1000
    ).toFixed(1)

    const drivers = await prisma.driver.findMany({
      orderBy: {
        fee: "asc",
      },
    })

    const filtered_drivers = drivers.filter(
      (driver) => distance >= driver.min_distance
    )

    const options = filtered_drivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: driver.review,
      value: driver.fee * distance,
    }))

    const estimated_ride = {
      origin: {
        latitude: lat_origin,
        longitude: lng_origin,
      },
      destination: {
        latitude: lat_destination,
        longitude: lng_destination,
      },
      distance,
      duration: formatTime(duration),
      options,
      routeResponse: route_response,
    }

    return estimated_ride
  }

  async confirm(data: TRideConfirmRequest) {
    const customer = await prisma.customer.findUnique({ where: { id: data.customer_id } })

    if (!customer) {
      return "Cliente não encontrado"
    }
    
    const driver = await prisma.driver.findUnique({ where: { id: data.driver.id } })

    if (!driver) {
      return "Motorista não encontrado"
    }

    if (driver.name != data.driver.name) {
      return "Motorista contém dado inválido"
    }

    if (data.distance < driver.min_distance) {
      return "Quilometragem inválida para o motorista"
    }
    
    await prisma.ride.create({
      data: {
        origin: data.origin,
        destination: data.destination,
        distance: data.distance,
        duration: data.duration,
        customerId: data.customer_id,
        driverId: data.driver.id,
        value: data.value,
      },
    })

    return { success: true }
  }

  async historic(customer_id: string, driver_id?: number) {
    if (!driver_id) {
      const customer = await prisma.customer.findUnique({ where: { id: customer_id } })
      
      if (!customer) {
        return "Cliente não encontrado"
      }

      const historic = await prisma.ride.findMany({
        include: { driver: { select: { id: true, name: true } }, },
        where: { customerId: customer_id },
      })

      const filtered_rides = historic.map((ride) => ridesSchema.parse(ride)) 

      const response = {
        customer_id,
        rides: filtered_rides
      }

      return response
    } else {
      const driver = await prisma.driver.findUnique({ where: { id: driver_id } })

      const customer = await prisma.customer.findUnique({ where: { id: customer_id } })
      
      if (!customer) {
        return "Cliente não encontrado"
      }

      if (!driver) {
        return "Motorista não encontrado"
      }

      const historic = await prisma.ride.findMany({
        include: { driver: { select: { id: true, name: true } } },
        where: { customerId: customer_id, driverId: driver_id }
      })

      if (!historic) {
        return 404
      }

      const filtered_rides = historic.map((ride) => ridesSchema.parse(ride)) 

      const response = {
        customer_id,
        rides: filtered_rides
      }

      return response
    }
  }
}
