import React, { useRef, useState, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiAccountSearch } from '@mdi/js';
import * as Yup from 'yup';
import { getCompanyInfo } from './methods';

import {
  Toolbar,
  ToolbarTitle,
  Container,
  Row,
  Form,
  SearchContainer,
  SubmitButton,
  SearchButton,
} from './styles';

import DefaultInput from '../../components/DefaultInput/Input';
import Input from '../../components/Form/Input';

import { validateCompany } from '../../Schemas/globalSchemas';

function MyCompany() {
  const formRef = useRef(null);
  const [working, setWorking] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});

  const getCompany = async () => {
    const company = await getCompanyInfo();
    setCompanyInfo(company);
  };

  useEffect(() => {
    if (working) return;
    setWorking(true);
    getCompany();
  }, []);

  /** ************************* PRINT FORM IN CONSOLE ************************* */
  const root = document.getElementById('root');
  root.addEventListener('dblclick', () => {
    console.warn('myForm > ', companyInfo); //eslint-disable-line
  });
  /** ************************************************************************* */

  async function handleSubmit(data) {
    try {
      await validateCompany(data);

      console.warn('Passou > ', data);
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
      <Toolbar>
        <ToolbarTitle>Minha Empresa</ToolbarTitle>
      </Toolbar>
      <Container>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Row>
            <DefaultInput
              width="100"
              name="companyName"
              type="text"
              placeholder="Razão Social"
              defaultValue={companyInfo.companyName}
              disabled
            />
            <DefaultInput
              name="cnpj"
              type="text"
              placeholder="Seu CNPJ"
              defaultValue={companyInfo._cnpj}
              disabled
            />
          </Row>
          <Row>
            <DefaultInput
              name="fantasyName"
              type="text"
              placeholder="Nome Fantasia"
              defaultValue={companyInfo.fantasyName}
            />
          </Row>
          <Row>
            <DefaultInput name="email" type="text" placeholder="E-mail" />
            <Input
              mask="(99) 99999-9999"
              name="phone"
              type="text"
              placeholder="Seu telefone"
            />
          </Row>
          <Row>
            <SearchContainer>
              <DefaultInput
                width="30"
                name="zipCode"
                type="text"
                placeholder="Cep"
              />
              <SearchButton>
                <Icon
                  path={mdiAccountSearch}
                  title="Buscar Cep"
                  size="30px"
                  color="#333"
                />
              </SearchButton>
            </SearchContainer>
            <DefaultInput name="street" type="text" placeholder="Endereço" />
            <DefaultInput name="number" type="text" placeholder="Número" />
          </Row>
          <Row>
            <DefaultInput
              name="additional"
              type="text"
              placeholder="Complemento"
            />
            <DefaultInput name="city" type="text" placeholder="Cidade" />
            <DefaultInput name="state" type="text" placeholder="Estado" />
          </Row>
          <Row>
            <p />
            <SubmitButton>Salvar</SubmitButton>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default MyCompany;
