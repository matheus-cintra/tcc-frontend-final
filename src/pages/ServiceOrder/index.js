import React, { useState, useEffect } from 'react';
import { mdiPlusCircle } from '@mdi/js';
import DefaultList from '../../components/DefaultList';
import Modal from '../../components/Modals';
import ServiceOrderDialog from '../../components/Dialogs/ServiceOrder/ServiceOrderDialog';
import methods from './methods';

export default function ServiceOrder() {
  const [working, setWorking] = useState(false);
  const [serviceorderList, setServiceOrderList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentServiceOrder, setCurrentServiceOrder] = useState({});
  const [registerCount, setRegisterCount] = useState(0);
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);

  const getService = async () => {
    const servicesResult = await methods.getServices();

    setServices(servicesResult.docs);
  };

  const getCustomers = async () => {
    const customersResult = await methods.getCustomers();
    setCustomers(customersResult.docs);
  };

  const getServiceOrders = async (initial, limit, skip) => {
    if (open) return;
    let dataServiceOrders;
    if (initial) {
      dataServiceOrders = await methods.getRegisters('15', undefined);
    } else {
      dataServiceOrders = await methods.getRegisters(limit, skip);
    }

    setServiceOrderList(dataServiceOrders.docs);
    setRegisterCount(dataServiceOrders.docCount);
    setWorking(false);
  };

  useEffect(() => {
    setWorking(true);
    getServiceOrders(true);
    getService();
    getCustomers();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (working) return;
    getServiceOrders(true);
  }, [open]); //eslint-disable-line

  const handleOpen = serviceorder => {
    setCurrentServiceOrder(serviceorder);
    setOpen(current => !current);
  };

  const handleServiceOrderEdit = () => {
    return (
      <ServiceOrderDialog
        setOpen={setOpen}
        current={currentServiceOrder}
        services={services}
        customers={customers}
      />
    );
  };

  return (
    <>
      <DefaultList
        title="Ordem de Serviços"
        handleOpen={handleOpen}
        toolbarIcon={mdiPlusCircle}
        iconTitle="Adicionar Ordem de Serviço"
        working={working}
        itemList={serviceorderList}
        itemCount={registerCount}
        decorator={methods}
      />

      <Modal open={open} setOpen={setOpen}>
        <div>{handleServiceOrderEdit()}</div>
      </Modal>
    </>
  );
}
