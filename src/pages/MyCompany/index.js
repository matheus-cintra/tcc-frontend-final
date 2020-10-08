import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiAccountSearch, mdiDelete } from '@mdi/js';

import Modal from '../../components/Modals';
import Asks from '../../components/Dialogs/Asks';

import { setCompany } from '../../store/modules/company/actions';
import { validateCompany } from '../../Schemas/globalSchemas';

import FloatLabelInput from '../../components/FloatLabel/Input';

import {
  getCompanyInfo,
  handleUpload,
  handleSubmit,
  handleCepSearch,
  handleInitialFlotaingLabels,
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
  LoadingContainer,
  TextLoadingDocuments,
  FloatingLabelInputContainer,
  FloatingLabel,
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
  const [inputActive, setInputActive] = useState({
    companyName: false,
    cnpj: false,
    fantasyName: false,
    email: false,
    phone: false,
  });

  const dispatch = useDispatch();

  const getCompany = async () => {
    setSearching(true);
    const { company, companyImage } = await getCompanyInfo();
    setSearching(false);
    setCompanyInfo(company);
    setCompanyLogo(companyImage);
    handleInitialFlotaingLabels(formRef);
  };

  useEffect(() => {
    if (working) return;
    setWorking(true);
    getCompany();
  }, [working]); //eslint-disable-line

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
      companyLogo,
      setCompanyInfo
    );

  const handleCepSearchMethod = () =>
    handleCepSearch(
      formRef,
      setSearching,
      setCompanyInfo,
      companyInfo,
      handleInitialFlotaingLabels
    );

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
          <LoadingContainer>
            <TextLoadingDocuments>
              Carregando Dados da Empresas
            </TextLoadingDocuments>
            <LoadingScreen />
          </LoadingContainer>
        ) : (
          <Form ref={formRef} onSubmit={handleSubmitMethod}>
            <Row>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="companyName"
                  active={inputActive.companyName}
                >
                  Razão Social
                </FloatingLabel>
                <FloatLabelInput
                  id="companyName"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, companyName: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({ ...inputActive, companyName: false });
                    }
                  }}
                  defaultValue={companyInfo.companyName}
                  name="companyName"
                  disabled
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel htmlFor="cnpj" active={inputActive.cnpj}>
                  CNPJ
                </FloatingLabel>
                <FloatLabelInput
                  id="cnpj"
                  type="text"
                  onFocus={() => setInputActive({ ...inputActive, cnpj: true })}
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({ ...inputActive, cnpj: false });
                    }
                  }}
                  defaultValue={companyInfo._cnpj}
                  name="cnpj"
                  disabled
                />
              </FloatingLabelInputContainer>
            </Row>
            <Row>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="fantasyName"
                  active={inputActive.fantasyName}
                >
                  Nome Fantasia
                </FloatingLabel>
                <FloatLabelInput
                  id="fantasyName"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, fantasyName: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({ ...inputActive, fantasyName: false });
                    }
                  }}
                  defaultValue={companyInfo.fantasyName}
                  name="fantasyName"
                  style={{ textTransform: 'capitalize' }}
                />
              </FloatingLabelInputContainer>
            </Row>
            <Row>
              <FloatingLabelInputContainer>
                <FloatingLabel htmlFor="email" active={inputActive.email}>
                  Email
                </FloatingLabel>
                <FloatLabelInput
                  id="email"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, email: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({ ...inputActive, email: false });
                    }
                  }}
                  defaultValue={companyInfo.email}
                  name="email"
                  style={{ textTransform: 'lowercase' }}
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel htmlFor="phone" active={inputActive.phone}>
                  Telefone
                </FloatingLabel>
                <FloatLabelInput
                  id="phone"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, phone: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({ ...inputActive, phone: false });
                    }
                  }}
                  defaultValue={companyInfo._phone}
                  name="phone"
                  maxLength="15"
                />
              </FloatingLabelInputContainer>
            </Row>
            <Row>
              <SearchContainer>
                <FloatingLabelInputContainer>
                  <FloatingLabel htmlFor="cep" active={inputActive.cep}>
                    CEP
                  </FloatingLabel>
                  <FloatLabelInput
                    id="cep"
                    type="text"
                    onFocus={() =>
                      setInputActive({ ...inputActive, cep: true })
                    }
                    onBlur={e => {
                      if (e.target.value === '') {
                        setInputActive({ ...inputActive, cep: false });
                      }
                    }}
                    defaultValue={
                      companyInfo.address ? companyInfo.address.cep : ''
                    }
                    name="address.cep"
                  />
                </FloatingLabelInputContainer>
                <SearchButton onClick={handleCepSearchMethod}>
                  <Icon
                    path={mdiAccountSearch}
                    title="Buscar Cep"
                    size="30px"
                    color="#333"
                  />
                </SearchButton>
              </SearchContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel htmlFor="address" active={inputActive.address}>
                  Endereço
                </FloatingLabel>
                <FloatLabelInput
                  id="address"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, address: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({ ...inputActive, address: false });
                    }
                  }}
                  defaultValue={
                    companyInfo.address ? companyInfo.address.address : ''
                  }
                  name="address.address"
                  disabled
                  style={{ textTransform: 'capitalize' }}
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="address"
                  active={inputActive.neighborhood}
                >
                  Bairro
                </FloatingLabel>
                <FloatLabelInput
                  id="neighborhood"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, neighborhood: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({ ...inputActive, neighborhood: false });
                    }
                  }}
                  defaultValue={
                    companyInfo.address ? companyInfo.address.neighborhood : ''
                  }
                  name="address.neighborhood"
                  style={{ textTransform: 'capitalize' }}
                  disabled
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel htmlFor="number" active={inputActive.number}>
                  Número
                </FloatingLabel>
                <FloatLabelInput
                  id="number"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, number: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({ ...inputActive, number: false });
                    }
                  }}
                  defaultValue={
                    companyInfo.address ? companyInfo.address.number : ''
                  }
                  name="address.number"
                />
              </FloatingLabelInputContainer>
            </Row>
            <Row>
              <FloatingLabelInputContainer>
                <FloatingLabel
                  htmlFor="additional"
                  active={inputActive.additional}
                >
                  Complemento
                </FloatingLabel>
                <FloatLabelInput
                  id="additional"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, additional: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({ ...inputActive, additional: false });
                    }
                  }}
                  defaultValue={
                    companyInfo.address ? companyInfo.address.additional : ''
                  }
                  name="address.additional"
                  style={{ textTransform: 'capitalize' }}
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel htmlFor="city" active={inputActive.city}>
                  Cidade
                </FloatingLabel>
                <FloatLabelInput
                  id="city"
                  type="text"
                  onFocus={() => setInputActive({ ...inputActive, city: true })}
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({ ...inputActive, city: false });
                    }
                  }}
                  defaultValue={
                    companyInfo.address ? companyInfo.address.city : ''
                  }
                  name="address.city"
                  style={{ textTransform: 'capitalize' }}
                  disabled
                />
              </FloatingLabelInputContainer>

              <FloatingLabelInputContainer>
                <FloatingLabel htmlFor="state" active={inputActive.state}>
                  Estado
                </FloatingLabel>
                <FloatLabelInput
                  id="state"
                  type="text"
                  onFocus={() =>
                    setInputActive({ ...inputActive, state: true })
                  }
                  onBlur={e => {
                    if (e.target.value === '') {
                      setInputActive({ ...inputActive, state: false });
                    }
                  }}
                  defaultValue={
                    companyInfo.address ? companyInfo.address.state : ''
                  }
                  name="address.state"
                  disabled
                />
              </FloatingLabelInputContainer>
            </Row>
            <Row>
              <input
                id="uploadElementButton"
                hidden
                type="file"
                onChange={e => handleUploadMethod(e)}
              />
              {!companyLogo.fileLink ? (
                <CompanyImage>
                  <UploadImage type="button" onClick={handleClickToUpload}>
                    Adicionar Logotipo
                  </UploadImage>
                </CompanyImage>
              ) : null}
              {companyLogo.fileLink ? (
                <CompanyImage>
                  <span>Logotipo da Empresa</span>
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
