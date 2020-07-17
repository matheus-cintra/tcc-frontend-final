import React, { useEffect } from 'react';

import { RowContainer, InputContainer } from './styles';
import Input from '../../InputMask/Input';

export default function Basic(props) {
  const { saveData, form, defaults } = props;

  useEffect(() => {
    return () => {
      if (form && form.current) {
        saveData('basic', form.current.getData());
      }
    };
  }, []);

  return (
    <>
      <RowContainer>
        <InputContainer style={{ marginRight: '5px' }}>
          <Input
            name="name"
            type="text"
            placeholder="Nome*"
            defaultValue={defaults.name}
          />
        </InputContainer>
      </RowContainer>
      <RowContainer>
        <InputContainer
          style={{
            width: '50%',
            marginRight: '5px',
          }}
        >
          <Input
            mask="999.999.999-99"
            name="cpf"
            type="text"
            placeholder="CPF"
            defaultValue={defaults.cpf}
          />
        </InputContainer>
        <InputContainer
          style={{
            width: '50%',
            marginLeft: '5px',
            marginRight: '5px',
          }}
        >
          <Input
            mask="99-999-999/9999-99"
            name="cnpj"
            type="text"
            placeholder="CNPJ"
            defaultValue={defaults.cnpj}
          />
        </InputContainer>
      </RowContainer>
    </>
  );
}
