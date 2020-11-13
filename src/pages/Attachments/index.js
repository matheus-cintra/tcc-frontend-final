import React, { useState, useEffect } from 'react';
import { mdiPlusCircle } from '@mdi/js';
import DefaultList from '../../components/DefaultList';
import Modal from '../../components/Modals';
import AttachmentDialog from '../../components/Dialogs/Attachments/AttachmentsDialog';
import methods from './methods';

export default function Attachments() {
  const [working, setWorking] = useState(false);
  const [attachmentList, setAttachmentList] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentAttachment, setCurrentAttachment] = useState({});
  const [registerCount, setRegisterCount] = useState(0);

  const getAttachments = async (initial, limit, skip) => {
    if (open) return;
    let dataAttachments;
    if (initial) {
      dataAttachments = await methods.getRegisters('15', undefined);
    } else {
      dataAttachments = await methods.getRegisters(limit, skip);
    }

    setAttachmentList(dataAttachments.docs);
    setRegisterCount(dataAttachments.docCount);
    setWorking(false);
  };

  useEffect(() => {
    setWorking(true);
    getAttachments(true);
  }, []); //eslint-disable-line

  useEffect(() => {
    if (working) return;
    getAttachments(true);
  }, [open]); //eslint-disable-line

  const handleOpen = attachment => {
    setCurrentAttachment(attachment);
    setOpen(current => !current);
  };

  const handleAttachmentEdit = () => {
    return <AttachmentDialog setOpen={setOpen} current={currentAttachment} />;
  };

  return (
    <>
      <DefaultList
        title="Anexos"
        handleOpen={handleOpen}
        toolbarIcon={mdiPlusCircle}
        iconTitle="Adicionar Anexo"
        working={working}
        itemList={attachmentList}
        itemCount={registerCount}
        decorator={methods}
      />

      <Modal open={open} setOpen={setOpen}>
        <div>{handleAttachmentEdit()}</div>
      </Modal>
    </>
  );
}
