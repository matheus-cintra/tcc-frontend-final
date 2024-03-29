import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import logo from '../../assets/logo.svg';
import {
  Form,
  LoginContainer,
  RegisterContainer,
  LoadingContainer,
  TextLoadingDocuments,
  LoadingScreen,
} from './styles';
import Input from '../../components/Form/Input';

import { signInRequest } from '../../store/modules/auth/actions';

export default function SignIn() {
  const [logging, setLogging] = useState(false);

  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('E-mail inválido.')
      .required('Por favor digite seu email.'),
    password: Yup.string()
      .min(4, 'No mínimo 4 dígitos')
      .required('Por favor digite sua senha.'),
  });

  const formRef = useRef(null);

  async function handleSubmit(data) {
    setLogging(true);
    try {
      const { email, password } = data;
      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(signInRequest(email, password, setLogging));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });
        formRef.current.setErrors(errorMessages);
      }

      setLogging(false);
    }
  }

  return (
    <>
      <LoadingContainer
        style={{
          display: logging ? 'flex' : 'none',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <TextLoadingDocuments>Entrando</TextLoadingDocuments>
        <LoadingScreen />
      </LoadingContainer>
      <LoginContainer style={{ display: logging ? 'none' : '' }}>
        <img src={logo} alt="Sis - MEI" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" type="email" placeholder="Seu e-mail" />
          <Input name="password" type="password" placeholder="Sua senha" />

          <button type="submit">Acessar</button>

          <Link
            style={{
              margin: 0,
              marginTop: 10,
              fontSize: 12,
              fontWeight: 'lighter',
              background: 'none',
              padding: 0,
              // width: 100,
              height: 30,
            }}
            to="/forgot-password"
          >
            Esqueci minha senha
          </Link>
        </Form>
      </LoginContainer>
      <RegisterContainer>
        <div>
          <h2>Criar Conta</h2>
          <p>
            Junte-se a milhares de profissionais autônomos que querem ter
            controle de seus trabalhos de forma organizada e bem feita.
          </p>
          <Link to="/register">Registrar</Link>
        </div>
      </RegisterContainer>
    </>
  );
}
