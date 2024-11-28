import styled from "styled-components";

export const ModalConfirmStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
`

export const ContainerModal = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 40rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);

  .modal-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;

    h5 {
      color: var(--white);
      margin-bottom: 0;
    }

    button {
      margin: 0;
      padding: 1.2rem;
    }
  }

  .modal-content {
    p {
      color: var(--white);
      margin-bottom: 1.2rem;
    }
  }
`