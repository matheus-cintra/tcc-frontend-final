import React from 'react';

import { RowContainer, InputContainer } from './styles';
import Input from '../../InputMask/Input';

export default function Address() {
  return (
    <>
      <RowContainer>
        <InputContainer
          style={{
            width: '20%',
            marginRight: '5px',
          }}
        >
          <Input
            mask="99999-999"
            name="address"
            type="text"
            placeholder="Cep"
          />
        </InputContainer>
        <InputContainer
          style={{
            width: '65%',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          <Input name="street" type="text" placeholder="Rua" />
        </InputContainer>
        <InputContainer
          style={{
            width: '14%',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          <Input maxLength="5" name="number" type="text" placeholder="Número" />
        </InputContainer>
      </RowContainer>
      <RowContainer>
        <InputContainer
          style={{
            width: '33%',
            marginRight: '5px',
          }}
        >
          <Input name="additional" type="text" placeholder="Complemento" />
        </InputContainer>
        <InputContainer
          style={{
            width: '33%',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          <Input name="city" type="text" placeholder="Cidade" />
        </InputContainer>
        <InputContainer
          style={{
            width: '33%',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          <Input name="state" type="text" placeholder="Estado" />
        </InputContainer>
      </RowContainer>
      <RowContainer>
        <InputContainer
          style={{
            marginRight: '5px',
          }}
        >
          <Input name="description" type="text" placeholder="Descrição" />
        </InputContainer>
      </RowContainer>
    </>
  );
}
