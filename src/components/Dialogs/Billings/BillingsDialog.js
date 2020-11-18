import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiClose, mdiTrashCan, mdiFile, mdiDelete } from '@mdi/js';
import { toast } from 'react-toastify';
import history from '../../../services/history';
import api from '../../../services/api';
import Divider from '../../Divider';
import Modal from '../../Modals';
import Asks from './Asks';

import {
  clearSuggestions,
  autocompleteChange,
  filterArray,
  selectSuggestion,
} from './methods';

import {
  Container,
  Toolbar,
  Title,
  Form,
  BottomActions,
  RowContainer,
  InputContainer,
  AutoCompleteResult,
  AutocompleteContainer,
  Autocomplete,
  NoAutocompleteSuggestion,
  FloatingLabel,
  DanfeImage,
  UploadImage,
  RemoveButton,
  LoadingContainer,
  TextLoadingDocuments,
  LoadingScreen,
} from './styles';

function BillingDialog({ setOpen, current, serviceOrders }) {
  const billingId = current._id;
  const formRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [inputServiceOrder, setServiceOrderInput] = useState('');
  const [autocompleteServiceOrders, setAutocompleteServiceOrders] = useState(
    []
  );
  const [noServiceOrderSuggestions, setNoServiceOrderSuggestions] = useState(
    false
  );
  const [selectedServiceOrder, setSelectedServiceOrder] = useState({});
  const [danfe, setDanfe] = useState(undefined);
  const [danfeId, setDanfeId] = useState(undefined);
  const [xml, setXml] = useState(undefined);
  const [xmlId, setXmlId] = useState(undefined);
  const [inputActive, setInputActive] = useState({
    serviceOrder: false,
  });
  const [attaching, setAttaching] = useState(false);

  useEffect(() => {
    const elServiceOrder = document.getElementById(
      'autocompleteServiceOrderId'
    );
    elServiceOrder.addEventListener('keyup', e => {
      if (e.key === 'Backspace') {
        if (e.target.value === '') {
          setNoServiceOrderSuggestions(false);
        }
        setServiceOrderInput(e.target.value);
      }
      if (e.key === 'Delete') {
        if (e.target.value === '') {
          setNoServiceOrderSuggestions(false);
        }
        setServiceOrderInput(e.target.value);
      }
    });
  }, []);

  const handleClose = () => {
    if (submitting) return;
    setOpen(open => !open);
  };

  const handleClickToUpload = el => {
    const $el = document.getElementById(el);
    $el.click();
  };

  async function handleUpload(e, setInfo, setInfoId, el) {
    setAttaching(true);
    const $el = document.getElementById(el);
    const files = e.target.files[0];
    const result = await api.post('/api/v1/tools/get-signed-url', {
      fileName: files.name,
      fileSize: files.size,
    });
    fetch(result.data.doc.url, { method: 'PUT', body: files })
      .then(() => {
        setInfo(result.data.doc);
        setInfoId(result.data.doc.attachmentId);
        $el.value = '';
        setAttaching(false);
      })
      .catch(() => {
        setAttaching(false);
        toast.error('Falha ao anexar arquivo. Tente novamente.');
        $el.value = '';
      });
  }

  const handleUploadMethod = async (e, el, type) => {
    switch (type) {
      case 'danfe':
        handleUpload(e, setDanfe, setDanfeId, el);
        break;

      case 'xml':
        handleUpload(e, setXml, setXmlId, el);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const dataSet = {
        serviceOrderId: selectedServiceOrder._id,
        serviceId:
          current && current.service && current.service.length > 0
            ? current.service[0]._id
            : selectedServiceOrder.service[0]._id,
        xmlId: xmlId && xmlId,
        danfeId: danfeId && danfeId,
      };

      const result = billingId
        ? await api.put(`/api/v1/billings/${billingId}`, { ...dataSet })
        : await api.post('/api/v1/billings', { ...dataSet });

      if (!result.data.success) {
        return toast.error('Eror ao atualizar a entrada da nota.');
      }

      if (billingId) {
        toast.success('Entrada Atualizada.');
      } else {
        toast.success('Entrada de Nota Fiscal Criada.');
      }

      handleClose();
    } catch (error) {
      toast.error(error);
    }
  };
  // submit(
  //   {
  //     data,
  //     serviceOrder: selectedServiceOrder,
  //   },
  //   setSubmitting,
  //   formRef,
  //   billingId,
  //   handleClose
  // );

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
        billingId={billingId}
        handleClose={handleCloseReturn}
      />
    );
  };

  const getSuggestionValue = suggestion => suggestion.service[0].name;

  const renderSuggestion = suggestion => (
    <AutocompleteContainer>
      <AutoCompleteResult>{suggestion.service[0].name}</AutoCompleteResult>
    </AutocompleteContainer>
  );

  const clearServiceOrderRequest = () =>
    clearSuggestions(setAutocompleteServiceOrders);

  const handleAutocompleteServiceOrderChange = (e, { newValue }) => {
    autocompleteChange(newValue, setSelectedServiceOrder, setServiceOrderInput);
  };

  const filterSuggestions = (value, type) => {
    switch (type) {
      case 'serviceOrder':
        if (value !== selectedServiceOrder.name) {
          setSelectedServiceOrder({});
        }
        filterArray(
          value,
          serviceOrders,
          selectedServiceOrder,
          setNoServiceOrderSuggestions,
          setAutocompleteServiceOrders
        );
        break;

      default:
        break;
    }
  };

  const handleOnFocus = el => {
    setInputActive({ ...inputActive, [el]: true });
  };

  const handleBlur = (e, el) => {
    if (e.target.value === '') {
      setInputActive({ ...inputActive, [el]: false });
    }
  };

  const serviceOrderInputProps = {
    value: inputServiceOrder,
    onChange: handleAutocompleteServiceOrderChange,
    name: 'autocompleteServiceOrder',
    id: 'autocompleteServiceOrderId',
    onBlur: e => handleBlur(e, 'serviceOrder'),
    onFocus: () => handleOnFocus('serviceOrder'),
    disabled: !!billingId,
  };

  const handleSuggestionSelect = (suggestion, type) => {
    switch (type) {
      case 'serviceOrder': {
        selectSuggestion(
          suggestion,
          setSelectedServiceOrder,
          formRef,
          'serviceOrderName'
        );
        break;
      }

      default:
        break;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (billingId) {
        setInputActive({ ...inputActive, serviceOrder: true });
        setSelectedServiceOrder(current.serviceOrder[0]);
        setServiceOrderInput(current.service[0].name);
      }
    }, 100);
  }, []); //eslint-disable-line

  const handleNoServiceOrder = () => history.push('/serviceOrder');

  return (
    <>
      <Toolbar>
        <Title>{billingId ? 'Editar Faturamento' : 'Novo Faturamento'}</Title>
        <Icon
          path={mdiClose}
          title="Close"
          size={1}
          color="#FFF"
          onClick={handleClose}
          style={{ cursor: submitting ? 'default' : 'pointer' }}
        />
      </Toolbar>
      {billingId ? (
        <>
          <LoadingContainer style={{ display: attaching ? 'flex' : 'none' }}>
            <TextLoadingDocuments>Anexando</TextLoadingDocuments>
            <LoadingScreen />
          </LoadingContainer>
          <Container style={{ display: attaching ? 'none' : 'flex' }}>
            <Form ref={formRef} onSubmit={handleSubmit} id="editForm">
              <fieldset disabled={submitting}>
                <Divider>Dados da Faturamento</Divider>
                <RowContainer>
                  <InputContainer
                    style={{ marginRight: '5px', display: 'flex' }}
                  >
                    <FloatingLabel
                      htmlFor="autocompleteServiceOrderId"
                      active={inputActive.serviceOrder}
                    >
                      Ordem de Serviço
                    </FloatingLabel>
                    <Autocomplete
                      suggestions={autocompleteServiceOrders}
                      onSuggestionsFetchRequested={({ value }) =>
                        filterSuggestions(value, 'serviceOrder')
                      }
                      onSuggestionsClearRequested={clearServiceOrderRequest}
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={serviceOrderInputProps}
                      onSuggestionSelected={(e, { suggestion }) =>
                        handleSuggestionSelect(suggestion, 'serviceOrder')
                      }
                      name="serviceOrderName"
                    />
                    {noServiceOrderSuggestions ? (
                      <NoAutocompleteSuggestion onClick={handleNoServiceOrder}>
                        Nenhuma ordem de serviço encontrada. Clique para
                        adicionar.
                      </NoAutocompleteSuggestion>
                    ) : null}
                  </InputContainer>
                </RowContainer>
                <Divider>Danfe | XML</Divider>
                <RowContainer style={{ justifyContent: 'space-around' }}>
                  <input
                    id="uploadDanfeElementButton"
                    hidden
                    type="file"
                    onChange={e =>
                      handleUploadMethod(e, 'uploadDanfeElementButton', 'danfe')
                    }
                  />
                  <input
                    id="uploadXmlElementButton"
                    hidden
                    type="file"
                    onChange={e =>
                      handleUploadMethod(e, 'uploadXmlElementButton', 'xml')
                    }
                  />
                  {current && current._danfe.length === 0 && !danfe ? (
                    <DanfeImage>
                      <UploadImage
                        type="button"
                        onClick={() =>
                          handleClickToUpload('uploadDanfeElementButton')
                        }
                      >
                        Adicionar Danfe
                      </UploadImage>
                    </DanfeImage>
                  ) : null}
                  {current && current._xml.length === 0 && !xml ? (
                    <DanfeImage>
                      <UploadImage
                        type="button"
                        onClick={() =>
                          handleClickToUpload('uploadXmlElementButton')
                        }
                      >
                        Adicionar XML
                      </UploadImage>
                    </DanfeImage>
                  ) : null}
                  {(current._danfe.length > 0 && current._danfe[0].fileLink) ||
                  danfe ? (
                    <DanfeImage>
                      <span>Danfe</span>
                      <a
                        href={
                          current._danfe.length > 0
                            ? current._danfe[0].fileLink
                            : danfe.fileLink
                        }
                        rel="noopener noreferrer"
                        target="_blank"
                        download
                      >
                        <Icon path={mdiFile} size={6} color="#CCC" />
                      </a>
                      <RemoveButton type="button" onClick={handleOpenAskDialog}>
                        <Icon
                          path={mdiDelete}
                          title="Remover Danfe"
                          size="20px"
                          color="#333"
                        />
                      </RemoveButton>
                    </DanfeImage>
                  ) : null}
                  {(current._xml.length > 0 && current._xml[0].fileLink) ||
                  xml ? (
                    <DanfeImage>
                      <span>XML</span>
                      <a
                        href={
                          current._xml.length > 0
                            ? current._xml[0].fileLink
                            : xml.fileLink
                        }
                        rel="noopener noreferrer"
                        target="_blank"
                        download
                      >
                        <Icon path={mdiFile} size={6} color="#CCC" />
                      </a>
                      <RemoveButton type="button" onClick={handleOpenAskDialog}>
                        <Icon
                          path={mdiDelete}
                          title="Remover XML"
                          size="20px"
                          color="#333"
                        />
                      </RemoveButton>
                    </DanfeImage>
                  ) : null}
                </RowContainer>
              </fieldset>
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
              <Divider>Dádos Básicos</Divider>
              <RowContainer>
                <InputContainer style={{ marginRight: '5px', display: 'flex' }}>
                  <FloatingLabel
                    htmlFor="autocompleteServiceOrderId"
                    active={inputActive.serviceOrder}
                  >
                    Ordem de Serviço
                  </FloatingLabel>
                  <Autocomplete
                    suggestions={autocompleteServiceOrders}
                    onSuggestionsFetchRequested={({ value }) =>
                      filterSuggestions(value, 'serviceOrder')
                    }
                    onSuggestionsClearRequested={clearServiceOrderRequest}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={serviceOrderInputProps}
                    onSuggestionSelected={(e, { suggestion }) =>
                      handleSuggestionSelect(suggestion, 'serviceOrder')
                    }
                    name="serviceOrderName"
                  />
                  {noServiceOrderSuggestions ? (
                    <NoAutocompleteSuggestion onClick={handleNoServiceOrder}>
                      Nenhuma ordem de serviço encontrada. Clique para
                      adicionar.
                    </NoAutocompleteSuggestion>
                  ) : null}
                </InputContainer>
              </RowContainer>

              <Divider>Danfe | XML</Divider>
              <RowContainer style={{ justifyContent: 'space-around' }}>
                <input
                  id="uploadDanfeElementButton"
                  hidden
                  type="file"
                  onChange={e =>
                    handleUploadMethod(e, 'uploadDanfeElementButton', 'danfe')
                  }
                />
                <input
                  id="uploadXmlElementButton"
                  hidden
                  type="file"
                  onChange={e =>
                    handleUploadMethod(e, 'uploadXmlElementButton', 'xml')
                  }
                />
                {!danfe || !danfe.fileLink ? (
                  <DanfeImage>
                    <UploadImage
                      type="button"
                      onClick={() =>
                        handleClickToUpload('uploadDanfeElementButton')
                      }
                    >
                      Adicionar Danfe
                    </UploadImage>
                  </DanfeImage>
                ) : null}
                {!xml || !xml.fileLink ? (
                  <DanfeImage>
                    <UploadImage
                      type="button"
                      onClick={() =>
                        handleClickToUpload('uploadXmlElementButton')
                      }
                    >
                      Adicionar XML
                    </UploadImage>
                  </DanfeImage>
                ) : null}
                {danfe && danfe.fileLink ? (
                  <DanfeImage>
                    <span>Danfe</span>
                    <a
                      href={danfe.fileLink}
                      rel="noopener noreferrer"
                      target="_blank"
                      download
                    >
                      <Icon path={mdiFile} size={6} color="#CCC" />
                    </a>
                    <RemoveButton type="button" onClick={handleOpenAskDialog}>
                      <Icon
                        path={mdiDelete}
                        title="Remover Danfe"
                        size="20px"
                        color="#333"
                      />
                    </RemoveButton>
                  </DanfeImage>
                ) : null}
                {xml && xml.fileLink ? (
                  <DanfeImage>
                    <span>XML</span>
                    <a
                      href={xml.fileLink}
                      rel="noopener noreferrer"
                      target="_blank"
                      download
                    >
                      <Icon path={mdiFile} size={6} color="#CCC" />
                    </a>
                    <RemoveButton type="button" onClick={handleOpenAskDialog}>
                      <Icon
                        path={mdiDelete}
                        title="Remover XML"
                        size="20px"
                        color="#333"
                      />
                    </RemoveButton>
                  </DanfeImage>
                ) : null}
              </RowContainer>
            </Form>
          </Container>
        </>
      )}
      <BottomActions>
        {billingId ? (
          <Icon
            path={mdiTrashCan}
            title="Remove"
            size={1.2}
            color="#333"
            onClick={handleOpenAskDialog}
          />
        ) : (
          <p />
        )}
        <button
          type="submit"
          form="editForm"
          disabled={submitting || !selectedServiceOrder._id}
          style={{
            cursor:
              submitting || !selectedServiceOrder._id ? 'default' : 'pointer',
            background:
              submitting || !selectedServiceOrder._id ? '#909090' : '#333',
          }}
        >
          Salvar
        </button>
      </BottomActions>

      <Modal open={askOpen} setOpen={setOpen}>
        <div>{handleAskDialog()}</div>
      </Modal>
    </>
  );
}

export default BillingDialog;

BillingDialog.propTypes = {
  setOpen: PropTypes.func.isRequired,
  current: PropTypes.oneOfType([PropTypes.object]).isRequired,
  serviceOrders: PropTypes.arrayOf(PropTypes.object),
};

BillingDialog.defaultProps = {
  serviceOrders: [],
};
