import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiClose, mdiDelete } from '@mdi/js';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import FloatLabelInput from '../../FloatLabel/Input';

import { handleDispatchEvents } from './methods';

import Modal from '../../Modals';
import Asks from './Asks';

import {
  Container,
  Toolbar,
  Title,
  Form,
  BottomActions,
  RowContainer,
  FloatingLabelInputContainer,
  FloatingLabel,
  UploadImage,
  AttachmentContainer,
  RemoveButton,
  Scroll,
  LoadingContainer,
  TextLoadingDocuments,
  LoadingScreen,
} from './styles';

function AttachmentDialog({ setOpen, current }) {
  const documentId = current._id;
  const formRef = useRef(null);
  const [askOpen, setAskOpen] = useState(false);
  const [attachmentId, setAttachmentId] = useState([]);
  const [attachment, setAttachment] = useState([]);
  const [attaching, setAttaching] = useState(false);

  const [inputActive, setInputActive] = useState({
    code: false,
    name: false,
    description: false,
  });

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome Obrigatório'),
  });

  const handleClose = () => {
    setOpen(open => !open);
  };

  async function handleSubmit(data) {
    try {
      await schema.validate(data, {
        abortEarly: false,
      });

      const ds = {
        name: data.name,
        description: data.description,
        attachmentsIds: attachmentId,
      };

      const result = documentId
        ? await api.put(`/api/v1/attachments-module/${documentId}`, {
            ...ds,
          })
        : await api.post('/api/v1/attachments-module/', { ...ds });

      if (!result.data.success) {
        return toast.error('Eror ao atualizar anexo.');
      }

      if (documentId) {
        toast.success('Anexo Atualizado.');
      } else {
        toast.success('Anexo Criado.');
      }

      handleClose();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });

        formRef.current.setErrors(errorMessages);
      } else {
        toast.error(error.response.data.data.message);
      }
    }
  }

  const handleClickToUpload = el => {
    const $el = document.getElementById(el);
    $el.click();
  };

  async function handleUpload(e, el) {
    setAttaching(true);
    const $el = document.getElementById(el);
    const files = e.target.files[0];
    const result = await api.post('/api/v1/tools/get-signed-url', {
      fileName: files.name,
      fileSize: files.size,
    });
    fetch(result.data.doc.url, { method: 'PUT', body: files })
      .then(() => {
        setAttachment([...attachment, result.data.doc]);
        setAttachmentId([...attachmentId, result.data.doc.attachmentId]);
        $el.value = '';
        setAttaching(false);
      })
      .catch(() => {
        setAttaching(false);
        toast.error('Falha ao anexar arquivo. Tente novamente.');
        $el.value = '';
      });
  }

  const handleRemoveAttachment = attachDoc => {
    const attachAfter = attachment;
    const attachIdAfter = attachmentId;
    const idx = attachment.findIndex(x => x._id === attachDoc._id);
    const idxId = attachmentId.indexOf(attachDoc._id);

    if (idx > -1 && idxId > -1) {
      attachAfter.splice(idx, 1);
      attachIdAfter.splice(idxId, 1);
      setAttachment([...attachAfter]);
      setAttachmentId([...attachIdAfter]);
    }
  };

  const handleCloseReturn = () => {
    handleClose();
  };

  const handleOpenAskDialog = () => {
    setAskOpen(asking => !asking);
  };

  const handleAskDialog = () => {
    return (
      <Asks
        setAskOpen={setAskOpen}
        documentId={documentId}
        handleClose={handleCloseReturn}
      />
    );
  };

  useEffect(() => {
    setTimeout(() => {
      if (documentId) {
        handleDispatchEvents(current);
        setAttachment(current.attachments);
        setAttachmentId(current.attachmentsIds);
      }
    }, 50);
  }, [current, documentId]);

  return (
    <>
      <Toolbar>
        <Title>{documentId ? 'Editar Anexo' : 'Novo Anexo'}</Title>
        <Icon
          path={mdiClose}
          title="Close"
          size={1}
          color="#FFF"
          onClick={handleClose}
          style={{ cursor: 'pointer' }}
        />
      </Toolbar>
      {documentId ? (
        <>
          <LoadingContainer style={{ display: attaching ? 'flex' : 'none' }}>
            <TextLoadingDocuments>Anexando</TextLoadingDocuments>
            <LoadingScreen />
          </LoadingContainer>
          <Container style={{ display: attaching ? 'none' : 'flex' }}>
            <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
              <RowContainer>
                <FloatingLabelInputContainer style={{ width: '290px' }}>
                  <FloatingLabel htmlFor="code" active={inputActive.code}>
                    Código (Auto)
                  </FloatingLabel>
                  <FloatLabelInput
                    id="code"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, code: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          code: false,
                        });
                      }
                    }}
                    name="code"
                    defaultValue={current.code}
                    disabled
                  />
                </FloatingLabelInputContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel htmlFor="name" active={inputActive.name}>
                    Nome do Anexo
                  </FloatingLabel>
                  <FloatLabelInput
                    id="name"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, name: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          name: false,
                        });
                      }
                    }}
                    name="name"
                    defaultValue={current.name}
                  />
                </FloatingLabelInputContainer>
              </RowContainer>
              <RowContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="description"
                    active={inputActive.description}
                  >
                    Descrição
                  </FloatingLabel>
                  <FloatLabelInput
                    id="description"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, description: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          description: false,
                        });
                      }
                    }}
                    name="description"
                    defaultValue={current.description}
                  />
                </FloatingLabelInputContainer>
              </RowContainer>
              <RowContainer style={{ justifyContent: 'center' }}>
                <input
                  id="uploadElementButton"
                  hidden
                  type="file"
                  onChange={e => handleUpload(e, 'uploadElementButton')}
                />
                <UploadImage
                  type="button"
                  onClick={() => handleClickToUpload('uploadElementButton')}
                >
                  Adicionar Anexo
                </UploadImage>
              </RowContainer>
              {attachment && attachment.length > 0 ? (
                <Scroll options={{ suppressScrollX: true }}>
                  {attachment.map(item => (
                    <RowContainer
                      key={item._id}
                      style={{ padding: '0 10px 5px 10px' }}
                    >
                      <AttachmentContainer>
                        <a
                          href={item.fileLink}
                          rel="noopener noreferrer"
                          target="_blank"
                          download
                        >
                          {item.fileName}
                        </a>
                        <RemoveButton
                          type="button"
                          onClick={() => handleRemoveAttachment(item)}
                        >
                          <Icon
                            path={mdiDelete}
                            title="Remover Anexo"
                            size="20px"
                            color="#333"
                          />
                        </RemoveButton>
                      </AttachmentContainer>
                    </RowContainer>
                  ))}
                </Scroll>
              ) : null}
            </Form>
          </Container>
        </>
      ) : (
        <>
          <LoadingContainer style={{ display: attaching ? 'flex' : 'none' }}>
            <TextLoadingDocuments>Anexando</TextLoadingDocuments>
            <LoadingScreen />
          </LoadingContainer>
          <Container style={{ display: attaching ? 'none' : 'flex' }}>
            <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
              <RowContainer>
                <FloatingLabelInputContainer style={{ width: '290px' }}>
                  <FloatingLabel htmlFor="code" active={inputActive.code}>
                    Código (Auto)
                  </FloatingLabel>
                  <FloatLabelInput
                    id="code"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, code: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          code: false,
                        });
                      }
                    }}
                    name="code"
                    disabled
                  />
                </FloatingLabelInputContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel htmlFor="name" active={inputActive.name}>
                    Nome do Anexo
                  </FloatingLabel>
                  <FloatLabelInput
                    id="name"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, name: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          name: false,
                        });
                      }
                    }}
                    name="name"
                  />
                </FloatingLabelInputContainer>
              </RowContainer>
              <RowContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel
                    htmlFor="description"
                    active={inputActive.description}
                  >
                    Descrição
                  </FloatingLabel>
                  <FloatLabelInput
                    id="description"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, description: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({
                          ...inputActive,
                          description: false,
                        });
                      }
                    }}
                    name="description"
                  />
                </FloatingLabelInputContainer>
              </RowContainer>
              <RowContainer style={{ justifyContent: 'center' }}>
                <input
                  id="uploadElementButton"
                  hidden
                  type="file"
                  onChange={e => handleUpload(e, 'uploadElementButton')}
                />
                <UploadImage
                  type="button"
                  onClick={() => handleClickToUpload('uploadElementButton')}
                >
                  Adicionar Anexo
                </UploadImage>
              </RowContainer>
              {attachment && attachment.length > 0 ? (
                <Scroll options={{ suppressScrollX: true }}>
                  {attachment.map(item => (
                    <RowContainer
                      key={item.attachmentId}
                      style={{ padding: '0 10px 5px 10px' }}
                    >
                      <AttachmentContainer>
                        <a
                          href={item.fileLink}
                          rel="noopener noreferrer"
                          target="_blank"
                          download
                        >
                          {item.fileName}
                        </a>
                        <RemoveButton
                          type="button"
                          onClick={() => handleRemoveAttachment(item)}
                        >
                          <Icon
                            path={mdiDelete}
                            title="Remover Anexo"
                            size="20px"
                            color="#333"
                          />
                        </RemoveButton>
                      </AttachmentContainer>
                    </RowContainer>
                  ))}
                </Scroll>
              ) : null}
            </Form>
          </Container>
        </>
      )}
      <BottomActions>
        <Icon
          path={mdiDelete}
          title="Remove"
          size={1.2}
          color="#333"
          onClick={handleOpenAskDialog}
        />
        <button type="submit" form="editForm">
          Salvar
        </button>
      </BottomActions>

      <Modal open={askOpen} setOpen={setOpen}>
        <div>{handleAskDialog()}</div>
      </Modal>
    </>
  );
}

export default AttachmentDialog;

AttachmentDialog.propTypes = {
  setOpen: PropTypes.func.isRequired,
  current: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
