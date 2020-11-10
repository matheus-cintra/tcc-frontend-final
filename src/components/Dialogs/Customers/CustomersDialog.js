import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiClose, mdiTrashCan, mdiAccountSearch } from '@mdi/js';
import * as Yup from 'yup';
import { cpf as _cpfCheck, cnpj as _cnpjCheck } from 'cpf-cnpj-validator';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import Input from '../../InputMask/Input';
import Divider from '../../Divider';
import helpers from '../../../helpers/helper';
import Modal from '../../Modals';
import Asks from './Asks';
import FloatLabelInput from '../../FloatLabel/Input';
import { handleDispatchEvents } from './methods';

import {
  Container,
  Toolbar,
  Title,
  Form,
  BottomActions,
  RowContainer,
  SearchContainer,
  SearchButton,
  LoadingContainer,
  TextLoadingDocuments,
  LoadingScreen,
  FloatingLabelInputContainer,
  FloatingLabel,
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
  const [cepFound, setCepFound] = useState(false);

  const [inputActive, setInputActive] = useState({
    name: false,
    cnpj: false,
    phone: false,
    email: false,
    description: false,
    cep: false,
    address: false,
    number: false,
    neighborhood: false,
    additional: false,
    city: false,
    state: false,
  });

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
    setCepFound(false);
    const data = formRef.current.getData();
    if (!data.address.cep) return;
    setSearching(true);
    try {
      const result = await api.post(`/api/v1/getAddress/${data.address.cep}`);
      if (result.data.sucess) {
        const addressResult = result.data.data;
        setSearching(false);

        formRef.current.setData({
          address: {
            cep: addressResult.cep,
            address: addressResult.address,
            neighborhood: addressResult.neighborhood,
            city: addressResult.city,
            state: addressResult.state,
          },
        });
        setCepFound(true);
        setTimeout(() => handleDispatchEvents(undefined, addressResult), 50);
      }
    } catch (error) {
      setSearching(false);
      return toast.error(
        error.response ? error.response.data.data.message : error
      );
    }
  };

  async function handleSubmit(data) {
    setSubmitting(true);

    if (
      current &&
      current.address &&
      data.address &&
      data.address.cep !== current.address.cep &&
      !cepFound
    ) {
      await handleCepSearch();
      data = formRef.current.getData();
    }

    data.entityType = entityType;
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      if (data.cnpj) {
        data.cnpj = helpers.returnOnlyNumbers(data.cnpj);
      } else {
        data.cpf = helpers.returnOnlyNumbers(data.cpf);
      }

      const cpfCnpjIsValid = data.cnpj
        ? _cnpjCheck.isValid(data.cnpj)
        : _cpfCheck.isValid(data.cpf);

      if (!cpfCnpjIsValid) {
        setSubmitting(false);
        return toast.error('CPF ou CNPJ inválido');
      }

      const { cpf, cnpj } = data;
      if (customerId) {
        delete data.cpf;
        delete data.cnpj;
      }

      const ds = {
        $set: {
          ...data,
        },
        $unset: {},
      };

      if (cnpj) {
        ds.$set.cnpj = cnpj;
        ds.$set._idxCnpj = cnpj;
        ds.$unset.cpf = true;
        ds.$unset._idxCpf = true;
      }

      if (cpf) {
        ds.$set.cpf = cpf;
        ds.$set._idxCpf = cpf;
        ds.$unset.cnpj = true;
        ds.$unset._idxCnpj = true;
      }

      const result = customerId
        ? await api.put(`/api/v1/customers/${customerId}`, { ...ds })
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
      } else {
        return toast.error(error.response.data.data.message);
      }
    }
  }

  const handleCloseReturn = () => {
    handleClose();
  };

  const handleOpenAskDialog = () => {
    setAskOpen(asking => !asking);
  };

  const handleAskDialog = () => {
    return (
      <Asks
        setAskOpen={setAskOpen}
        customerId={customerId}
        handleClose={handleCloseReturn}
      />
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (customerId) {
        handleDispatchEvents(current, undefined);
      }
    }, 50);
  }, [current, customerId]);

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
        <>
          <LoadingContainer style={{ display: searching ? 'flex' : 'none' }}>
            <TextLoadingDocuments>Buscando Endereço</TextLoadingDocuments>
            <LoadingScreen />
          </LoadingContainer>
          <Container style={{ display: searching ? 'none' : 'flex' }}>
            <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
              <fieldset disabled={submitting}>
                <Divider>Dádos Básicos</Divider>
                <RowContainer>
                  <FloatingLabelInputContainer>
                    <FloatingLabel htmlFor="name" active={inputActive.name}>
                      Cliente*
                    </FloatingLabel>
                    <FloatLabelInput
                      id="name"
                      type="text"
                      onFocus={() =>
                        setInputActive({ ...inputActive, name: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({
                            ...inputActive,
                            name: false,
                          });
                        }
                      }}
                      defaultValue={current.name}
                      name="name"
                    />
                  </FloatingLabelInputContainer>
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
                    <FloatingLabelInputContainer style={{ width: '50%' }}>
                      <FloatingLabel
                        htmlFor="inputCpf"
                        active={inputActive.cpf}
                      >
                        CPF*
                      </FloatingLabel>
                      <Input
                        mask="999.999.999-99"
                        id="inputCpf"
                        name="cpf"
                        onFocus={() =>
                          setInputActive({ ...inputActive, cpf: true })
                        }
                        onBlur={e => {
                          if (e.target.value === '') {
                            setInputActive({ ...inputActive, cpf: false });
                          }
                        }}
                        type="text"
                        defaultValue={current.cpf}
                      />
                    </FloatingLabelInputContainer>
                  ) : (
                    <FloatingLabelInputContainer style={{ width: '50%' }}>
                      <FloatingLabel
                        htmlFor="inputCnpj"
                        active={inputActive.cnpj}
                      >
                        CNPJ*
                      </FloatingLabel>
                      <Input
                        mask="99.999.999/9999-99"
                        id="inputCnpj"
                        name="cnpj"
                        onFocus={() =>
                          setInputActive({ ...inputActive, cnpj: true })
                        }
                        onBlur={e => {
                          if (e.target.value === '') {
                            setInputActive({ ...inputActive, cnpj: false });
                          }
                        }}
                        type="text"
                        defaultValue={current.cnpj}
                      />
                    </FloatingLabelInputContainer>
                  )}
                </RowContainer>
                <RowContainer>
                  <FloatingLabelInputContainer style={{ width: '50%' }}>
                    <FloatingLabel
                      htmlFor="inputPhone"
                      active={inputActive.phone}
                    >
                      Telefone
                    </FloatingLabel>
                    <Input
                      mask="(99) 99999-9999"
                      id="inputPhone"
                      name="phone"
                      onFocus={() =>
                        setInputActive({ ...inputActive, phone: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({ ...inputActive, phone: false });
                        }
                      }}
                      type="text"
                      defaultValue={current.phone}
                    />
                  </FloatingLabelInputContainer>
                  <FloatingLabelInputContainer style={{ width: '50%' }}>
                    <FloatingLabel
                      htmlFor="inputEmail"
                      active={inputActive.email}
                    >
                      Email
                    </FloatingLabel>
                    <FloatLabelInput
                      id="inputEmail"
                      type="text"
                      onFocus={() =>
                        setInputActive({ ...inputActive, email: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({ ...inputActive, email: false });
                        }
                      }}
                      defaultValue={current.email}
                      name="email"
                      style={{ textTransform: 'lowercase' }}
                    />
                  </FloatingLabelInputContainer>
                </RowContainer>
                <RowContainer>
                  <FloatingLabelInputContainer>
                    <FloatingLabel
                      htmlFor="description"
                      active={inputActive.description}
                    >
                      Descrição
                    </FloatingLabel>
                    <FloatLabelInput
                      id="description"
                      type="text"
                      onFocus={() =>
                        setInputActive({ ...inputActive, description: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({
                            ...inputActive,
                            description: false,
                          });
                        }
                      }}
                      defaultValue={current.description}
                      name="description"
                    />
                  </FloatingLabelInputContainer>
                </RowContainer>

                <Divider>Endereço</Divider>

                <RowContainer>
                  <SearchContainer>
                    <FloatingLabelInputContainer>
                      <FloatingLabel htmlFor="cep" active={inputActive.cep}>
                        CEP
                      </FloatingLabel>
                      <FloatLabelInput
                        id="cep"
                        type="text"
                        onFocus={() =>
                          setInputActive({ ...inputActive, cep: true })
                        }
                        onBlur={e => {
                          if (e.target.value === '') {
                            setInputActive({ ...inputActive, cep: false });
                          }
                        }}
                        defaultValue={
                          current.address ? current.address.cep : ''
                        }
                        name="address.cep"
                      />
                    </FloatingLabelInputContainer>
                    {/* <InputContainer
                      style={{
                        width: '100%',
                        marginRight: '5px',
                      }}
                    >
                      <DefaultInput
                        name="address.cep"
                        type="text"
                        placeholder="CEP"
                        defaultValue={current.address && current.address.cep}
                      />
                    </InputContainer> */}
                    <SearchButton
                      onClick={handleCepSearch}
                      disabled={searching}
                    >
                      <Icon
                        path={mdiAccountSearch}
                        title="Buscar Cep"
                        size="30px"
                        color="#333"
                      />
                    </SearchButton>
                  </SearchContainer>

                  <FloatingLabelInputContainer>
                    <FloatingLabel
                      htmlFor="address"
                      active={inputActive.address}
                    >
                      Endereço
                    </FloatingLabel>
                    <FloatLabelInput
                      id="address"
                      type="text"
                      onFocus={() =>
                        setInputActive({ ...inputActive, address: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({ ...inputActive, address: false });
                        }
                      }}
                      defaultValue={
                        current.address ? current.address.address : ''
                      }
                      name="address.address"
                      disabled
                      style={{ textTransform: 'capitalize' }}
                    />
                  </FloatingLabelInputContainer>

                  {/* <InputContainer
                    style={{
                      width: '65%',
                      marginLeft: '5px',
                      marginRight: '5px',
                    }}
                  >
                    <DefaultInput
                      name="address.address"
                      defaultValue={current.address && current.address.address}
                      type="text"
                      placeholder="Rua"
                    />
                  </InputContainer> */}
                </RowContainer>
                <RowContainer>
                  <FloatingLabelInputContainer>
                    <FloatingLabel htmlFor="number" active={inputActive.number}>
                      Número
                    </FloatingLabel>
                    <FloatLabelInput
                      id="number"
                      type="text"
                      onFocus={() =>
                        setInputActive({ ...inputActive, number: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({ ...inputActive, number: false });
                        }
                      }}
                      defaultValue={
                        current.address ? current.address.number : ''
                      }
                      name="address.number"
                    />
                  </FloatingLabelInputContainer>

                  {/* <InputContainer
                    style={{
                      width: '15%',
                      marginRight: '5px',
                    }}
                  >
                    <DefaultInput
                      maxLength="5"
                      name="address.number"
                      type="text"
                      placeholder="Número"
                      defaultValue={current.address && current.address.number}
                    />
                  </InputContainer> */}

                  <FloatingLabelInputContainer>
                    <FloatingLabel
                      htmlFor="address"
                      active={inputActive.neighborhood}
                    >
                      Bairro
                    </FloatingLabel>
                    <FloatLabelInput
                      id="neighborhood"
                      type="text"
                      onFocus={() =>
                        setInputActive({ ...inputActive, neighborhood: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({
                            ...inputActive,
                            neighborhood: false,
                          });
                        }
                      }}
                      defaultValue={
                        current.address ? current.address.neighborhood : ''
                      }
                      name="address.neighborhood"
                      style={{ textTransform: 'capitalize' }}
                      disabled
                    />
                  </FloatingLabelInputContainer>

                  {/* <InputContainer
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
                      defaultValue={
                        current.address && current.address.neighborhood
                      }
                    />
                  </InputContainer> */}

                  <FloatingLabelInputContainer>
                    <FloatingLabel
                      htmlFor="additional"
                      active={inputActive.additional}
                    >
                      Complemento
                    </FloatingLabel>
                    <FloatLabelInput
                      id="additional"
                      type="text"
                      onFocus={() =>
                        setInputActive({ ...inputActive, additional: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({ ...inputActive, additional: false });
                        }
                      }}
                      defaultValue={
                        current.address ? current.address.additional : ''
                      }
                      name="address.additional"
                      style={{ textTransform: 'capitalize' }}
                    />
                  </FloatingLabelInputContainer>
                  {/* <InputContainer
                    style={{
                      width: '42%',
                      marginRight: '5px',
                      marginLeft: '5px',
                    }}
                  >
                    <DefaultInput
                      name="address.additional"
                      type="text"
                      placeholder="Complemento"
                      defaultValue={
                        current.address && current.address.additional
                      }
                    />
                  </InputContainer> */}
                </RowContainer>
                <RowContainer>
                  <FloatingLabelInputContainer>
                    <FloatingLabel htmlFor="city" active={inputActive.city}>
                      Cidade
                    </FloatingLabel>
                    <FloatLabelInput
                      id="city"
                      type="text"
                      onFocus={() =>
                        setInputActive({ ...inputActive, city: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({ ...inputActive, city: false });
                        }
                      }}
                      defaultValue={current.address ? current.address.city : ''}
                      name="address.city"
                      style={{ textTransform: 'capitalize' }}
                      disabled
                    />
                  </FloatingLabelInputContainer>
                  {/* <InputContainer
                    style={{
                      width: '50%',
                      marginRight: '5px',
                    }}
                  >
                    <DefaultInput
                      name="address.city"
                      type="text"
                      placeholder="Cidade"
                      defaultValue={current.address && current.address.city}
                    />
                  </InputContainer> */}
                  <FloatingLabelInputContainer>
                    <FloatingLabel htmlFor="state" active={inputActive.state}>
                      Estado
                    </FloatingLabel>
                    <FloatLabelInput
                      id="state"
                      type="text"
                      onFocus={() =>
                        setInputActive({ ...inputActive, state: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({ ...inputActive, state: false });
                        }
                      }}
                      defaultValue={
                        current.address ? current.address.state : ''
                      }
                      name="address.state"
                      disabled
                    />
                  </FloatingLabelInputContainer>
                  {/* <InputContainer
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
                      defaultValue={current.address && current.address.state}
                    />
                  </InputContainer> */}
                </RowContainer>
              </fieldset>
            </Form>
          </Container>
        </>
      ) : (
        <>
          <LoadingContainer style={{ display: searching ? 'flex' : 'none' }}>
            <TextLoadingDocuments>
              Carregando Dados da Empresas
            </TextLoadingDocuments>
            <LoadingScreen />
          </LoadingContainer>
          <Container style={{ display: searching ? 'none' : 'flex' }}>
            <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
              <Divider>Dádos Básicos</Divider>
              <RowContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel htmlFor="name" active={inputActive.name}>
                    Cliente*
                  </FloatingLabel>
                  <FloatLabelInput
                    id="name"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, name: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          name: false,
                        });
                      }
                    }}
                    name="name"
                  />
                </FloatingLabelInputContainer>
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
                  <FloatingLabelInputContainer style={{ width: '50%' }}>
                    <FloatingLabel htmlFor="inputCpf" active={inputActive.cpf}>
                      CPF*
                    </FloatingLabel>
                    <Input
                      mask="999.999.999-99"
                      id="inputCpf"
                      name="cpf"
                      onFocus={() =>
                        setInputActive({ ...inputActive, cpf: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({ ...inputActive, cpf: false });
                        }
                      }}
                      type="text"
                    />
                  </FloatingLabelInputContainer>
                ) : (
                  <FloatingLabelInputContainer style={{ width: '50%' }}>
                    <FloatingLabel
                      htmlFor="inputCnpj"
                      active={inputActive.cnpj}
                    >
                      CNPJ*
                    </FloatingLabel>
                    <Input
                      mask="99.999.999/9999-99"
                      id="inputCnpj"
                      name="cnpj"
                      onFocus={() =>
                        setInputActive({ ...inputActive, cnpj: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({ ...inputActive, cnpj: false });
                        }
                      }}
                      type="text"
                    />
                  </FloatingLabelInputContainer>
                )}
              </RowContainer>
              <RowContainer>
                <FloatingLabelInputContainer style={{ width: '50%' }}>
                  <FloatingLabel
                    htmlFor="inputPhone"
                    active={inputActive.phone}
                  >
                    Telefone
                  </FloatingLabel>
                  <Input
                    mask="(99) 99999-9999"
                    id="inputPhone"
                    name="phone"
                    onFocus={() =>
                      setInputActive({ ...inputActive, phone: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, phone: false });
                      }
                    }}
                    type="text"
                  />
                </FloatingLabelInputContainer>
                <FloatingLabelInputContainer style={{ width: '50%' }}>
                  <FloatingLabel
                    htmlFor="inputEmail"
                    active={inputActive.email}
                  >
                    Email
                  </FloatingLabel>
                  <FloatLabelInput
                    id="inputEmail"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, email: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, email: false });
                      }
                    }}
                    name="email"
                    style={{ textTransform: 'lowercase' }}
                  />
                </FloatingLabelInputContainer>
              </RowContainer>
              <RowContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="description"
                    active={inputActive.description}
                  >
                    Descrição
                  </FloatingLabel>
                  <FloatLabelInput
                    id="description"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, description: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          description: false,
                        });
                      }
                    }}
                    name="description"
                  />
                </FloatingLabelInputContainer>
              </RowContainer>

              <Divider>Endereço</Divider>

              <RowContainer>
                <SearchContainer>
                  <FloatingLabelInputContainer>
                    <FloatingLabel htmlFor="cep" active={inputActive.cep}>
                      CEP
                    </FloatingLabel>
                    <FloatLabelInput
                      id="cep"
                      type="text"
                      onFocus={() =>
                        setInputActive({ ...inputActive, cep: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({ ...inputActive, cep: false });
                        }
                      }}
                      name="address.cep"
                    />
                  </FloatingLabelInputContainer>
                  <SearchButton onClick={handleCepSearch} disabled={searching}>
                    <Icon
                      path={mdiAccountSearch}
                      title="Buscar Cep"
                      size="30px"
                      color="#333"
                    />
                  </SearchButton>
                </SearchContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel htmlFor="address" active={inputActive.address}>
                    Endereço
                  </FloatingLabel>
                  <FloatLabelInput
                    id="address"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, address: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, address: false });
                      }
                    }}
                    name="address.address"
                    disabled
                    style={{ textTransform: 'capitalize' }}
                  />
                </FloatingLabelInputContainer>
              </RowContainer>
              <RowContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel htmlFor="number" active={inputActive.number}>
                    Número
                  </FloatingLabel>
                  <FloatLabelInput
                    id="number"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, number: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, number: false });
                      }
                    }}
                    name="address.number"
                  />
                </FloatingLabelInputContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="address"
                    active={inputActive.neighborhood}
                  >
                    Bairro
                  </FloatingLabel>
                  <FloatLabelInput
                    id="neighborhood"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, neighborhood: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          neighborhood: false,
                        });
                      }
                    }}
                    name="address.neighborhood"
                    style={{ textTransform: 'capitalize' }}
                    disabled
                  />
                </FloatingLabelInputContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="additional"
                    active={inputActive.additional}
                  >
                    Complemento
                  </FloatingLabel>
                  <FloatLabelInput
                    id="additional"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, additional: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, additional: false });
                      }
                    }}
                    name="address.additional"
                    style={{ textTransform: 'capitalize' }}
                  />
                </FloatingLabelInputContainer>
              </RowContainer>
              <RowContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel htmlFor="city" active={inputActive.city}>
                    Cidade
                  </FloatingLabel>
                  <FloatLabelInput
                    id="city"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, city: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, city: false });
                      }
                    }}
                    name="address.city"
                    style={{ textTransform: 'capitalize' }}
                    disabled
                  />
                </FloatingLabelInputContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel htmlFor="state" active={inputActive.state}>
                    Estado
                  </FloatingLabel>
                  <FloatLabelInput
                    id="state"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, state: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, state: false });
                      }
                    }}
                    name="address.state"
                    disabled
                  />
                </FloatingLabelInputContainer>
              </RowContainer>
            </Form>
          </Container>
        </>
      )}
      <BottomActions>
        {customerId ? (
          <Icon
            path={mdiTrashCan}
            title="Remove"
            size={1.2}
            color="#333"
            onClick={handleOpenAskDialog}
          />
        ) : (
          <p />
        )}
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
