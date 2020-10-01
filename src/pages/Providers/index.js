import React, { useState, useEffect } from 'react';
import { mdiPlusCircle } from '@mdi/js';
import DefaultList from '../../components/DefaultList';
import Modal from '../../components/Modals';
import ProviderDialog from '../../components/Dialogs/Providers/ProvidersDialog';
import methods from './methods';

export default function Provider() {
  const [working, setWorking] = useState(false);
  const [providerList, setProviderList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState({});
  const [registerCount, setRegisterCount] = useState(0);

  const getProviders = async (initial, limit, skip) => {
    if (open) return;
    let dataProviders;
    if (initial) {
      dataProviders = await methods.getRegisters('15', undefined);
    } else {
      dataProviders = await methods.getRegisters(limit, skip);
    }

    setProviderList(dataProviders.docs);
    setRegisterCount(dataProviders.docCount);
    setWorking(false);
  };

  useEffect(() => {
    setWorking(true);
    getProviders(true);
  }, []); //eslint-disable-line

  useEffect(() => {
    if (working) return;
    getProviders(true);
  }, [open]); //eslint-disable-line

  const handleOpen = provider => {
    setCurrentProvider(provider);
    setOpen(current => !current);
  };

  const handleProviderEdit = () => {
    return <ProviderDialog setOpen={setOpen} current={currentProvider} />;
  };

  return (
    <>
      <DefaultList
        title="Fornecedores"
        handleOpen={handleOpen}
        toolbarIcon={mdiPlusCircle}
        iconTitle="Adicionar Fornecedor"
        working={working}
        itemList={providerList}
        itemCount={registerCount}
        decorator={methods}
      />

      <Modal open={open} setOpen={setOpen}>
        <div>{handleProviderEdit()}</div>
      </Modal>
    </>
  );
}
