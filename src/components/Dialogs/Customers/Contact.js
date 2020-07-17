import React from 'react';
import Input from '../../InputMask/Input';
import { RowContainer, InputContainer } from './styles';

export default function Contact() {
  return (
    <>
      <RowContainer>
        <InputContainer
          style={{
            width: '50%',
            marginRight: '5px',
          }}
        >
          <Input
            mask="99-99999-9999"
            name="phone"
            type="text"
            placeholder="Telefone"
          />
        </InputContainer>

        <InputContainer
          style={{
            width: '50%',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          <Input name="email" type="text" placeholder="Email" />
        </InputContainer>
      </RowContainer>
    </>
  );
}
