import React, { useState, useEffect } from 'react';
import { mdiPlusCircle, mdiFactory, mdiAccount } from '@mdi/js';
import DefaultList from '../../components/DefaultList';
import Modal from '../../components/Modals';
import CustomerDialog from '../../components/Dialogs/Customers/CustomersDialog';
import methods from './methods';

export default function Customer() {
  const [working, setWorking] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState({});

  const gerCustomers = async () => {
    if (open) return;

    const customers = await methods.getCustomersList();
    console.warn('customers > ', customers);
    setCustomerList(customers);
    setWorking(false);
  };

  useEffect(() => {
    setWorking(true);
    gerCustomers();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (working) return;
    gerCustomers();
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
        title="Customers"
        handleOpen={handleOpen}
        toolbarIcon={mdiPlusCircle}
        iconTitle="Adicionar Cliente"
        working={working}
        itemList={customerList}
        companyIcon={mdiFactory}
        personIcon={mdiAccount}
      />

      <Modal open={open} setOpen={setOpen}>
        <div>{handleCustomerEdit()}</div>
      </Modal>
    </>
  );
}
