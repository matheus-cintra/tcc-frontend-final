import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiClose, mdiTrashCan } from '@mdi/js';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import moment from 'moment';
import DefaultInput from '../../DefaultInput/Input';
import Divider from '../../Divider';
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
  Select,
} from './styles';
import helper from '../../../helpers/helper';

function ServiceOrderDialog({ setOpen, current }) {
  const serviceOrderId = current._id;
  const formRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState({});
  const paymentMethods = [
    {
      id: 1,
      content: 'TRANSFERÊNCIA',
    },
    {
      id: 2,
      content: 'BOLETO',
    },
    {
      id: 3,
      content: 'DINHEIRO',
    },
    {
      id: 4,
      content: 'CHEQUE',
    },
  ];

  useEffect(() => {
    const _paymentMethod = paymentMethods.find(
      x => x.id === current.paymentMethod
    );
    setPaymentMethod(_paymentMethod);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const schema = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    price: Yup.string().required('Preço Obrigatório'),
    serviceId: Yup.string().required('ServiceId Obrigatório'),
    customerId: Yup.string().required('customerId Obrigatório'),
    paymentMethod: Yup.string().required('Método de Pagamento Obrigatório'),
    phone: Yup.string(),
    email: Yup.string().email('Email inválido'),
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

  function handleSelectPaymentMethod(e) {
    setPaymentMethod(e.target.value);
    // console.log('Valor', e.target.value);
  }

  async function handleSubmit(data) {
    try {
      data = {
        ...data,
        paymentMethod,
      };
      // console.log('entrou no submit', typeof paymentMethod);
      await schema.validate(data, {
        abortEarly: false,
      });
      // console.log('passou no validate');
      let ds = {
        code: data.code,
        servideId: data.serviceId,
        customerId: data.customerId,
        phone: data.phone,
        email: data.email,
        paymentMethod,
      };

      if (data.price) {
        const price = helper.formatPrice(data.price, 'data');
        ds = { price };
      }
      if (data.serviceDate) {
        const serviceDate = moment(data.serviceDate, 'DD/MM/YYYY');
        ds = { serviceDate: serviceDate.format() };
        if (serviceDate.isBefore(moment())) {
          return toast.error('Não é possível informar uma data passada');
        }
      }

      if (data.executedDate) {
        const executedDate = moment(data.executedDate, 'DD/MM/YYYY');
        ds = { executedDate: executedDate.format() };
        if (executedDate.isBefore(moment())) {
          return toast.error('Não é possível informar uma data passada');
        }
      }

      if (data.paymentDate) {
        const paymentDate = moment(data.paymentDate, 'DD/MM/YYYY');
        ds = { paymentDate: paymentDate.format() };
        if (paymentDate.isBefore(moment())) {
          return toast.error('Não é possível informar uma data passada');
        }
      }

      const result = serviceOrderId
        ? await api.put(`/api/v1/service-order/${serviceOrderId}`, { ...ds })
        : await api.post('/api/v1/service-order/', { ...ds });

      if (!result.data.success) {
        return toast.error('Erro ao atualizar ordem serviço.');
      }

      toast.success('Ordem de Serviço Atualizado.');

      handleClose();
    } catch (error) {
      console.warn(error);
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
        <Title>
          {serviceOrderId ? 'Editar Ordem de Serviço' : 'Nova Ordem de Serviço'}
        </Title>
        <Icon
          path={mdiClose}
          title="Close"
          size={1}
          color="#FFF"
          onClick={handleClose}
        />
      </Toolbar>
      {serviceOrderId ? (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <Divider>Dados ordem de Serviço</Divider>
            <RowContainer>
              <InputContainer style={{ width: '200px', marginRight: '15px' }}>
                <Input
                  name="code"
                  type="text"
                  defaultValue={current.code}
                  placeholder="Código da Ordem"
                />
              </InputContainer>
              <InputContainer>
                <Input
                  name="serviceId"
                  type="text"
                  defaultValue={current.serviceId}
                  placeholder="Nome do Serviço"
                />
              </InputContainer>
              <InputContainer>
                <Input
                  name="customerId"
                  type="text"
                  defaultValue={current.customerId}
                  placeholder="Nome do Cliente"
                />
              </InputContainer>
            </RowContainer>

            <Divider>Contato</Divider>

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

            <Divider>Datas do Serviço</Divider>

            <RowContainer>
              <InputContainer
                style={{
                  width: '50%',
                  marginRight: '5px',
                }}
              >
                <Input
                  mask="99/99/9999"
                  name="serviceDate"
                  type="text"
                  defaultValue={current.serviceDate}
                  placeholder="Data do Serviço"
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
                  mask="99/99/9999"
                  name="executedDate"
                  type="text"
                  defaultValue={current.executedDate}
                  placeholder="Data de Execução"
                />
              </InputContainer>
            </RowContainer>
            <Divider>Dados Financeiros</Divider>
            <RowContainer>
              <InputContainer
                style={{
                  width: '50%',
                  marginRight: '10px',
                }}
              >
                <Input
                  mask="99/99/9999"
                  name="paymentDate"
                  type="text"
                  defaultValue={current.paymentDate}
                  placeholder="Data do Pagamento"
                />
              </InputContainer>
              <Select
                style={{
                  width: '50%',
                  marginLeft: '10px',
                  marginRight: '5px',
                }}
                onChange={e => handleSelectPaymentMethod(e)}
                value={paymentMethods.content}
              >
                {paymentMethods.map(method => (
                  <option
                    key={method.id}
                    name={method.content}
                    type="text"
                    value={method.id}
                  >
                    {method.content}
                  </option>
                ))}
              </Select>
              <InputContainer
                style={{
                  width: '50%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <Input
                  name="price"
                  type="text"
                  defaultValue={current.formatedPrice}
                  placeholder="Preço"
                />
              </InputContainer>
            </RowContainer>

            <RowContainer>
              {/* <InputContainer style={{ marginRight: '10px' }}>
                <Input
                  name="description"
                  type="text"
                  defaultValue={current.description}
                  placeholder="Descrição"
                />
              </InputContainer> */}
            </RowContainer>
          </Form>
        </Container>
      ) : (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <Divider>Dados Ordem de Serviço</Divider>
            <RowContainer>
              <InputContainer style={{ width: '200px', marginRight: '15px' }}>
                <Input name="code" type="text" placeholder="Code*" />
              </InputContainer>
              <InputContainer style={{ width: '200px', marginRight: '15px' }}>
                <Input name="serviceId" type="text" placeholder="ServiceId*" />
              </InputContainer>
              <InputContainer style={{ width: '200px', marginRight: '15px' }}>
                <Input
                  name="customerId"
                  type="text"
                  placeholder="CustomerId*"
                />
              </InputContainer>
            </RowContainer>

            <Divider>Contato</Divider>

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
            <Divider>Datas do Serviço</Divider>
            <RowContainer>
              <InputContainer
                style={{
                  width: '50%',
                }}
              >
                <Input
                  mask="99/99/9999"
                  name="serviceDate"
                  type="text"
                  placeholder="Data do Serviço"
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
                  mask="99/99/9999"
                  name="executedDate"
                  type="text"
                  placeholder="Data estimada da Execução"
                />
              </InputContainer>
            </RowContainer>

            <Divider>Dados Financeiros </Divider>
            <RowContainer>
              <InputContainer
                style={{
                  width: '50%',
                }}
              >
                <Input
                  mask="99/99/9999"
                  name="paymentDate"
                  type="text"
                  placeholder="Data do Pagamento"
                />
              </InputContainer>
              <InputContainer
                style={{
                  width: '50%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <Select
                  style={{
                    width: '50%',
                    marginLeft: '10px',
                    marginRight: '5px',
                  }}
                  onChange={e => handleSelectPaymentMethod(e)}
                  value={paymentMethod.content}
                >
                  {paymentMethods.map(method => (
                    <option
                      key={method.id}
                      name={method.content}
                      type="text"
                      value={method.id}
                    >
                      {method.content}
                    </option>
                  ))}
                </Select>
              </InputContainer>

              <InputContainer
                style={{
                  width: '50%',
                  marginLeft: '5px',
                  marginRight: '5px',
                }}
              >
                <Input name="price" type="text" placeholder="Preço" />
              </InputContainer>
            </RowContainer>
            {/* <RowContainer>
              <InputContainer style={{ marginRight: '10px' }}>
                <Input name="description" type="text" placeholder="Descrição" />
              </InputContainer>
            </RowContainer> */}
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

export default ServiceOrderDialog;

ServiceOrderDialog.propTypes = {
  setOpen: PropTypes.func.isRequired,
  current: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
