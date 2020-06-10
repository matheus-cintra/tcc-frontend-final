import React from 'react';
import logo from '../../assets/logo.svg';

import { Container } from './styles';

export default function ConfirmationRegister() {
  return (
    <Container>
      <img src={logo} alt="BeautyApp" />
      <h2>
        Link de Ativação enviado para seu e-mail. Por favor, ative sua conta
        para utilizar o sistema.
      </h2>
    </Container>
  );
}
