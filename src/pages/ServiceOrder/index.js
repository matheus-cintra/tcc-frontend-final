/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { mdiPlusCircle } from '@mdi/js';
import ServiceOrderLists from './ServiceOrderList';
import Modal from '../../components/Modals';
import ServiceOrderDialog from '../../components/Dialogs/ServiceOrder/ServiceOrderDialog';
import methods from './methods';

export default function ServiceOrder() {
  const [working, setWorking] = useState(false);
  const [serviceOrderList, setServiceOrderList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentServiceOrder, setCurrentServiceOrder] = useState({});

  const getServiceOrder = async () => {
    if (open) return;
    const serviceOrder = await methods.getServiceOrderList();
    setServiceOrderList(serviceOrder);
    setWorking(false);
  };

  useEffect(() => {
    setWorking(true);
    getServiceOrder();
  }, []);

  useEffect(() => {
    if (working) return;
    getServiceOrder();
  }, [open]);

  const handleOpen = serviceOrder => {
    setCurrentServiceOrder(serviceOrder);
    setOpen(current => !current);
  };

  const handleServiceEdit = () => {
    return (
      <ServiceOrderDialog setOpen={setOpen} current={currentServiceOrder} />
    );
  };

  return (
    <>
      <ServiceOrderLists
        title="Ordem de Serviços"
        handleOpen={handleOpen}
        toolbarIcon={mdiPlusCircle}
        iconTitle="Adicionar Ordem de Serviço"
        working={working}
        itemList={serviceOrderList}
      />

      <Modal open={open} setOpen={setOpen}>
        <div>{handleServiceEdit()}</div>
      </Modal>
    </>
  );
}
