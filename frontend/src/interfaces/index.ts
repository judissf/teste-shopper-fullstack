import { FormEvent } from 'react'
import { FieldError } from 'react-hook-form'

export interface IProvider {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  customer: ICustomer
  setCustomer: React.Dispatch<React.SetStateAction<ICustomer>>
  estimate: IEstimate
  setEstimate: React.Dispatch<React.SetStateAction<IEstimate>>
  dataConfirmRide: IConfirmRequest
  setDataConfirmRide: React.Dispatch<React.SetStateAction<IConfirmRequest>>
  mapUrl: string
  setMapUrl: React.Dispatch<React.SetStateAction<string>>
  historic: IHistoric
  setHistoric: React.Dispatch<React.SetStateAction<IHistoric>>
  historicByDriverId: number
  setHistoricByDriverId: React.Dispatch<React.SetStateAction<number>>
  takeIdCustomer: string
  setTakeIdCustomer: React.Dispatch<React.SetStateAction<string>>
  createCustomer: (data: ICustomer) => Promise<void>
  estimateRide: (data: IEstimateRequest) => Promise<void>
  getMap: (latLng: IGetMap) => void
  confirmRide: (data: IConfirmRequest) => Promise<void>
  getHistoric: () => Promise<void>
  getHistoricById: () => Promise<void>
}

export interface IChildren {
  children: React.ReactNode
}

export interface ICustomer {
  id?: string
  name: string
  email: string
}

export interface IEstimate {
  origin: {
    latitude: string
    longitude: string
  }
  destination: {
    latitude: string
    longitude: string
  }
  distance: number
  duration: string
  options: IDriverOptions[]
  routeResponse: JSON
}

export interface IEstimateRequest {
  customer_id: string
  origin: string
  destination: string
}

export interface IConfirmRequest {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver: {
    id: number
    name: string
  }
  value: number
}

export interface IDriver {
  id: number
  name: string
  description: string
  vehicle: string
  review: JSON
  fee: number
  min_distance: number
}

export interface IDriverOptions {
  id: number
  name: string
  description: string
  vehicle: string
  review: {
    rating: string
    comment: string
  }
  value: number
}

export interface IRide {
  id: number
  date: Date
  origin: string
  destination: string
  distance: number
  duration: string
  driverId?: number
  driver: IDriver
  value: number
}

export interface IHistoric {
  customer_id: string
  rides: IRide[]
}

export interface IInput {
  id: string
  placeholder: string
  error?: FieldError
  defaultValue?: string
}

export interface IForm {
  children: React.ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export interface IButton {
  id?: string
  name?: string
  type: string
  text: string
  background_color: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export interface IButtonStyle {
  $background_color: string
}

export interface ILabel {
  text: string
  htmlFor: string
}

export interface IGetMap {
  origin: {
    latitude: string
    longitude: string
  }
  destination: {
    latitude: string
    longitude: string
  }
}
