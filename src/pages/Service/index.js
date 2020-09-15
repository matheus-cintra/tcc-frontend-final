import React, { useState, useEffect } from 'react';
import { mdiPlusCircle } from '@mdi/js';
import DefaultList from '../../components/DefaultList';
import Modal from '../../components/Modals';
import ServiceDialog from '../../components/Dialogs/Service/ServiceDialog';
import methods from './methods';

export default function Service() {
  const [working, setWorking] = useState(false);
  const [serviceList, setServicesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentService, setCurrentService] = useState({});
  const [registerCount, setRegisterCount] = useState(0);

  const getServices = async (initial, limit, skip) => {
    if (open) return;
    let dataServices;
    if (initial) {
      dataServices = await methods.getRegisters('15', undefined);
    } else {
      dataServices = await methods.getRegisters(limit, skip);
    }

    setServicesList(dataServices.docs);
    setRegisterCount(dataServices.docCount);
    setWorking(false);
  };

  useEffect(() => {
    setWorking(true);
    getServices(true);
  }, []); //eslint-disable-line

  useEffect(() => {
    if (working) return;
    getServices(true);
  }, [open]); //eslint-disable-line

  const handleOpen = service => {
    setCurrentService(service);
    setOpen(current => !current);
  };

  const handleServiceEdit = () => {
    return <ServiceDialog setOpen={setOpen} current={currentService} />;
  };

  return (
    <>
      <DefaultList
        title="Serviços"
        handleOpen={handleOpen}
        toolbarIcon={mdiPlusCircle}
        iconTitle="Adicionar Serviço"
        working={working}
        itemList={serviceList}
        itemCount={registerCount}
        decorator={methods}
      />

      <Modal open={open} setOpen={setOpen}>
        <div>{handleServiceEdit()}</div>
      </Modal>
    </>
  );
}
