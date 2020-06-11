import * as Yup from 'yup';
import helper from '../helpers/helper';

/** *****************************************************************************
 * SignUp Schema
 ****************************************************************************** */
const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, 'Nome muito pequeno.')
    .required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha muito pequena')
    .required('Senha é obrigatório'),
  cnpj: Yup.string().min(14, 'CNPJ Invalido').required('CNPJ é obrigatório'),
  companyName: Yup.string().required('Nome da empresa é obrigatório'),
});

const validateSignUp = async function validateSignUp(data) {
  if (data.cnpj) {
    data.cnpj = helper.returnOnlyNumbers(data.cnpj);
  }

  return signUpSchema.validate(data, {
    abortEarly: false,
  });
};
/** *************************************************************************** */

export { validateSignUp };
