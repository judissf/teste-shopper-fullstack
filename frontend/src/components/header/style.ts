import styled from "styled-components";

export const HeaderStyle = styled.header`
  display: block;
  width: 100%;
  padding-top: 1.2rem;
  margin-bottom: 4rem;
`

export const Logo = styled.figure`
  display: block;
  margin: 0 auto;
  width: max-content;

  img {
    width: 50rem;

    @media (max-width: 768px) {
      width: 40rem;
    }

    @media (max-width: 565px) {
      width: 36rem;
    }

    @media (max-width: 5425px) {
      width: 32rem;
    }
  }
`