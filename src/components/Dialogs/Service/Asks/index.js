import React from 'react';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiClose } from '@mdi/js';
import { toast } from 'react-toastify';
import api from '../../../../services/api';

import { Toolbar, Title, Container, AskText, BottomActions } from './styles';

function Asks({ setAskOpen, serviceId, handleClose }) {
  const closeAllDialogs = () => {
    setAskOpen(open => !open);
    handleClose();
  };

  const handleJustClose = () => {
    setAskOpen(open => !open);
  };

  async function handleDelete() {
    try {
      await api.delete(`/api/v1/registration-service/${serviceId}`);
      toast.success('Serviço removido com sucesso.');
      closeAllDialogs();
    } catch (error) {
      toast.error(error.response.data.data.message);
    }
  }

  return (
    <>
      <Toolbar>
        <Title>Remover Serviço?</Title>
        <Icon
          path={mdiClose}
          title="Close"
          size={1}
          color="#FFF"
          onClick={handleJustClose}
        />
      </Toolbar>
      <Container>
        <AskText>
          Você tem certeza que deseja remover este serviço? Esta ação é
          irreversível.
        </AskText>
        <BottomActions>
          <button type="button" onClick={handleDelete}>
            Sim
          </button>
          <button type="button" onClick={handleJustClose}>
            Não
          </button>
        </BottomActions>
      </Container>
    </>
  );
}

export default Asks;

Asks.propTypes = {
  setAskOpen: PropTypes.func.isRequired,
  serviceId: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

Asks.defaultProps = {
  serviceId: undefined,
};
