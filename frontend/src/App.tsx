import { ToastBar, Toaster } from 'react-hot-toast'
import { useContext } from 'react'
import { Header } from './components/header'
import { MainStyle } from './main.style'
import { Context } from './context/Context'
import { CreateCustomer } from './components/createCustomer'
import { EstimateRide } from './components/requestRide'
import { Map } from './components/map'
import { ListDrivers } from './components/listDrivers'
import { ModalConfirm } from './components/modalConfirm'
import { Historic } from './components/historic'

export const App = () => {
  const { mapUrl, customer, showModal, estimate } = useContext(Context)

  const isCustomerEmpty = !customer.id

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0
  }

  const list_empyt = isEmpty(estimate)

  return (
    <>
      <Header />
      <MainStyle className='container'>
        {isCustomerEmpty && <CreateCustomer />}
        <EstimateRide />
        {mapUrl != '' && <Map />}
        {!list_empyt && <ListDrivers />}
        <Historic />
        <Toaster>
          {(t) => (
            <ToastBar
              toast={t}
              style={{
                ...t.style,
                animation: t.visible
                  ? 'custom-enter 2s ease'
                  : 'custom-exit 2s ease',
              }}
            />
          )}
        </Toaster>
      </MainStyle>
      {showModal == true && <ModalConfirm />}
    </>
  )
}
