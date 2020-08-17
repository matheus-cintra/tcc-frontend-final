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
  phone: Yup.string().min(11, 'Telefone Inválido').max(11, 'Telefone Inválido'),
  cep: Yup.string().max(8, 'Cep Inválido'),
  address: Yup.string(),
  number: Yup.string(),
  additional: Yup.string(),
  neighborhood: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
});

const validateCompany = async data => {
  console.warn('data > ', data);

  return companySchema.validate(data, {
    abortEarly: false,
  });
};

/** *************************************************************************** */

/** *****************************************************************************
 * Customer Schema
 ****************************************************************************** */
const customerSchema = Yup.object().shape({
  name: Yup.string().required('Nome obrigatório'),
  cnpj: Yup.string().min(18, 'CNPJ inválido').max(18, 'CNPJ inválido'),
  cpf: Yup.string().min(14, 'CPF inválido').max(14, 'CPF inválido'),
  phone: Yup.string().min(11, 'Telefone Inválido').max(11, 'Telefone Inválido'),
  email: Yup.string().email('E-mail inválido'),
  person: Yup.string(),
  zipCode: Yup.string().min(8, 'Cep Inválido').max(8, 'Cep Inválido'),
  street: Yup.string(),
  number: Yup.string(),
  additional: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
});
const validateCustomer = async data => {
  return customerSchema.validate(data, {
    abortEarly: false,
  });
};

export { validateSignUp, validateCompany, validateCustomer };
