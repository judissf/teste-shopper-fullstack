import { createContext, useState } from 'react'
import {
  IChildren,
  IConfirmRequest,
  ICustomer,
  IEstimate,
  IEstimateRequest,
  IGetMap,
  IHistoric,
  IProvider,
} from '../interfaces'
import api from '../services/axios'
import toast from 'react-hot-toast'

export const Context = createContext<IProvider>({} as IProvider)

export const Provider = ({ children }: IChildren) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [customer, setCustomer] = useState<ICustomer>({} as ICustomer)
  const [estimate, setEstimate] = useState<IEstimate>({} as IEstimate)
  const [historic, setHistoric] = useState<IHistoric>({} as IHistoric)
  const [historicByDriverId, setHistoricByDriverId] = useState<number>(0)
  const [takeIdCustomer, setTakeIdCustomer] = useState<string>('')
  const [mapUrl, setMapUrl] = useState<string>('' as string)
  const [dataConfirmRide, setDataConfirmRide] = useState<IConfirmRequest>(
    {} as IConfirmRequest
  )

  const createCustomer = async (data: ICustomer): Promise<void> => {
    await api
      .post('/customers', data)
      .then((res) => {
        setCustomer(res.data)
        toast.success('Conta criada com sucesso', {
          style: {
            fontSize: 16,
            fontFamily: `"Nunito", sans-serif`,
          },
        })
      })
      .catch((error) => {
        toast.error(`${error.status} - ${error.response.data.error}`, {
          style: {
            fontSize: 16,
            fontFamily: `"Nunito", sans-serif`,
          },
        })
        console.error(error)
      })
  }

  const estimateRide = async (data: IEstimateRequest): Promise<void> => {
    setDataConfirmRide((prev) => ({
      ...prev,
      customer_id: data.customer_id,
      origin: data.origin,
      destination: data.destination,
    }))

    await api
      .post('/ride/estimate', data)
      .then((res) => {
        setEstimate(res.data)

        const latLng = {
          origin: res.data.origin,
          destination: res.data.destination,
        }

        getMap(latLng)

        toast.success('Prévia da corrida recebida', {
          style: {
            fontSize: 16,
            fontFamily: `"Nunito", sans-serif`,
          },
        })

        setDataConfirmRide((prev) => ({
          ...prev,
          duration: res.data.duration,
          distance: res.data.distance,
        }))
      })
      .catch((error) => {
        toast.error(
          `${error.status} - ${error.response.data.error_description}`,
          {
            style: {
              fontSize: 16,
              fontFamily: `"Nunito", sans-serif`,
              animationDuration: '4000',
            },
          }
        )
        console.error(error)
      })
  }

  const getMap = (latLng: IGetMap) => {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY

    const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&maptype=roadmap&style=feature:road|color:0xfefefe&markers=color:0x27B906|${latLng.origin.latitude},${latLng.origin.longitude}&markers=color:0xFF0000|${latLng.destination.latitude},${latLng.destination.longitude}&path=color:0x2986cc|weight:4&key=${apiKey}`

    setMapUrl(mapUrl)
  }

  const confirmRide = async (): Promise<void> => {
    const data = dataConfirmRide

    await api
      .patch('/ride/confirm', data)
      .then((res) => {
        toast.success('Corrida confirmada com sucesso', {
          style: {
            fontSize: 16,
            fontFamily: `"Nunito", sans-serif`,
          },
        })
      })
      .catch((error) => {
        toast.error(`${error.status} - ${error.response.data.error}`)
        console.error(error)
      })
  }

  const getHistoric = async (): Promise<void> => {
    await api
      .get(`/ride/${takeIdCustomer}`)
      .then((res) => {
        setHistoric((prev) => ({ ...prev, rides: res.data.rides}))
        toast.success('Histórico disponível', {
          style: {
            fontSize: 16,
            fontFamily: `"Nunito", sans-serif`,
          },
        })
      })
      .catch((error) => {
        toast.error(
          `${error.status} - ${error.response.data.error_description}`,
          {
            style: {
              fontSize: 16,
              fontFamily: `"Nunito", sans-serif`,
            },
          }
        )
        console.error(error)
      })
  }

  const getHistoricById = async (): Promise<void> => {
    await api
      .get(`/ride/${takeIdCustomer}?driver_id=${historicByDriverId}`)
      .then((res) => {
        setHistoric((prev) => ({ ...prev, rides: res.data.rides}))
        toast.success('Histórico disponível', {
          style: {
            fontSize: 16,
            fontFamily: `"Nunito", sans-serif`,
          },
        })
      })
      .catch((error) => {
        toast.error(
          `${error.status} - ${error.response.data.error_description}`,
          {
            style: {
              fontSize: 16,
              fontFamily: `"Nunito", sans-serif`,
            },
          }
        )
        console.error(error)
      })
  }

  return (
    <Context.Provider
      value={{
        customer,
        setCustomer,
        estimate,
        setEstimate,
        dataConfirmRide,
        setDataConfirmRide,
        mapUrl,
        setMapUrl,
        historic,
        setHistoric,
        showModal,
        setShowModal,
        createCustomer,
        estimateRide,
        getMap,
        confirmRide,
        historicByDriverId,
        setHistoricByDriverId,
        getHistoric,
        getHistoricById,
        takeIdCustomer,
        setTakeIdCustomer,
      }}
    >
      {children}
    </Context.Provider>
  )
}
