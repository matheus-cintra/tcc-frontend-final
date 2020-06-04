import React from 'react';
import { Form } from '@unform/web';
import { Input } from '../../components/Form/styles';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <div>
      <h1>Hello World</h1>

      <Form>
        <Input name="email" />
      </Form>
    </div>
  );
}
