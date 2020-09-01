import React from 'react';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiClose } from '@mdi/js';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { Toolbar, Title, Container, AskText, BottomActions } from './styles';

function Asks({ setAskOpen, customerId }) {
  const handleClose = () => {
    setAskOpen(open => !open);
  };

  async function handleDelete() {
    try {
      await api.delete(`/api/v1/customers/${customerId}`);
      window.location.reload(false);
    } catch (error) {
      toast.error('Falha ao apagar cliente.');
    }
  }

  async function handleUpload(e) {
    const files = e.target.files[0];
    const result = await api.post('/api/v1/tools/get-signed-url', {
      fileName: files.name,
    });

    fetch(result.data.url, { method: 'PUT', body: files })
      .then(body => {
        console.warn('Result > ', body);
      })
      .catch(err => {
        console.warn('ERRO > ', err);
      });
  }

  return (
    <>
      <Toolbar>
        <Title>Editar Cliente</Title>
        <Icon
          path={mdiClose}
          title="Close"
          size={1}
          color="#FFF"
          onClick={handleClose}
        />
      </Toolbar>
      <Container>
        <AskText>
          Você tem certeza que deseja remover este cliente? Essa ação é
          definitiva.
        </AskText>
        <BottomActions>
          <button type="button" onClick={handleDelete}>
            Sim
          </button>
          <button type="button" onClick={handleClose}>
            Não
          </button>
          <input type="file" onChange={e => handleUpload(e)} />
        </BottomActions>
      </Container>
    </>
  );
}

export default Asks;

Asks.propTypes = {
  setAskOpen: PropTypes.func.isRequired,
  customerId: PropTypes.string,
};

Asks.defaultProps = {
  customerId: undefined,
};
