import * as yup from "yup"

export const estimateSchema = yup.object().shape({
  customer_id: yup.string().uuid("ID inválido").required("ID do usuário é obrigatório"),
  origin: yup.string().required("Endereço de origem é obrigatório"),
  destination: yup.string().required("Endereço de destino é obrigatório"),
})
