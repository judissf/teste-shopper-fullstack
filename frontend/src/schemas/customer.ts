import * as yup from "yup";

export const customerSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nome é obrigatório")
    .min(2, "No mínimo 2 caracteres"),
  email: yup
    .string()
    .trim("Não é permitido conter espaço")
    .email("Precisa ser um e-mail válido")
    .required("E-mail é obrigatório")
});
