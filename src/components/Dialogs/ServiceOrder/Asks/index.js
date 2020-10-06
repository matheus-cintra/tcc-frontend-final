import React from 'react';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiClose } from '@mdi/js';
import { toast } from 'react-toastify';
import api from '../../../../services/api';

import { Toolbar, Title, Container, AskText, BottomActions } from './styles';

function Asks({ setAskOpen, serviceOrderId, handleClose }) {
  const closeAllDialogs = () => {
    setAskOpen(open => !open);
    handleClose();
  };

  const handleJustClose = () => {
    setAskOpen(open => !open);
  };

  async function handleDelete() {
    try {
      const deleteResult = await api.delete(
        `/api/v1/serviceOrders/${serviceOrderId}`
      );
      if (!deleteResult) throw new Error();

      closeAllDialogs();
    } catch (error) {
      toast.error('Falha ao apagar Ordem de Serviço.');
    }
  }

  return (
    <>
      <Toolbar>
        <Title>Remover Ordem de Serviço?</Title>
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
          Você tem certeza que deseja remover este Ordem de Serviço? Esta ação é
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
  serviceOrderId: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

Asks.defaultProps = {
  serviceOrderId: undefined,
};
