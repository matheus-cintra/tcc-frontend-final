import React from 'react';
import Icon from '@mdi/react';
import PropTypes from 'prop-types';
import { mdiClose } from '@mdi/js';
import { toast } from 'react-toastify';
import api from '../../../../services/api';
import { Toolbar, Title, Container, AskText, BottomActions } from './styles';

function AsksDeleteAccount({ setAskOpen, accountId, closeUpdate }) {
  const handleJustClose = () => {
    setAskOpen(open => !open);
  };

  const handleCloseRefresh = () => {
    setAskOpen(open => !open);
    closeUpdate();
  };

  const handleDeleteAccount = async () => {
    try {
      const result = await api.delete(
        `/api/v1/delete-subscription/${accountId}`
      );
      if (!result.data.success) return toast.error('Erro ao deletar conta');

      handleCloseRefresh();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Toolbar>
        <Title>Deletar completamente sua conta?</Title>
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
          Você tem certeza que deseja encerrar definitivamente sua conta? Essa
          ação é definitva. Como seguimos as regras da Lei Geral deProteção dos
          Dados, enviamos via email, todos os seus dados salvos no banco, e em
          seguida deletaremos os mesmos.
        </AskText>
        <BottomActions>
          <button type="button" onClick={handleDeleteAccount}>
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

export default AsksDeleteAccount;

AsksDeleteAccount.propTypes = {
  setAskOpen: PropTypes.func.isRequired,
  closeUpdate: PropTypes.func,
  accountId: PropTypes.string,
};

AsksDeleteAccount.defaultProps = {
  accountId: undefined,
  closeUpdate: undefined,
};
