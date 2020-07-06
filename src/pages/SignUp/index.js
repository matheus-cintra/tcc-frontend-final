import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import Icon from '@mdi/react';
import * as Yup from 'yup';
import {
  mdiAccount,
  mdiEmail,
  mdiFormTextboxPassword,
  mdiPhone,
  mdiFileDocument,
  mdiFactory,
} from '@mdi/js';
import { Form, InputContainer, LogoContainer } from './styles';
import logo from '../../assets/logo.svg';
import Input from '../../components/Form/Input';

import { validateSignUp } from '../../Schemas/globalSchemas';

import { signUpRequest } from '../../store/modules/auth/actions';

export default function SignUp() {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  /** ************************* PRINT FORM IN CONSOLE ************************* */
  const root = document.getElementById('root');
  root.addEventListener('dblclick', () => {
    if (formRef.current === null) return;
    const { getData } = formRef.current;
    console.warn('myForm > ', getData()); //eslint-disable-line
  });
  /** ************************************************************************* */

  async function handleSubmit(data) {
    try {
      await validateSignUp(data);

      dispatch(signUpRequest(data));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });
        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <>
      <LogoContainer>
        <img src={logo} alt="Sis - MEI" />
      </LogoContainer>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputContainer>
          <Icon path={mdiAccount} title="Nome" size={1} color="#c3c3c3" />
          <Input name="name" type="text" placeholder="Seu nome*" />
        </InputContainer>
        <InputContainer>
          <Icon path={mdiEmail} title="Email" size={1} color="#c3c3c3" />
          <Input name="email" type="text" placeholder="Seu e-mail*" />
        </InputContainer>
        <InputContainer>
          <Icon
            path={mdiFormTextboxPassword}
            title="Senha"
            size={1}
            color="#c3c3c3"
          />
          <Input name="password" type="password" placeholder="Sua senha*" />
        </InputContainer>
        <InputContainer>
          <Icon path={mdiPhone} title="Telefone" size={1} color="#c3c3c3" />
          <Input
            mask="99-99999-9999"
            name="phone"
            type="text"
            placeholder="Seu telefone"
          />
        </InputContainer>
        <InputContainer>
          <Icon
            path={mdiFileDocument}
            title="CNPJ"
            size={1}
            color="#c3c3c3  "
          />
          <Input
            mask="99-999-999/9999-99"
            name="cnpj"
            type="text"
            placeholder="Seu CNPJ*"
          />
        </InputContainer>
        <InputContainer>
          <Icon path={mdiFactory} title="Empresa" size={1} color="#c3c3c3  " />
          <Input
            name="companyName"
            type="text"
            placeholder="Sua Razão Social*"
          />
        </InputContainer>
        <button type="submit">Registrar</button>
      </Form>
    </>
  );
}
