import styled from 'styled-components'

export const ListDriversStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  h4 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .list-drivers {

  }
`

export const DriverStyle = styled.li`
  display: flex;
  width: 100%;
  padding: 2rem;
  gap: 1.8rem;
  justify-content: space-between;
  background-color: var(--background);
  border-radius: 1rem;
  margin: 0 auto;
  margin-bottom: 1.6rem;
  
  @media (max-width: 564px) {
    max-width: 50rem;
  }

  @media (min-width: 565px) {
    max-width: 50rem;
  }

  @media (min-width: 991px) {
    max-width: 60rem;
  }

  @media (min-width: 1200px) {
    max-width: 80rem;
  }

  .driver-info {
    display: flex;
    flex-direction: column;
    color: var(--white);
    min-width: 30rem;

    .driver-name {
      font-size: 3.4rem;
      font-family: var(--font-nunito);
      font-weight: 800;
    }

    .driver-description,
    .driver-vehicle,
    .driver-rating,
    .driver-comment,
    .driver-value {
      font-size: 1.2rem;
    }
    .driver-vehicle {
    }
    .driver-rating {
    }
    .driver-comment {
    }
    .driver-value {
    }
  }

  .driver-img {
    figure {
      width: 23.6rem;
      height: 36rem;

      img {
        border-radius: 0.6rem;
      }
    }
  }
`
