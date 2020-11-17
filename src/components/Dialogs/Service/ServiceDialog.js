import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiClose, mdiTrashCan } from '@mdi/js';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import FloatLabelInput from '../../FloatLabel/Input';

import { handleDispatchEvents } from './methods';

import Modal from '../../Modals';
import Asks from './Asks';

import {
  Container,
  Toolbar,
  Title,
  Form,
  BottomActions,
  RowContainer,
  FloatingLabelInputContainer,
  FloatingLabel,
} from './styles';
import helper from '../../../helpers/helper';

function ServiceDialog({ setOpen, current }) {
  const serviceId = current._id;
  const formRef = useRef(null);
  const [askOpen, setAskOpen] = useState(false);

  const [inputActive, setInputActive] = useState({
    code: false,
    name: false,
    price: false,
    description: false,
  });

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome Obrigatório'),
    price: Yup.string().required('Preço Obrigatório'),
  });

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

      if (serviceId) {
        toast.success('Serviço Atualizado.');
      } else {
        toast.success('Serviço Criado.');
      }

      handleClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });

        formRef.current.setErrors(errorMessages);
      } else {
        toast.error('Preço inválido');
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
        serviceId={serviceId}
        handleClose={handleCloseReturn}
      />
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (serviceId) {
        handleDispatchEvents(current);
      }
    }, 50);
  }, [current, serviceId]);

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
              <FloatingLabelInputContainer style={{ width: '290px' }}>
                <FloatingLabel htmlFor="code" active={inputActive.code}>
                  Código (Auto)
                </FloatingLabel>
                <FloatLabelInput
                  id="code"
                  type="text"
                  onFocus={() => setInputActive({ ...inputActive, code: true })}
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        code: false,
                      });
                    }
                  }}
                  defaultValue={current.code}
                  name="code"
                  disabled
                />
              </FloatingLabelInputContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel htmlFor="name" active={inputActive.name}>
                  Nome
                </FloatingLabel>
                <FloatLabelInput
                  id="name"
                  type="text"
                  onFocus={() => setInputActive({ ...inputActive, name: true })}
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
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="formatedPrice"
                  active={inputActive.formatedPrice}
                >
                  Preço
                </FloatingLabel>
                <FloatLabelInput
                  id="formatedPrice"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, formatedPrice: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        formatedPrice: false,
                      });
                    }
                  }}
                  defaultValue={current.formatedPrice}
                  name="price"
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
          </Form>
        </Container>
      ) : (
        <Container>
          <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
            <RowContainer>
              <FloatingLabelInputContainer style={{ width: '290px' }}>
                <FloatingLabel htmlFor="code" active={inputActive.code}>
                  Código (Auto)
                </FloatingLabel>
                <FloatLabelInput
                  id="code"
                  type="text"
                  onFocus={() => setInputActive({ ...inputActive, code: true })}
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        code: false,
                      });
                    }
                  }}
                  name="code"
                  disabled
                />
              </FloatingLabelInputContainer>
              <FloatingLabelInputContainer>
                <FloatingLabel htmlFor="name" active={inputActive.name}>
                  Nome
                </FloatingLabel>
                <FloatLabelInput
                  id="name"
                  type="text"
                  onFocus={() => setInputActive({ ...inputActive, name: true })}
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
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="formatedPrice"
                  active={inputActive.formatedPrice}
                >
                  Preço
                </FloatingLabel>
                <FloatLabelInput
                  id="formatedPrice"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, formatedPrice: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({
                        ...inputActive,
                        formatedPrice: false,
                      });
                    }
                  }}
                  name="price"
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
        <button type="submit" form="editForm">
          Salvar
        </button>
      </BottomActions>

      <Modal open={askOpen} setOpen={setOpen}>
        <div>{handleAskDialog()}</div>
      </Modal>
    </>
  );
}

export default ServiceDialog;

ServiceDialog.propTypes = {
  setOpen: PropTypes.func.isRequired,
  current: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
