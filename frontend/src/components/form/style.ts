import styled from "styled-components";
import { IButtonStyle } from "../../interfaces";

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  border-radius: 0.6rem;
  padding: 2.2rem;

  .content-input {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .icon-input {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .icon {
    position: relative;
    width: 3.2rem;
    height: 5rem;

    svg {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      font-size: 3.2rem;
    }
  }
`

export const LabelStyle = styled.label`
  color: var(--white);
  font-size: 1.8rem;
  font-weight: 700;
  font-family: var(--font-nunito);
  margin-bottom: 1rem;
`

export const InputStyle = styled.input`
  display: flex;
  flex-direction: column;
  height: 3.2rem;
  padding: 0.8rem 1.2rem;
  font-size: 1.6rem;
  color: var(--white);
  background-color: transparent;
  border: 0.1rem solid var(--white);
  border-radius: 0.4rem;
  margin-bottom: 1.6rem;
  
  &::placeholder {
    color: var(--placeholder);
  }

  &:focus {
    border-color: var(--blue);

    &::placeholder {
      color: var(--white);
    }
  }
`

export const ErrorMessageStyle = styled.span`
  display: inline-block;
  color: #f5071b;
  font-size: 1.4rem;
  font-family: var(--font-inter);
  margin-bottom: 1.2rem;
`

export const ButtonStyle = styled.button<IButtonStyle>`
  background-color: ${props => props.$background_color};
  color: var(--white);
  border-radius: 0.4rem;
  border: none;
  padding: 1.4rem;
  font-weight: 700;
  font-family: var(--font-inter);
  text-transform: uppercase;
  margin-top: 0.4rem;
  cursor: pointer;

  &:hover {
    background-color: #14de40;
  }
`
