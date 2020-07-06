import React, { useRef, useState, useEffect } from 'react';
import { getCompanyInfo } from './methods';

import {
  Toolbar,
  ToolbarTitle,
  Container,
  Row,
  Form,
  Divider,
  SubmitButton,
} from './styles';
import DefaultInput from '../../components/DefaultInput/Input';
import Input from '../../components/Form/Input';

function MyCompany() {
  const formRef = useRef(null);
  const [working, setWorking] = useState(false);
  const [companyInfo, setCompanyInfo] = useState([]);

  const getCompany = async () => {
    const company = await getCompanyInfo();
    setCompanyInfo([company]);
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

  return (
    <>
      <Toolbar>
        <ToolbarTitle>Minha Empresa</ToolbarTitle>
      </Toolbar>
      <Container>
        <Form ref={formRef}>
          <Row>
            <DefaultInput
              name="companyName"
              type="text"
              placeholder="Razão Social"
              defaultValue={companyInfo.companyName}
              disabled
            />
            <Input
              mask="99-999-999/9999-99"
              name="cnpj"
              type="name"
              placeholder="Seu CNPJ"
              disabled
            />
          </Row>
          <Row>
            <DefaultInput
              name="fantasyName"
              type="text"
              placeholder="Nome Fantasia"
            />
          </Row>
          <Row>
            <DefaultInput
              name="contact.email"
              type="text"
              placeholder="E-mail"
            />
            <DefaultInput
              name="contact.phone"
              type="text"
              placeholder="Telefone"
            />
          </Row>
          <Row>
            <DefaultInput
              name="address.street"
              type="text"
              placeholder="Endereço"
            />
            <DefaultInput
              name="address.number"
              type="text"
              placeholder="Número"
            />
          </Row>
          <Row>
            <DefaultInput
              name="address.additional"
              type="text"
              placeholder="Complemento"
            />
            <DefaultInput
              name="address.city"
              type="text"
              placeholder="Cidade"
            />
            <DefaultInput
              name="address.state"
              type="text"
              placeholder="Estado"
            />
          </Row>
          <Row>
            <Divider />
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
