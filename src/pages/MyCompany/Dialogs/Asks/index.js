import React from 'react';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiClose } from '@mdi/js';
import { toast } from 'react-toastify';
import api from '../../../../services/api';

import { Toolbar, Title, Container, AskText, BottomActions } from './styles';

function Asks({ setAskOpen, attachmentId, accountId, closeReturn }) {
  const handleClose = userUpdate => {
    closeReturn(userUpdate);
    setAskOpen(open => !open);
  };

  const handleJustClose = () => {
    setAskOpen(open => !open);
  };

  async function handleDelete() {
    try {
      const s3Deleted = await api.delete(`/api/v1/attachments/${attachmentId}`);
      if (!s3Deleted) throw new Error();

      const dataset = {
        logo: null,
      };

      const userUpdate = await api.put(`/api/v1/update-account/${accountId}`, {
        ...dataset,
      });

      handleClose(userUpdate);
    } catch (error) {
      toast.error('Falha ao apagar imagem.');
    }
  }

  return (
    <>
      <Toolbar>
        <Title>Remover Foto de Perfil</Title>
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
          Você tem certeza que deseja remover sua foto de perfil? Essa ação é
          definitiva e após a exclusão, você passará a utilizar uma foto padrão.
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
  closeReturn: PropTypes.func,
  accountId: PropTypes.string,
  attachmentId: PropTypes.string,
};

Asks.defaultProps = {
  accountId: undefined,
  attachmentId: undefined,
  closeReturn: undefined,
};
