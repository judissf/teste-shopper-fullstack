import React, { forwardRef } from 'react'
import { IButton, IForm, IInput, ILabel } from '../../interfaces'
import {
  ButtonStyle,
  FormStyle,
  InputStyle,
  LabelStyle,
  ErrorMessageStyle,
} from './style'

export const Form: React.FC<IForm> = ({ children, onSubmit }) => {
  return <FormStyle onSubmit={onSubmit}> {children} </FormStyle>
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ id, placeholder, defaultValue, error, ...props }, ref) => {
    return (
      <div className='content-input'>
        <InputStyle
          id={id}
          type='text'
          placeholder={placeholder}
          ref={ref}
          {...props}
          defaultValue={defaultValue}
        />
        {error?.message && (
          <ErrorMessageStyle>{error.message}</ErrorMessageStyle>
        )}
      </div>
    )
  }
)

export const Label = ({ text, htmlFor }: ILabel) => (
  <LabelStyle htmlFor={htmlFor}>{text}</LabelStyle>
)

export const Button = ({ id, text, background_color, onClick }: IButton) => {
  return (
    <ButtonStyle id={id} $background_color={background_color} onClick={onClick}>
      {text}
    </ButtonStyle>
  )
}
