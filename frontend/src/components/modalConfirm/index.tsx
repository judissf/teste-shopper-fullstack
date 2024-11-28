import { useContext } from "react"
import { Button } from "../form"
import { ContainerModal, ModalConfirmStyle } from "./style"
import { Context } from "../../context/Context"

export const ModalConfirm = () => {
  const { setShowModal, showModal, dataConfirmRide, confirmRide } = useContext(Context)

  return (
    <ModalConfirmStyle>
      <ContainerModal>
        <div className="modal-head">
          <h5 className="font-title">Confirme sua corrida</h5>

          <Button type="button" onClick={() => setShowModal(!showModal)} text="x" background_color="rgba(255, 0, 0, 0.6)"></Button>
        </div>

        <div className="modal-content">
          <p className="font-text">Confirmar corrida com {dataConfirmRide?.driver?.name}?</p>

          <Button type="button" onClick={confirmRide} text="confirmar corrida" background_color="#373790"/>
        </div>
      </ContainerModal>
    </ModalConfirmStyle>
  )
}