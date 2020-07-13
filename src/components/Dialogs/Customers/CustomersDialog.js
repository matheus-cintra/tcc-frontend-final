import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiClose, mdiTrashCan } from '@mdi/js';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import Input from '../../InputMask/Input';

import {
  Container,
  Toolbar,
  Title,
  Form,
  BottomActions,
  RowContainer,
  InputContainer,
} from './styles';

function CustomerDialog({ setOpen, current }) {
  const customerId = current._id;
  const formRef = useRef(null);

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome Obrigatório'),
  });

  /** ************************* PRINT FORM IN CONSOLE ************************* */
  const root = document.getElementById('root');
  root.addEventListener('dblclick', () => {
    if (formRef.current === null) return;
    const { getData } = formRef.current;
    console.warn('myForm > ', getData()); //eslint-disable-line
  });
  /** ************************************************************************* */

  const handleClose = () => {
    setOpen(open => !open);
  };

  async function handleSubmit(data) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const ds = {
        name: data.name,
        cpf: data.cpf,
        cnpj: data.cnpj,
        phone: data.contact.phone,
        email: data.contact.email,
        person: data.contact.person,
        description: data.description,
        address: data.address,
      };

      const result = customerId
        ? await api.put(`/api/v1/customers/${customerId}`, { ...ds })
        : await api.post('/api/v1/customers/', { ...ds });

      if (!result.data.success) {
        return toast.error('Eror ao atualizar cliente.');
      }

      toast.success('Cliente Atualizado.');

      handleClose();
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
        <Title>{customerId ? 'Editar Cliente' : 'Novo Cliente'}</Title>
        <Icon
          path={mdiClose}
          title="Close"
          size={1}
          color="#FFF"
          onClick={handleClose}
        />
      </Toolbar>
      {customerId ? (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <RowContainer>
              <InputContainer style={{ width: '200px', marginRight: '15px' }}>
                <Input
                  name="name"
                  type="text"
                  defaultValue={current.name}
                  placeholder="Nome*"
                />
              </InputContainer>
              <InputContainer>
                <Input
                  mask="999.999.999-99"
                  name="cpf"
                  type="text"
                  defaultValue={current.cpf}
                  placeholder="Cpf"
                />
                <InputContainer>
                  <Input
                    mask="99-999-999/9999-99"
                    name="cnpj"
                    type="text"
                    defaultValue={current.cnpj}
                    placeholder="Cnpj"
                  />
                </InputContainer>
                <InputContainer>
                  <Input
                    mask="99-99999-9999"
                    name="phone"
                    type="text"
                    defaultValue={current.contact.phone}
                    placeholder="Telefone"
                  />
                </InputContainer>
                <InputContainer>
                  <Input
                    name="email"
                    type="text"
                    defaultValue={current.contact.email}
                    placeholder="Email"
                  />
                </InputContainer>
                <InputContainer>
                  <Input
                    name="person"
                    type="text"
                    defaultValue={current.contact.person}
                    placeholder="Nome"
                  />
                </InputContainer>
                <InputContainer>
                  <Input
                    name="description"
                    type="text"
                    defaultValue={current.description}
                    placeholder="Descrição"
                  />
                </InputContainer>
                <InputContainer>
                  <Input
                    mask="99999-999"
                    name="address"
                    type="text"
                    defaultValue={current.address}
                    placeholder="Endereço"
                  />
                </InputContainer>
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <InputContainer style={{ marginRight: '10px' }}>
                <Input
                  name="description"
                  type="text"
                  defaultValue={current.description}
                  placeholder="Descrição"
                />
              </InputContainer>
            </RowContainer>
          </Form>
        </Container>
      ) : (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <RowContainer>
              <InputContainer style={{ marginRight: '15px' }}>
                <Input name="name" type="text" placeholder="Nome*" />
              </InputContainer>
              <InputContainer
                style={{
                  width: '300px',
                  marginLeft: '15px',
                  marginRight: '10px',
                }}
              >
                <Input
                  mask="999.999.999-99"
                  name="cpf"
                  type="text"
                  placeholder="CPF"
                />
              </InputContainer>
              <InputContainer
                style={{
                  width: '400px',
                  marginLeft: '15px',
                  marginRight: '10px',
                }}
              >
                <Input
                  mask="99-999-999/9999-99"
                  name="cnpj"
                  type="text"
                  placeholder="CNPJ"
                />
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <InputContainer
                style={{
                  width: '200px',
                  marginRight: '15px',
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
                  width: '200px',
                  marginLeft: '15px',
                  marginRight: '10px',
                }}
              >
                <Input name="email" type="text" placeholder="Email" />
              </InputContainer>
              <InputContainer
                style={{
                  width: '200px',
                  marginLeft: '15px',
                  marginRight: '10px',
                }}
              >
                <Input name="person" type="text" placeholder="Cliente" />
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <InputContainer
                style={{
                  marginRight: '15px',
                }}
              >
                <Input name="description" type="text" placeholder="Descrição" />
              </InputContainer>

              <InputContainer
                style={{
                  width: '200px',
                  marginLeft: '15px',
                  marginRight: '10px',
                }}
              >
                <Input
                  mask="99999-999"
                  name="address"
                  type="text"
                  placeholder="Endereço"
                />
              </InputContainer>
            </RowContainer>
          </Form>
        </Container>
      )}
      <BottomActions>
        <Icon
          path={mdiTrashCan}
          title="Remove"
          size={1.2}
          color="#333"
          onClick={handleClose}
        />
        <button type="submit" form="editForm">
          Salvar
        </button>
      </BottomActions>
    </>
  );
}

export default CustomerDialog;

CustomerDialog.propTypes = {
  setOpen: PropTypes.func.isRequired,
  current: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
