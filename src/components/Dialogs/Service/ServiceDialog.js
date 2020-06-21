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
import helper from '../../../helpers/helper';

function ServiceDialog({ setOpen, current }) {
  const serviceId = current._id;
  const formRef = useRef(null);

  const schema = Yup.object().shape({
    code: Yup.string().required('Código Obrigatório'),
    name: Yup.string().required('Nome Obrigatório'),
    price: Yup.string().required('Preço Obrigatório'),
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

      const price = helper.formatPrice(data.price, 'data');

      const ds = {
        code: data.code,
        name: data.name,
        price,
        description: data.description,
      };

      const result = serviceId
        ? await api.put(`/api/v1/registration-service/${serviceId}`, { ...ds })
        : await api.post('/api/v1/registration-service/', { ...ds });

      if (!result.data.success) {
        return toast.error('Eror ao atualizar serviço.');
      }

      toast.success('Serviço Atualizado.');

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
        <Title>{serviceId ? 'Editar Serviço' : 'Novo Serviço'}</Title>
        <Icon
          path={mdiClose}
          title="Close"
          size={1}
          color="#FFF"
          onClick={handleClose}
        />
      </Toolbar>
      {serviceId ? (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <RowContainer>
              <InputContainer style={{ width: '200px', marginRight: '15px' }}>
                <Input
                  name="code"
                  type="text"
                  defaultValue={current.code}
                  placeholder="Código*"
                />
              </InputContainer>
              <InputContainer>
                <Input
                  name="name"
                  type="text"
                  defaultValue={current.name}
                  placeholder="Nome*"
                />
              </InputContainer>
              <InputContainer
                style={{
                  width: '200px',
                  marginLeft: '15px',
                  marginRight: '10px',
                }}
              >
                <Input
                  name="price"
                  type="text"
                  defaultValue={current.formatedPrice}
                  placeholder="Preço*"
                />
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
              <InputContainer style={{ width: '200px', marginRight: '15px' }}>
                <Input name="code" type="text" placeholder="Código*" />
              </InputContainer>
              <InputContainer>
                <Input name="name" type="text" placeholder="Nome*" />
              </InputContainer>
              <InputContainer
                style={{
                  width: '200px',
                  marginLeft: '15px',
                  marginRight: '10px',
                }}
              >
                <Input name="price" type="text" placeholder="Preço*" />
              </InputContainer>
            </RowContainer>
            <RowContainer>
              <InputContainer style={{ marginRight: '10px' }}>
                <Input name="description" type="text" placeholder="Descrição" />
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

export default ServiceDialog;

ServiceDialog.propTypes = {
  setOpen: PropTypes.func.isRequired,
  current: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
