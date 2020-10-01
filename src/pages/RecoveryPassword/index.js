import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import jwt from 'jsonwebtoken';

// import { Container } from './styles';

export default function RecoveryPassword() {
  const { token } = useParams();
  const currTime = new Date().getTime() / 1000;
  const decoded = jwt.decode(token);
  const expired = (decoded && currTime > decoded.exp) || true;

  if (token && expired) {
    return <Redirect to="/" />;
  }

  return <h1>Recovery Password</h1>;
}
