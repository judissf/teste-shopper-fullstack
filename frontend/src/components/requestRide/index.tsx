import { useContext } from 'react'
import { EstimateRideStyle } from './style'
import { Context } from '../../context/Context'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { estimateSchema } from '../../schemas/ride'
import { IEstimateRequest } from '../../interfaces'
import { Button, Form, Input, Label } from '../form'
import PlaceIcon from '@mui/icons-material/Place'

export const EstimateRide = () => {
  const { estimateRide, customer } = useContext(Context)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEstimateRequest>({
    resolver: yupResolver(estimateSchema),
  })

  return (
    <EstimateRideStyle>
      {customer?.name && (<h2 className='font-title'>Olá, {customer?.name}</h2>)}

      <Form onSubmit={handleSubmit(estimateRide)}>
        <Label htmlFor='customer_id' text='Usuário (id)' />
        <Input
          id='customer_id'
          placeholder='Informe o ID do usuário'
          error={errors?.customer_id}
          {...register('customer_id')}
          defaultValue={customer?.id}
        />

        
        <Label htmlFor='trip' text='Solicite sua corrida' />
        <div id='trip' className='icon-input'>
          
          <div className='icon'>
            <PlaceIcon sx={{ color: '#27B906' }} />
          </div>

          <Input
            id='origin'
            placeholder='Informe o local de embarque'
            error={errors?.origin}
            {...register('origin')}
          />

        </div>

        <div className='icon-input'>

          <div className='icon'>
            <PlaceIcon sx={{ color: '#FF0000' }} />
          </div>

          <Input
            id='destination'
            placeholder='Informe o local de destino'
            error={errors?.destination}
            {...register('destination')}
          />

        </div>

        <Button type='submit' text='encontrar corrida' background_color='#373790' />
      </Form>
    </EstimateRideStyle>
  )
}
