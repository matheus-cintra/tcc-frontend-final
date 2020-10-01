import React, { useState, useEffect } from 'react';
import { mdiPlusCircle } from '@mdi/js';
import DefaultList from '../../components/DefaultList';
import Modal from '../../components/Modals';
import BillingDialog from '../../components/Dialogs/Billings/BillingsDialog';
import methods from './methods';

export default function Billing() {
  const [working, setWorking] = useState(false);
  const [billingList, setBillingList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentBilling, setCurrentBilling] = useState({});
  const [registerCount, setRegisterCount] = useState(0);

  const getBillings = async (initial, limit, skip) => {
    if (open) return;
    let dataBillings;
    if (initial) {
      dataBillings = await methods.getRegisters('15', undefined);
    } else {
      dataBillings = await methods.getRegisters(limit, skip);
    }

    setBillingList(dataBillings.docs);
    setRegisterCount(dataBillings.docCount);
    setWorking(false);
  };

  useEffect(() => {
    setWorking(true);
    getBillings(true);
  }, []); //eslint-disable-line

  useEffect(() => {
    if (working) return;
    getBillings(true);
  }, [open]); //eslint-disable-line

  const handleOpen = billing => {
    setCurrentBilling(billing);
    setOpen(current => !current);
  };

  const handleBillingEdit = () => {
    return <BillingDialog setOpen={setOpen} current={currentBilling} />;
  };

  return (
    <>
      <DefaultList
        title="Faturamentos"
        handleOpen={handleOpen}
        toolbarIcon={mdiPlusCircle}
        iconTitle="Adicionar Faturamento"
        working={working}
        itemList={billingList}
        itemCount={registerCount}
        decorator={methods}
      />

      <Modal open={open} setOpen={setOpen}>
        <div>{handleBillingEdit()}</div>
      </Modal>
    </>
  );
}
