import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiClose, mdiTrashCan, mdiAccountSearch } from '@mdi/js';
import * as Yup from 'yup';
import { cpf as _cpfCheck, cnpj as _cnpjCheck } from 'cpf-cnpj-validator';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import Input from '../../InputMask/Input';
import DefaultInput from '../../DefaultInput/Input';
import Divider from '../../Divider';
import helpers from '../../../helpers/helper';
import Modal from '../../Modals';
import Asks from '../Asks';

import {
  Container,
  Toolbar,
  Title,
  Form,
  BottomActions,
  RowContainer,
  InputContainer,
  SearchContainer,
  SearchButton,
} from './styles';

function CustomerDialog({ setOpen, current }) {
  const customerId = current._id;
  const formRef = useRef(null);
  const [entityType, setEntityType] = useState(
    current.entityType ? current.entityType : '1'
  );
  const [searching, setSearching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [askOpen, setAskOpen] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome Obrigatório'),
    cpf: Yup.string().min(14, 'CPF Inválido').max(14, 'CPF Inválido'),
    cnpj: Yup.string().min(18, 'CNPJ Inválido').max(18, 'CNPJ Inválido'),
    phone: Yup.string(),
    email: Yup.string().email('Email inválido'),
    description: Yup.string(),

    cep: Yup.string().min(8, 'Cep Inválido').max(8, 'Cép Inválido'),
    address: Yup.object().shape({
      address: Yup.string(),
      additional: Yup.string(),
      cep: Yup.string(),
      city: Yup.string(),
      neighborhood: Yup.string(),
      number: Yup.string(),
      state: Yup.string(),
    }),
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
    if (submitting || searching) return;
    setOpen(open => !open);
  };

  const handleOptionChange = type => {
    setEntityType(type);
  };

  const handleCepSearch = async () => {
    const data = formRef.current.getData();
    if (!data.address.cep) return;
    setSearching(true);
    try {
      const result = await api.post(`/api/v1/getAddress/${data.address.cep}`);
      if (result.data.sucess) {
        const addressResult = result.data.data;
        console.warn('address > ', addressResult);
        formRef.current.setFieldValue('address.cep', addressResult.cep);
        formRef.current.setFieldValue('address.address', addressResult.address);
        formRef.current.setFieldValue('address.number', addressResult.number);
        formRef.current.setFieldValue(
          'address.additional',
          addressResult.additional
        );
        formRef.current.setFieldValue('address.city', addressResult.city);
        formRef.current.setFieldValue('address.state', addressResult.state);
        formRef.current.setFieldValue(
          'address.neighborhood',
          addressResult.neighborhood
        );
      }
      setSearching(false);
    } catch (error) {
      setSearching(false);
      console.warn('Error > ', error);
      return toast.error(error.response.data.data.message);
    }
  };

  async function handleSubmit(data) {
    setSubmitting(true);
    let _cnpj;
    let _cpf;
    data.entityType = entityType;
    console.warn('oba', data);
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      if (data.cnpj) {
        _cnpj = helpers.returnOnlyNumbers(data.cnpj);
      } else {
        _cpf = helpers.returnOnlyNumbers(data.cpf);
      }

      const cpfCnpjIsValid = _cnpj
        ? _cnpjCheck.isValid(_cnpj)
        : _cpfCheck.isValid(_cpf);

      if (!cpfCnpjIsValid) {
        setSubmitting(false);
        return toast.error('CPF ou CNPJ inválido');
      }

      const result = customerId
        ? await api.put(`/api/v1/customers/${customerId}`, { ...data })
        : await api.post('/api/v1/customers/', { ...data });

      if (!result.data.success) {
        return toast.error('Eror ao atualizar cliente.');
      }

      if (customerId) {
        toast.success('Cliente Atualizado.');
      } else {
        toast.success('Cliente Criado.');
      }

      handleClose();
    } catch (error) {
      setSubmitting(false);
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  const handleOpenAskDialog = () => {
    console.warn('ta no hadle open ask');
    setAskOpen(asking => !asking);
  };

  const handleAskDialog = () => {
    return <Asks setAskOpen={setAskOpen} customerId={customerId} />;
  };

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
          style={{ cursor: searching || submitting ? 'default' : 'pointer' }}
        />
      </Toolbar>
      {customerId ? (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <Divider>Dádos Básicos</Divider>
            <RowContainer>
              <InputContainer style={{ marginRight: '5px' }}>
                <DefaultInput
                  name="name"
                  type="text"
                  placeholder="Nome*"
                  defaultValue={current.name}
                  required
                />
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <label>
                <input
                  type="radio"
                  value="1"
                  name="entityType"
                  defaultChecked={current.entityType === '1'}
                  onChange={() => handleOptionChange('1')}
                />
                Pessoa Física
              </label>
              <label>
                <input
                  type="radio"
                  name="entityType"
                  value="2"
                  defaultChecked={current.entityType === '2'}
                  onChange={() => handleOptionChange('2')}
                />
                Pessoa Jurídica
              </label>
              {entityType === '1' ? (
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
                  />
                </InputContainer>
              ) : (
                <InputContainer
                  style={{
                    width: '50%',
                    marginRight: '5px',
                  }}
                >
                  <Input
                    mask="99.999.999/9999-99"
                    defaultValue={current.cnpj}
                    name="cnpj"
                    type="text"
                    placeholder="CNPJ"
                  />
                </InputContainer>
              )}
            </RowContainer>
            <RowContainer>
              <InputContainer
                style={{
                  width: '50%',
                }}
              >
                <Input
                  mask="99-99999-9999"
                  defaultValue={current.phone}
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
                <DefaultInput
                  name="email"
                  defaultValue={current.email}
                  type="text"
                  placeholder="Email"
                />
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <InputContainer
                style={{
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="description"
                  type="text"
                  placeholder="Descrição"
                  defaultValue={current.description}
                />
              </InputContainer>
            </RowContainer>

            <Divider>Endereço</Divider>

            <RowContainer>
              <SearchContainer>
                <InputContainer
                  style={{
                    width: '100%',
                    marginRight: '5px',
                  }}
                >
                  <DefaultInput
                    name="address.cep"
                    type="text"
                    placeholder="CEP"
                    defaultValue={current.address.cep}
                  />
                </InputContainer>
                <SearchButton onClick={handleCepSearch}>
                  <Icon
                    path={mdiAccountSearch}
                    title="Buscar Cep"
                    size="30px"
                    color="#333"
                  />
                </SearchButton>
              </SearchContainer>
              <InputContainer
                style={{
                  width: '65%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="address.address"
                  defaultValue={current.address.address}
                  type="text"
                  placeholder="Rua"
                />
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <InputContainer
                style={{
                  width: '15%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  maxLength="5"
                  name="address.number"
                  type="text"
                  placeholder="Número"
                  defaultValue={current.address.number}
                />
              </InputContainer>
              <InputContainer
                style={{
                  width: '42%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="address.neighborhood"
                  type="text"
                  placeholder="Bairro"
                  defaultValue={current.address.neighborhood}
                />
              </InputContainer>
              <InputContainer
                style={{
                  width: '42%',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="address.additional"
                  type="text"
                  placeholder="Complemento"
                  defaultValue={current.address.additional}
                />
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <InputContainer
                style={{
                  width: '50%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="address.city"
                  type="text"
                  placeholder="Cidade"
                  defaultValue={current.address.city}
                />
              </InputContainer>
              <InputContainer
                style={{
                  width: '50%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="address.state"
                  type="text"
                  placeholder="Estado"
                  defaultValue={current.address.state}
                />
              </InputContainer>
            </RowContainer>
          </Form>
        </Container>
      ) : (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <Divider>Dádos Básicos</Divider>
            <RowContainer>
              <InputContainer style={{ marginRight: '5px' }}>
                <DefaultInput name="name" type="text" placeholder="Nome*" />
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <label>
                <input
                  type="radio"
                  value="1"
                  checked={entityType === '1'}
                  onChange={() => handleOptionChange('1')}
                />
                Pessoa Física
              </label>
              <label>
                <input
                  type="radio"
                  value="2"
                  checked={entityType === '2'}
                  onChange={() => handleOptionChange('2')}
                />
                Pessoa Jurídica
              </label>
              {entityType === '1' ? (
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
                  />
                </InputContainer>
              ) : (
                <InputContainer
                  style={{
                    width: '50%',
                    marginRight: '5px',
                  }}
                >
                  <Input
                    mask="99.999.999/9999-99"
                    name="cnpj"
                    type="text"
                    placeholder="CNPJ"
                  />
                </InputContainer>
              )}
            </RowContainer>
            <RowContainer>
              <InputContainer
                style={{
                  width: '50%',
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
                <DefaultInput name="email" type="text" placeholder="Email" />
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <InputContainer
                style={{
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="description"
                  type="text"
                  placeholder="Descrição"
                />
              </InputContainer>
            </RowContainer>

            <Divider>Endereço</Divider>

            <RowContainer>
              <SearchContainer>
                <InputContainer
                  style={{
                    width: '100%',
                    marginRight: '5px',
                    marginLeft: '5px',
                  }}
                >
                  <DefaultInput
                    name="address.cep"
                    type="text"
                    placeholder="CEP"
                  />
                </InputContainer>
                <SearchButton onClick={handleCepSearch} disabled={searching}>
                  <Icon
                    path={mdiAccountSearch}
                    title="Buscar Cep"
                    size="30px"
                    color={searching ? '#ccc' : '#000'}
                  />
                </SearchButton>
              </SearchContainer>
              <InputContainer
                style={{
                  width: '65%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="address.address"
                  type="text"
                  placeholder="Rua"
                />
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <InputContainer
                style={{
                  width: '15%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  maxLength="5"
                  name="address.number"
                  type="text"
                  placeholder="Número"
                />
              </InputContainer>
              <InputContainer
                style={{
                  width: '42%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="address.neighborhood"
                  type="text"
                  placeholder="Bairro"
                />
              </InputContainer>
              <InputContainer
                style={{
                  width: '42%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="address.additional"
                  type="text"
                  placeholder="Complemento"
                />
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <InputContainer
                style={{
                  width: '50%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="address.city"
                  type="text"
                  placeholder="Cidade"
                />
              </InputContainer>
              <InputContainer
                style={{
                  width: '50%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <DefaultInput
                  name="address.state"
                  type="text"
                  placeholder="Estado"
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
          onClick={handleOpenAskDialog}
        />
        <button
          type="submit"
          form="editForm"
          disabled={searching || submitting}
          style={{
            cursor: searching || submitting ? 'default' : 'pointer',
            background: searching || submitting ? '#909090' : '#333',
          }}
        >
          Salvar
        </button>
      </BottomActions>

      <Modal open={askOpen} setOpen={setOpen}>
        <div>{handleAskDialog()}</div>
      </Modal>
    </>
  );
}

export default CustomerDialog;

CustomerDialog.propTypes = {
  setOpen: PropTypes.func.isRequired,
  current: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
