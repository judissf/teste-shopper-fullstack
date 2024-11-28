import { useContext } from 'react'
import { Context } from '../../context/Context'
import { DriverStyle, ListDriversStyle } from './style'
import { v4 as uuid } from 'uuid'
import { IDriverOptions } from '../../interfaces'
import dom from '../../assets/img/dominic_toretto.png'
import james from '../../assets/img/james_bond.png'
import homer from '../../assets/img/homer_simpson.png'
import { Button } from '../form'

export const ListDrivers = () => {
  const { estimate } = useContext(Context)

  return (
    <ListDriversStyle>
      <h4 className='font-title'>Motoristas disponíveis</h4>

      <ul className='list-drivers'>
        {estimate?.options?.map((driver) => (
          <Driver
            key={uuid()}
            id={driver.id}
            name={driver.name}
            description={driver.description}
            vehicle={driver.vehicle}
            review={driver.review}
            value={driver.value}
          />
        ))}
      </ul>
    </ListDriversStyle>
  )
}

const Driver = ({
  id,
  name,
  description,
  vehicle,
  review,
  value,
}: IDriverOptions) => {
  const { setShowModal, setDataConfirmRide } = useContext(Context)

  return (
    <DriverStyle>
      <div className='driver-info'>
        <p className='driver-name'>{name}</p>
        <p className='driver-description'>
          <b>Descrição:</b> <i>{description}</i>
        </p>
        <p className='driver-vehicle'>
          <b>Veículo:</b> <i>{vehicle}</i>
        </p>
        <p className='driver-rating'>
          <b>Avaliação:</b> <i>{review.rating}</i>
        </p>
        <p className='driver-comment'>
          <b>Comentário:</b> <i>{review.comment}</i>
        </p>
        <p className='driver-value'>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(value)}
        </p>
        <Button
          type='button'
          id={`${id}`}
          background_color='#373790'
          text='escolher'
          onClick={(event) => {
            setShowModal(true)
            setDataConfirmRide((prev) => ({ ...prev, driver: { id: +(event.target.id), name }, value }))
          }}
        />
      </div>

      <div className='driver-img'>
        <figure>
          <img
            src={
              name == 'Dominic Toretto'
                ? dom
                : name == 'Homer Simpson'
                ? homer
                : james
            }
            alt={`Foto do motorista ${name}`}
          />
        </figure>
      </div>
    </DriverStyle>
  )
}
