import React from 'react';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiClose } from '@mdi/js';
import { toast } from 'react-toastify';
import api from '../../../services/api';

import { Toolbar, Title, Container, AskText, BottomActions } from './styles';

function Asks({
  setAskOpen,
  registerId,
  apiToCall,
  forceReload = true,
  closeReturn,
}) {
  const handleClose = () => {
    closeReturn();
    setAskOpen(open => !open);
  };

  const handleJustClose = () => {
    setAskOpen(open => !open);
  };

  async function handleDelete() {
    try {
      await api.delete(`${apiToCall}${registerId}`);
      handleClose();
      if (forceReload) window.location.reload(false);
    } catch (error) {
      toast.error('Falha ao apagar cliente.');
    }
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
          onClick={handleJustClose}
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
  registerId: PropTypes.string,
  apiToCall: PropTypes.string,
  closeReturn: PropTypes.func,
  forceReload: PropTypes.bool,
};

Asks.defaultProps = {
  registerId: undefined,
  apiToCall: undefined,
  closeReturn: undefined,
  forceReload: true,
};
