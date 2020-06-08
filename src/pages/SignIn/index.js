import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { Form, LoginContainer, RegisterContainer, Button } from './styles';
import Input from '../../components/Form/Input';
import * as Yup from 'yup';

import { signInRequest } from '../../store/modules/auth/actions';

export default function SignIn() {
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
    try {
      const { email, password } = data;
      await schema.validate(data, {
        abortEarly: false,
      });

      dispatch(signInRequest(email, password));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        let errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  return (
    <>
      <LoginContainer>
        <img src={logo} alt="Sis - MEI" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" type="email" placeholder="Seu e-mail" />
          <Input name="password" type="password" placeholder="Sua senha" />
          <button type="submit">Acessar</button>
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
