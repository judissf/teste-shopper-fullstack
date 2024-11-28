import { useContext } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Context } from "../../context/Context"
import { CreateCustomerStyle } from "./style"
import { Button, Form, Input, Label } from "../form"
import { ICustomer } from "../../interfaces"
import { customerSchema } from "../../schemas/customer"

export const CreateCustomer = () => {
  const { createCustomer } = useContext(Context)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICustomer>({
    resolver: yupResolver(customerSchema),
  })

  return (
    <CreateCustomerStyle>
      <h1 className="font-title">Boas-vindas ao Need for Trip. O app exclusivo com motoristas exclusivos.</h1>

      <Form onSubmit={handleSubmit(createCustomer)}>
        <Label htmlFor='name' text='Nome' />
        <Input
          id='name'
          placeholder='Seu nome'
          error={errors?.name}
          {...register("name")}
        />

        <Label htmlFor='email' text='E-mail' />
        <Input
          id='email'
          placeholder='Seu e-mail'
          error={errors?.email}
          {...register("email")}
        />

        <Button type='submit' text='criar usuário' background_color='#373790' />
      </Form>
    </CreateCustomerStyle>
  )
}
