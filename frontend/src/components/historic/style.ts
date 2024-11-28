import styled from "styled-components";

export const HistoricStyle = styled.div`
  h6 {
    text-align: center;
  }
`

export const ListHistoricStyle = styled.ul`
  display: block;
`

export const CardHistoricStyle = styled.li`
  display: flex;
  flex-direction: column;
  background: var(--background);
  border-radius: 0.8rem;
  padding: 2rem;
  margin-bottom: 1.2rem;
  
  p {
    color: var(--white);
  }
`