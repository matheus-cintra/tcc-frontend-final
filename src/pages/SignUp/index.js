import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import logo from '../../assets/logo.svg';
// import { Form, Container } from './styles';
import Input from '../../components/Form/Input';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="Sis - MEI" />
      <form>
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha" />
        <button type="submit">Acessar</button>
        <Link to="/register">Registrar</Link>
      </form>
    </>
  );
}
