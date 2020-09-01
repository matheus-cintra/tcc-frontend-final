import React, { useState, useEffect } from 'react';
import { mdiPlusCircle } from '@mdi/js';
import DefaultList from '../../components/DefaultList';
import Modal from '../../components/Modals';
import CustomerDialog from '../../components/Dialogs/Customers/CustomersDialog';
import methods from './methods';

export default function Customer() {
  const [working, setWorking] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [registerCount, setRegisterCount] = useState(0);

  const getCustomers = async (initial, limit, skip) => {
    if (open) return;
    let dataCustomers;
    if (initial) {
      dataCustomers = await methods.getRegisters('15', undefined);
    } else {
      dataCustomers = await methods.getRegisters(limit, skip);
    }

    setCustomerList(dataCustomers.docs);
    setRegisterCount(dataCustomers.docCount);
    setWorking(false);
  };

  useEffect(() => {
    setWorking(true);
    getCustomers(true);
  }, []); //eslint-disable-line

  useEffect(() => {
    if (working) return;
    getCustomers(true);
  }, [open]); //eslint-disable-line

  const handleOpen = customer => {
    setCurrentCustomer(customer);
    setOpen(current => !current);
  };

  const handleCustomerEdit = () => {
    return <CustomerDialog setOpen={setOpen} current={currentCustomer} />;
  };

  return (
    <>
      <DefaultList
        title="Clientes"
        handleOpen={handleOpen}
        toolbarIcon={mdiPlusCircle}
        iconTitle="Adicionar Cliente"
        working={working}
        itemList={customerList}
        itemCount={registerCount}
        decorator={methods}
      />

      <Modal open={open} setOpen={setOpen}>
        <div>{handleCustomerEdit()}</div>
      </Modal>
    </>
  );
}
