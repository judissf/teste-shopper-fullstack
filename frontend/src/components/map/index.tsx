import { useContext } from 'react'
import { Context } from '../../context/Context'
import { MapStyle } from './style'

export const Map = () => {
  const { mapUrl } = useContext(Context)

  return (
    <MapStyle>
      <h3 className='font-title'>Mapa da rota</h3>
      
      <figure>
        <img src={mapUrl} alt='Mapa com origem e destino' />
      </figure>
    </MapStyle>
  )
}
