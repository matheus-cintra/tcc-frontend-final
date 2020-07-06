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

/** *****************************************************************************
 * Company Schema
 ****************************************************************************** */
const companySchema = Yup.object().shape({
  fantasyName: Yup.string()
    .min(4, 'Nome muito curto')
    .required('Nome fantasia necessário'),
  email: Yup.string().email('E-mail inválido'),
  phone: Yup.string().min(11, 'Telefone Inálido').max(11, 'Telefone Inválido'),
  zipCode: Yup.string().min(8, 'Cep Inálido').max(8, 'Cep Inválido'),
  street: Yup.string(),
  number: Yup.string(),
  additional: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
});

const validateCompany = async data => {
  return companySchema.validate(data, {
    abortEarly: false,
  });
};

export { validateSignUp, validateCompany };
