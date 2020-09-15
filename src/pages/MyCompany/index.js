import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiAccountSearch, mdiDelete } from '@mdi/js';

import Modal from '../../components/Modals';
import Asks from '../../components/Dialogs/Asks';
import DefaultInput from '../../components/DefaultInput/Input';

import { setCompany } from '../../store/modules/company/actions';
import { validateCompany } from '../../Schemas/globalSchemas';

import {
  getCompanyInfo,
  handleUpload,
  handleSubmit,
  handleCepSearch,
} from './methods';

import {
  Toolbar,
  ToolbarTitle,
  Container,
  Row,
  Form,
  SearchContainer,
  SubmitButton,
  SearchButton,
  LoadingScreen,
  CompanyImage,
  UploadImage,
  RemoveButton,
} from './styles';

function MyCompany() {
  const formRef = useRef(null);
  const [working, setWorking] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});
  const [companyLogo, setCompanyLogo] = useState({});
  const [attachmentId, setAttachmentId] = useState(undefined);
  const [searching, setSearching] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [, setOpen] = useState(false);

  const dispatch = useDispatch();

  const getCompany = async () => {
    const { company, companyImage } = await getCompanyInfo();
    setCompanyInfo(company);
    setCompanyLogo(companyImage);
  };

  useEffect(() => {
    if (working) return;
    setWorking(true);
    getCompany();
  }, [working]);

  const handleClickToUpload = () => {
    const $el = document.getElementById('uploadElementButton');
    $el.click();
  };

  const handleUploadMethod = e =>
    handleUpload(e, setCompanyLogo, setAttachmentId);

  const handleSubmitMethod = data =>
    handleSubmit(
      data,
      formRef,
      validateCompany,
      companyInfo,
      attachmentId,
      dispatch,
      setCompany,
      companyLogo
    );

  const handleCepSearchMethod = () =>
    handleCepSearch(formRef, setSearching, setCompanyInfo, companyInfo);

  function handleOpenAskDialog() {
    setAskOpen(asking => !asking);
  }

  function handleCloseReturn() {
    dispatch(setCompany(companyInfo.fantasyName, undefined));
    setCompanyLogo({});
  }

  const handleAskDialog = () => {
    return (
      <Asks
        setAskOpen={handleOpenAskDialog}
        registerId={
          companyLogo && companyLogo._id ? companyLogo._id : attachmentId
        }
        apiToCall="/api/v1/attachments/"
        forceReload={false}
        closeReturn={handleCloseReturn}
      />
    );
  };

  return (
    <>
      <Toolbar>
        <ToolbarTitle>Minha Empresa</ToolbarTitle>
      </Toolbar>
      <Container loading={searching ? 'true' : null}>
        {searching ? (
          <LoadingScreen />
        ) : (
          <Form ref={formRef} onSubmit={handleSubmitMethod}>
            <Row>
              <DefaultInput
                width="100"
                name="companyName"
                type="text"
                placeholder="Razão Social"
                defaultValue={companyInfo.companyName}
                disabled
              />
              <DefaultInput
                name="cnpj"
                type="text"
                placeholder="Seu CNPJ"
                defaultValue={companyInfo._cnpj}
                disabled
              />
            </Row>
            <Row>
              <DefaultInput
                name="fantasyName"
                type="text"
                placeholder="Nome Fantasia"
                defaultValue={companyInfo.fantasyName}
              />
            </Row>
            <Row>
              <DefaultInput
                name="email"
                type="text"
                placeholder="E-mail"
                defaultValue={companyInfo.email}
              />
              <DefaultInput
                maxLength="15"
                name="phone"
                type="text"
                placeholder="Seu telefone"
                defaultValue={companyInfo._phone}
              />
            </Row>
            <Row>
              <SearchContainer>
                <DefaultInput
                  width="30"
                  name="address.cep"
                  type="text"
                  placeholder="Cep"
                  defaultValue={
                    companyInfo.address ? companyInfo.address.cep : ''
                  }
                />
                <SearchButton onClick={handleCepSearchMethod}>
                  <Icon
                    path={mdiAccountSearch}
                    title="Buscar Cep"
                    size="30px"
                    color="#333"
                  />
                </SearchButton>
              </SearchContainer>
              <DefaultInput
                name="address.address"
                type="text"
                placeholder="Endereço"
                defaultValue={
                  companyInfo.address ? companyInfo.address.address : ''
                }
                disabled
              />
              <DefaultInput
                name="address.neighborhood"
                type="text"
                placeholder="Bairro"
                defaultValue={
                  companyInfo.address ? companyInfo.address.neighborhood : ''
                }
                disabled
              />
              <DefaultInput
                name="address.number"
                type="text"
                placeholder="Número"
                defaultValue={
                  companyInfo.address ? companyInfo.address.number : ''
                }
              />
            </Row>
            <Row>
              <DefaultInput
                name="address.additional"
                type="text"
                placeholder="Complemento"
                defaultValue={
                  companyInfo.address ? companyInfo.address.additional : ''
                }
              />
              <DefaultInput
                name="address.city"
                type="text"
                placeholder="Cidade"
                defaultValue={
                  companyInfo.address ? companyInfo.address.city : ''
                }
                disabled
              />
              <DefaultInput
                name="address.state"
                type="text"
                placeholder="Estado"
                defaultValue={
                  companyInfo.address ? companyInfo.address.state : ''
                }
                disabled
              />
            </Row>
            <Row>
              <input
                id="uploadElementButton"
                hidden
                type="file"
                onChange={e => handleUploadMethod(e)}
              />
              {!companyLogo.fileLink ? (
                <UploadImage type="button" onClick={handleClickToUpload}>
                  Adicionar Imagem
                </UploadImage>
              ) : null}
              {companyLogo.fileLink ? (
                <CompanyImage>
                  <img src={companyLogo.fileLink} alt="Company Logo" />
                  <RemoveButton type="button" onClick={handleOpenAskDialog}>
                    <Icon
                      path={mdiDelete}
                      title="Buscar Cep"
                      size="20px"
                      color="#333"
                    />
                  </RemoveButton>
                </CompanyImage>
              ) : null}
            </Row>
            <Row>
              <p />
              <SubmitButton>Salvar</SubmitButton>
            </Row>
          </Form>
        )}
      </Container>

      <Modal open={askOpen} setOpen={setOpen}>
        <div>{handleAskDialog()}</div>
      </Modal>
    </>
  );
}

export default connect()(MyCompany);
