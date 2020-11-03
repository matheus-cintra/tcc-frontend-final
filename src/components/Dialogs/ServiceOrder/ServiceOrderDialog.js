import React, { useRef, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Icon from '@mdi/react';
import { mdiClose, mdiTrashCan } from '@mdi/js';
import history from '../../../services/history';
import Input from '../../InputMask/Input';
import Divider from '../../Divider';
import Modal from '../../Modals';
import Asks from './Asks';
import FloatLabelInput from '../../FloatLabel/Input';
import TextAreaInput from '../../InputTextArea/Input';
import helper from '../../../helpers/helper';

import {
  clearSuggestions,
  autocompleteChange,
  filterArray,
  selectSuggestion,
  submit,
} from './methods';

import {
  Container,
  Toolbar,
  Title,
  Form,
  BottomActions,
  RowContainer,
  InputContainer,
  AutoCompleteResult,
  AutocompleteContainer,
  Autocomplete,
  NoAutocompleteSuggestion,
  FloatingLabelInputContainer,
  FloatingLabel,
  // FloatLabelInput,
} from './styles';

function ServiceOrderDialog({ setOpen, current, customers, services }) {
  const serviceOrderId = current._id;
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [inputCustomer, setCustomerInput] = useState('');
  const [inputService, setServiceInput] = useState('');
  const [autocompleteServices, setAutocompleteServices] = useState([]);
  const [autocompleteCustomers, setAutocompleteCustomers] = useState([]);
  const [noCustomerSuggestions, setNoCustomerSuggestions] = useState(false);
  const [noServiceSuggestions, setNoServiceSuggestions] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedService, setSelectedService] = useState({});
  const [paid, setPaid] = useState(false);
  const [hasPaymentValue, setHasPaymentValue] = useState(false);
  const [inputActive, setInputActive] = useState({
    customer: false,
    contact: false,
    service: false,
    basePrice: false,
    finalPrice: false,
    dateService: false,
    description: false,
    paymentMethod: false,
    paymentDate: false,
    paymentValue: false,
  });

  /** ************************* PRINT FORM IN CONSOLE ************************* */
  const root = document.getElementById('root');
  root.addEventListener('dblclick', () => {
    if (formRef.current === null) return;
    const { getData } = formRef.current;
    console.warn('myForm > ', getData()); //eslint-disable-line
  });
  /** ************************************************************************* */

  useCallback(() => {
    setTimeout(() => {
      const paymentDateElement = document.getElementById('inputPaymentDate');
      const event = new Event('focus');
      if (current.paymentDate) {
        paymentDateElement.dispatchEvent(event);
      }
    }, 30);
  }, [current.paymentDate]);

  useEffect(() => {
    const elCustomer = document.getElementById('autocompleteCustomerId');
    elCustomer.addEventListener('keyup', e => {
      if (e.key === 'Backspace') {
        if (e.target.value === '') {
          setNoCustomerSuggestions(false);
        }
        setCustomerInput(e.target.value);
      }
      if (e.key === 'Delete') {
        if (e.target.value === '') {
          setNoCustomerSuggestions(false);
        }
        setCustomerInput(e.target.value);
      }
    });

    const elService = document.getElementById('autocompleteServiceId');
    elService.addEventListener('keyup', e => {
      if (e.key === 'Backspace') {
        if (e.target.value === '') {
          setNoServiceSuggestions(false);
        }
        setServiceInput(e.target.value);
      }
      if (e.key === 'Delete') {
        if (e.target.value === '') {
          setNoServiceSuggestions(false);
        }
        setServiceInput(e.target.value);
      }
    });
  }, []);

  const handleClose = () => {
    if (submitting) return;
    setOpen(open => !open);
  };

  const handleSubmit = async data =>
    submit(
      {
        data,
        customer: selectedCustomer,
        service: selectedService,
        paid,
      },
      setSubmitting,
      formRef,
      serviceOrderId,
      handleClose
    );

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
        serviceOrderId={serviceOrderId}
        handleClose={handleCloseReturn}
      />
    );
  };

  const getSuggestionValue = suggestion => suggestion.name;

  const getServicesValue = service => service.name;

  const renderSuggestion = suggestion => (
    <AutocompleteContainer>
      <AutoCompleteResult>{suggestion.name}</AutoCompleteResult>
    </AutocompleteContainer>
  );

  const clearCustomerRequest = () => clearSuggestions(setAutocompleteCustomers);
  const clearServiceRequest = () => clearSuggestions(setAutocompleteServices);

  const handleAutocompleteCustomerChange = (e, { newValue }) => {
    autocompleteChange(newValue, setSelectedCustomer, setCustomerInput);
  };

  const handleAutocompleteServiceChange = (e, { newValue }) => {
    autocompleteChange(newValue, setSelectedService, setServiceInput);
  };

  const filterSuggestions = (value, type) => {
    switch (type) {
      case 'customer':
        if (value !== selectedCustomer.name) {
          setSelectedCustomer({});
        }
        filterArray(
          value,
          customers,
          selectedCustomer,
          setNoCustomerSuggestions,
          setAutocompleteCustomers
        );
        break;

      case 'service':
        if (value !== selectedService.name) {
          setSelectedService({});
        }

        filterArray(
          value,
          services,
          selectedService,
          setNoServiceSuggestions,
          setAutocompleteServices
        );
        break;

      default:
        break;
    }
  };

  const handleOnFocus = el => {
    setInputActive({ ...inputActive, [el]: true });
  };

  const handleBlur = (e, el) => {
    if (e.target.value === '') {
      setInputActive({ ...inputActive, [el]: false });
    }
  };

  const customerInputProps = {
    value: inputCustomer,
    onChange: handleAutocompleteCustomerChange,
    name: 'autocompleteCustomer',
    id: 'autocompleteCustomerId',
    onBlur: e => handleBlur(e, 'customer'),
    onFocus: () => handleOnFocus('customer'),
    disabled: !!serviceOrderId,
  };

  const serviceInputProps = {
    value: inputService,
    onChange: handleAutocompleteServiceChange,
    name: 'autocompleteService',
    id: 'autocompleteServiceId',
    onBlur: e => handleBlur(e, 'service'),
    onFocus: () => handleOnFocus('service'),
    disabled: !!serviceOrderId,
  };

  const handleSuggestionSelect = (suggestion, type) => {
    switch (type) {
      case 'customer': {
        selectSuggestion(
          suggestion,
          setSelectedCustomer,
          formRef,
          'customerName'
        );

        setTimeout(() => {
          const inputElement = document.getElementById('inputContact');
          const event = new Event('focus');
          inputElement.dispatchEvent(event);
        }, 50);
        break;
      }

      case 'service': {
        selectSuggestion(
          suggestion,
          setSelectedService,
          formRef,
          'serviceName'
        );

        setTimeout(() => {
          const inputElement = document.getElementById('basePriceId');
          const dateElement = document.getElementById('inputDateService');
          const event = new Event('focus');
          inputElement.dispatchEvent(event);
          dateElement.dispatchEvent(event);
        }, 30);
        break;
      }

      default:
        break;
    }
  };

  function handleDispatchEvents() {
    const event = new Event('focus');
    const contactEl = document.getElementById('inputContact');
    contactEl.dispatchEvent(event);

    const basePriceEl = document.getElementById('basePriceId');
    basePriceEl.dispatchEvent(event);

    const finalPrice = document.getElementById('finalPriceId');
    finalPrice.dispatchEvent(event);

    const serviceDateEl = document.getElementById('inputDateService');
    serviceDateEl.dispatchEvent(event);

    const inputDescriptionEl = document.getElementById('inputDescription');
    inputDescriptionEl.dispatchEvent(event);

    const inputPaymentMethodEl = document.getElementById('inputPaymentMethod');
    if (current.paymentMethod && current.paymentMethod !== '')
      inputPaymentMethodEl.dispatchEvent(event);

    const inputPaymentDateEl = document.getElementById('inputPaymentDate');
    if (current.paymentDate && current.paymentDate !== '')
      inputPaymentDateEl.dispatchEvent(event);

    const inputPaymentValueEl = document.getElementById('inputPaymentValue');
    if (current.paymentValue && current.paymentValue !== '')
      inputPaymentValueEl.dispatchEvent(event);
  }

  useEffect(() => {
    setTimeout(() => {
      if (serviceOrderId) {
        setInputActive({ ...inputActive, customer: true, service: true });
        setSelectedCustomer(current.customer[0]);
        setSelectedService(current.service[0]);
        setCustomerInput(current.customer[0].name);
        setServiceInput(current.service[0].name);
        handleDispatchEvents();
      }
    }, 50);
  }, []); //eslint-disable-line

  const handleNoCustomer = () => history.push('/customer');

  const handleNoService = () => history.push('/service');

  const handleHasPaymentValue = () => {
    setTimeout(() => {
      if (formRef.current === null) return;
      const data = formRef.current.getData();
      return data.paymentValue !== '';
    }, 200);
  };

  return (
    <>
      <Toolbar>
        <Title>
          {serviceOrderId ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
        </Title>
        <Icon
          path={mdiClose}
          title="Close"
          size={1}
          color="#FFF"
          onClick={handleClose}
          style={{ cursor: submitting ? 'default' : 'pointer' }}
        />
      </Toolbar>
      {serviceOrderId ? (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <fieldset disabled={submitting || current.paid}>
              <Divider>Dados da Ordem de Serviço</Divider>
              <RowContainer>
                <InputContainer style={{ marginRight: '5px', display: 'flex' }}>
                  <FloatingLabel
                    htmlFor="autocompleteCustomerId"
                    active={inputActive.customer}
                  >
                    Cliente
                  </FloatingLabel>
                  <Autocomplete
                    suggestions={autocompleteCustomers}
                    onSuggestionsFetchRequested={({ value }) =>
                      filterSuggestions(value, 'customer')
                    }
                    onSuggestionsClearRequested={clearCustomerRequest}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={customerInputProps}
                    onSuggestionSelected={(e, { suggestion }) =>
                      handleSuggestionSelect(suggestion, 'customer')
                    }
                    name="customerName"
                  />
                  {noCustomerSuggestions ? (
                    <NoAutocompleteSuggestion onClick={handleNoCustomer}>
                      Nenhum cliente encontrado. Clique para adicionar.
                    </NoAutocompleteSuggestion>
                  ) : null}
                </InputContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="inputContact"
                    active={inputActive.contact}
                  >
                    Telefone
                  </FloatingLabel>
                  <Input
                    mask="(99) 99999-9999"
                    id="inputContact"
                    name="phone"
                    onFocus={() =>
                      setInputActive({ ...inputActive, contact: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, contact: false });
                      }
                    }}
                    type="text"
                    defaultValue={
                      current.customer.length > 0 && current.customer[0].phone
                    }
                    disabled
                  />
                </FloatingLabelInputContainer>
              </RowContainer>
              <RowContainer>
                <InputContainer style={{ marginRight: '5px', display: 'flex' }}>
                  <FloatingLabel
                    htmlFor="autocompleteServiceId"
                    active={inputActive.service}
                  >
                    Serviço Prestado
                  </FloatingLabel>
                  <Autocomplete
                    suggestions={autocompleteServices}
                    onSuggestionsFetchRequested={({ value }) =>
                      filterSuggestions(value, 'service')
                    }
                    onSuggestionsClearRequested={clearServiceRequest}
                    getSuggestionValue={getServicesValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={serviceInputProps}
                    onSuggestionSelected={(e, { suggestion }) =>
                      handleSuggestionSelect(suggestion, 'service')
                    }
                    name="serviceName"
                  />
                  {noServiceSuggestions ? (
                    <NoAutocompleteSuggestion onClick={handleNoService}>
                      Nenhum serviço encontrado. Clique para adicionar.
                    </NoAutocompleteSuggestion>
                  ) : null}
                </InputContainer>
              </RowContainer>
              <RowContainer>
                {current.service[0].name ? (
                  <>
                    <FloatingLabelInputContainer>
                      <FloatingLabel
                        htmlFor="basePriceId"
                        active={inputActive.basePrice}
                      >
                        Preço Base R$
                      </FloatingLabel>
                      <FloatLabelInput
                        id="basePriceId"
                        type="text"
                        onFocus={() =>
                          setInputActive({ ...inputActive, basePrice: true })
                        }
                        onBlur={e => {
                          if (e.target.value === '') {
                            setInputActive({
                              ...inputActive,
                              basePrice: false,
                            });
                          }
                        }}
                        name="basePrice"
                        defaultValue={current.basePrice}
                        disabled
                      />
                    </FloatingLabelInputContainer>

                    <FloatingLabelInputContainer>
                      <FloatingLabel
                        htmlFor="finalPriceId"
                        active={inputActive.finalPrice}
                      >
                        Preço Final R$
                      </FloatingLabel>
                      <FloatLabelInput
                        id="finalPriceId"
                        type="text"
                        onFocus={() =>
                          setInputActive({ ...inputActive, finalPrice: true })
                        }
                        onBlur={e => {
                          if (e.target.value === '') {
                            setInputActive({
                              ...inputActive,
                              finalPrice: false,
                            });
                          }
                        }}
                        defaultValue={current.finalPrice}
                        name="finalPrice"
                      />
                    </FloatingLabelInputContainer>
                    <FloatingLabelInputContainer>
                      <FloatingLabel
                        htmlFor="inputDateService"
                        active={inputActive.dateService}
                      >
                        Data de Execução
                      </FloatingLabel>
                      <Input
                        mask="99/99/9999"
                        id="inputDateService"
                        name="dateService"
                        onFocus={() =>
                          setInputActive({ ...inputActive, dateService: true })
                        }
                        onBlur={e => {
                          if (e.target.value === '') {
                            setInputActive({
                              ...inputActive,
                              dateService: false,
                            });
                          }
                        }}
                        type="text"
                        defaultValue={current.executionDate}
                      />
                    </FloatingLabelInputContainer>
                  </>
                ) : null}
              </RowContainer>
              <RowContainer>
                <InputContainer
                  style={{
                    display: 'flex',
                  }}
                >
                  <FloatingLabel
                    htmlFor="inputDescription"
                    active={inputActive.description}
                    style={{ marginBottom: '60px' }}
                  >
                    Descrição do Serviço
                  </FloatingLabel>
                  <TextAreaInput
                    name="description"
                    id="inputDescription"
                    type="text"
                    rows={5}
                    onFocus={() =>
                      setInputActive({ ...inputActive, description: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, description: false });
                      }
                    }}
                    defaultValue={current.description}
                  />
                </InputContainer>
              </RowContainer>

              <Divider>Informações de Cobrança</Divider>

              <RowContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="inputPaymentMethod"
                    active={inputActive.paymentMethod}
                  >
                    Método de Cobrança
                  </FloatingLabel>
                  <FloatLabelInput
                    id="inputPaymentMethod"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, paymentMethod: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          paymentMethod: false,
                        });
                      }
                    }}
                    name="paymentMethod"
                    defaultValue={current.paymentMethod}
                  />
                </FloatingLabelInputContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="inputPaymentDate"
                    active={inputActive.paymentDate}
                  >
                    Data de Pagamento
                  </FloatingLabel>
                  <Input
                    mask="99/99/9999"
                    id="inputPaymentDate"
                    name="paymentDate"
                    onFocus={() =>
                      setInputActive({ ...inputActive, paymentDate: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          paymentDate: false,
                        });
                      }
                    }}
                    defaultValue={current.paymentDate}
                    type="text"
                  />
                </FloatingLabelInputContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="inputPaymentValue"
                    active={inputActive.paymentValue}
                  >
                    Valor Total Pago
                  </FloatingLabel>
                  <FloatLabelInput
                    id="inputPaymentValue"
                    type="number"
                    onChange={e => setHasPaymentValue(e.target.value !== '')}
                    onFocus={() =>
                      setInputActive({ ...inputActive, paymentValue: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, paymentValue: false });
                      }
                    }}
                    name="paymentValue"
                    defaultValue={
                      current.paymentValue &&
                      helper.formatPrice(current.paymentValue, 'data')
                    }
                  />
                </FloatingLabelInputContainer>
                <div style={{ marginLeft: '5px' }}>
                  <label htmlFor="checkPaid" style={{ marginLeft: 0 }}>
                    Pago?
                  </label>
                  <input
                    style={{ marginTop: '10px' }}
                    id="checkPaid"
                    type="checkbox"
                    name="paid"
                    onChange={() => setPaid(isPaid => !isPaid)}
                    defaultChecked={current.paid}
                    disabled={!hasPaymentValue}
                  />
                </div>
              </RowContainer>
              {/* <RowContainer>
                <InputContainer
                  style={{
                    width: '50%',
                    marginRight: '5px',
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
                <InputContainer
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
                    defaultValue={
                      current.address && current.address.neighborhood
                    }
                  />
                </InputContainer>
                <InputContainer
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
                    defaultValue={current.address && current.address.additional}
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
                  <DefaultInput
                    name="address.city"
                    type="text"
                    placeholder="Cidade"
                    defaultValue={current.address && current.address.city}
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
                    defaultValue={current.address && current.address.state}
                  />
                </InputContainer>
              </RowContainer> */}
            </fieldset>
          </Form>
        </Container>
      ) : (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <fieldset disabled={submitting}>
              <Divider>Dados da Ordem de Serviço</Divider>
              <RowContainer>
                <InputContainer style={{ marginRight: '5px', display: 'flex' }}>
                  <FloatingLabel
                    htmlFor="autocompleteCustomerId"
                    active={inputActive.customer}
                  >
                    Cliente
                  </FloatingLabel>
                  <Autocomplete
                    suggestions={autocompleteCustomers}
                    onSuggestionsFetchRequested={({ value }) =>
                      filterSuggestions(value, 'customer')
                    }
                    onSuggestionsClearRequested={clearCustomerRequest}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={customerInputProps}
                    onSuggestionSelected={(e, { suggestion }) =>
                      handleSuggestionSelect(suggestion, 'customer')
                    }
                    name="customerName"
                  />
                  {noCustomerSuggestions ? (
                    <NoAutocompleteSuggestion onClick={handleNoCustomer}>
                      Nenhum cliente encontrado. Clique para adicionar.
                    </NoAutocompleteSuggestion>
                  ) : null}
                </InputContainer>
                {selectedCustomer.name ? (
                  <FloatingLabelInputContainer>
                    <FloatingLabel
                      htmlFor="inputContact"
                      active={inputActive.contact}
                    >
                      Telefone
                    </FloatingLabel>
                    <Input
                      mask="(99) 99999-9999"
                      id="inputContact"
                      name="phone"
                      onFocus={() =>
                        setInputActive({ ...inputActive, contact: true })
                      }
                      onBlur={e => {
                        if (e.target.value === '') {
                          setInputActive({ ...inputActive, contact: false });
                        }
                      }}
                      type="text"
                      defaultValue={selectedCustomer.phone}
                      disabled
                    />
                  </FloatingLabelInputContainer>
                ) : null}
              </RowContainer>
              <RowContainer>
                <InputContainer style={{ marginRight: '5px', display: 'flex' }}>
                  <FloatingLabel
                    htmlFor="autocompleteServiceId"
                    active={inputActive.service}
                  >
                    Serviço Prestado
                  </FloatingLabel>
                  <Autocomplete
                    suggestions={autocompleteServices}
                    onSuggestionsFetchRequested={({ value }) =>
                      filterSuggestions(value, 'service')
                    }
                    onSuggestionsClearRequested={clearServiceRequest}
                    getSuggestionValue={getServicesValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={serviceInputProps}
                    onSuggestionSelected={(e, { suggestion }) =>
                      handleSuggestionSelect(suggestion, 'service')
                    }
                    name="serviceName"
                  />
                  {noServiceSuggestions ? (
                    <NoAutocompleteSuggestion onClick={handleNoService}>
                      Nenhum serviço encontrado. Clique para adicionar.
                    </NoAutocompleteSuggestion>
                  ) : null}
                </InputContainer>
              </RowContainer>
              <RowContainer>
                {selectedService.name ? (
                  <>
                    <FloatingLabelInputContainer>
                      <FloatingLabel
                        htmlFor="basePriceId"
                        active={inputActive.basePrice}
                      >
                        Preço Base R$
                      </FloatingLabel>
                      <FloatLabelInput
                        id="basePriceId"
                        type="text"
                        onFocus={() =>
                          setInputActive({ ...inputActive, basePrice: true })
                        }
                        onBlur={e => {
                          if (e.target.value === '') {
                            setInputActive({
                              ...inputActive,
                              basePrice: false,
                            });
                          }
                        }}
                        name="basePrice"
                        defaultValue={selectedService.formatedPrice}
                        disabled
                      />
                    </FloatingLabelInputContainer>

                    <FloatingLabelInputContainer>
                      <FloatingLabel
                        htmlFor="finalPriceId"
                        active={inputActive.finalPrice}
                      >
                        Preço Final R$
                      </FloatingLabel>
                      <FloatLabelInput
                        id="finalPriceId"
                        type="text"
                        onFocus={() =>
                          setInputActive({ ...inputActive, finalPrice: true })
                        }
                        onBlur={e => {
                          if (e.target.value === '') {
                            setInputActive({
                              ...inputActive,
                              finalPrice: false,
                            });
                          }
                        }}
                        name="finalPrice"
                      />
                    </FloatingLabelInputContainer>
                    <FloatingLabelInputContainer>
                      <FloatingLabel
                        htmlFor="inputDateService"
                        active={inputActive.dateService}
                      >
                        Data de Execução
                      </FloatingLabel>
                      <Input
                        mask="99/99/9999"
                        id="inputDateService"
                        name="dateService"
                        onFocus={() =>
                          setInputActive({ ...inputActive, dateService: true })
                        }
                        onBlur={e => {
                          if (e.target.value === '') {
                            setInputActive({
                              ...inputActive,
                              dateService: false,
                            });
                          }
                        }}
                        type="text"
                        defaultValue={moment().format('DD/MM/YYYY')}
                      />
                    </FloatingLabelInputContainer>
                  </>
                ) : null}
              </RowContainer>
              <RowContainer>
                <InputContainer
                  style={{
                    display: 'flex',
                  }}
                >
                  <FloatingLabel
                    htmlFor="inputDescription"
                    active={inputActive.description}
                    style={{ marginBottom: '60px' }}
                  >
                    Descrição do Serviço
                  </FloatingLabel>
                  <TextAreaInput
                    name="description"
                    id="inputDescription"
                    type="text"
                    rows={5}
                    onFocus={() =>
                      setInputActive({ ...inputActive, description: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, description: false });
                      }
                    }}
                  />
                </InputContainer>
              </RowContainer>

              <Divider>Informações de Cobrança</Divider>

              <RowContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="inputPaymentMethod"
                    active={inputActive.paymentMethod}
                  >
                    Método de Cobrança
                  </FloatingLabel>
                  <FloatLabelInput
                    id="inputPaymentMethod"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, paymentMethod: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          paymentMethod: false,
                        });
                      }
                    }}
                    name="paymentMethod"
                    defaultValue={selectedService.paymentMethod}
                  />
                </FloatingLabelInputContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="inputPaymentDate"
                    active={inputActive.paymentDate}
                  >
                    Data de Pagamento
                  </FloatingLabel>
                  <Input
                    mask="99/99/9999"
                    id="inputPaymentDate"
                    name="paymentDate"
                    onFocus={() =>
                      setInputActive({ ...inputActive, paymentDate: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          paymentDate: false,
                        });
                      }
                    }}
                    type="text"
                  />
                </FloatingLabelInputContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="inputPaymentValue"
                    active={inputActive.paymentValue}
                  >
                    Valor Total Pago
                  </FloatingLabel>
                  <FloatLabelInput
                    id="inputPaymentValue"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, paymentValue: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, paymentValue: false });
                      }
                    }}
                    name="paymentValue"
                  />
                </FloatingLabelInputContainer>
                <input
                  type="checkbox"
                  name="paid"
                  disabled={!handleHasPaymentValue()}
                />
              </RowContainer>
            </fieldset>
          </Form>
        </Container>
      )}
      <BottomActions>
        {serviceOrderId ? (
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
          disabled={
            submitting || (!selectedCustomer.name && !selectedService.name)
          }
          style={{
            cursor:
              submitting || !selectedCustomer.name || !selectedService.name
                ? 'default'
                : 'pointer',
            background:
              submitting || !selectedCustomer.name || !selectedService.name
                ? '#909090'
                : '#333',
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

export default ServiceOrderDialog;

ServiceOrderDialog.propTypes = {
  setOpen: PropTypes.func.isRequired,
  current: PropTypes.oneOfType([PropTypes.object]).isRequired,
  services: PropTypes.arrayOf(PropTypes.object),
  customers: PropTypes.arrayOf(PropTypes.object),
};

ServiceOrderDialog.defaultProps = {
  services: [],
  customers: [],
};
