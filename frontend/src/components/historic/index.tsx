import { useContext } from 'react'
import { CardHistoricStyle, HistoricStyle, ListHistoricStyle } from './style'
import { Context } from '../../context/Context'
import { Button, Label } from '../form'
import { v4 as uuid } from 'uuid'
import { IRide } from '../../interfaces'

export const Historic = () => {
  const { setHistoricByDriverId, historic, getHistoric, getHistoricById, setTakeIdCustomer } = useContext(Context)

  return (
    <HistoricStyle>
      <h6 className='font-title'>Histórico de viagens</h6>

      <div className='container-buttons'>
        <Label text='ID de Usuário' htmlFor='customer_id' />
        <input
            className='input-number'
            id='customer_id'
            type='text'
            onChange={(e) => {
              setTakeIdCustomer(e.currentTarget.value)}}
            min={1}
          />

        <Button
          text='solicitar histórico completo'
          background_color='#373790'
          type='button'
          onClick={getHistoric}
        />

        <div className='filter'>
          <Label htmlFor='driver' text='Filtrar motorista:' />
          <input
            className='input-number'
            id='driver'
            type='number'
            onChange={(e) => {
              setHistoricByDriverId(+e.currentTarget.value)
            }}
            min={1}
          />
          <Button type='button' background_color='#373790' text='Solicitar histórico filtrado' onClick={getHistoricById} />
        </div>
      </div>

      <ListHistoricStyle>
        {historic.rides?.map((historic) => (
          <CardHistoric
            key={uuid()}
            id={+historic.id}
            date={historic.date}
            origin={historic.origin}
            destination={historic.destination}
            distance={historic.distance}
            duration={historic.duration}
            driver={historic.driver}
            value={historic.value}
          />
        ))}
      </ListHistoricStyle>
    </HistoricStyle>
  )
}

export const CardHistoric = ({
  id,
  date,
  origin,
  destination,
  distance,
  duration,
  driver,
  value,
}: IRide) => {
  function formatDate(dateRide: Date) {
    const date = new Date(dateRide)
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return new Intl.DateTimeFormat('pt-BR', options)
      .format(date)
      .replace(',', ' às')
  }

  return (
    <CardHistoricStyle>
      <p className='font-text'>Data e hora: {formatDate(date)}</p>
      <p className='font-text'>Motorista: {driver.name}</p>
      <p className='font-text'>Origem: {origin}</p>
      <p className='font-text'>Destino: {destination}</p>
      <p className='font-text'>Distância: {distance}km</p>
      <p className='font-text'>Tempo: {duration}</p>
      <p className='font-text'>Valor: {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(value)}</p>
    </CardHistoricStyle>
  )
}
