import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiAccountSearch, mdiDelete } from '@mdi/js';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { getCompanyInfo } from './methods';
import helper from '../../helpers/helper';
import api from '../../services/api';

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

import DefaultInput from '../../components/DefaultInput/Input';

import { setCompany } from '../../store/modules/company/actions';

import { validateCompany } from '../../Schemas/globalSchemas';

function MyCompany() {
  const formRef = useRef(null);
  const [working, setWorking] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({});
  const [searching, setSearching] = useState(false);
  const [companyLogo, setCompanyLogo] = useState({});
  const [attachmentId, setAttachmentId] = useState(undefined);

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

  /** ************************* PRINT FORM IN CONSOLE ************************ */
  const root = document.getElementById('root');
  root.addEventListener('dblclick', () => {
    if (companyInfo._id) console.warn('myForm > ', companyInfo); //eslint-disable-line
  });
  /** ************************************************************************ */

  const handleClickToUpload = () => {
    const $el = document.getElementById('uploadElementButton');
    $el.click();
  };

  async function handleUpload(e) {
    const files = e.target.files[0];
    const result = await api.post('/api/v1/tools/get-signed-url', {
      fileName: files.name,
    });
    fetch(result.data.doc.url, { method: 'PUT', body: files })
      .then(() => {
        setCompanyLogo(result.data.doc);
        setAttachmentId(result.data.doc.attachmentId);
      })
      .catch(() => {
        toast.error('Falha ao anexar arquivo. Tente novamente.');
      });
  }

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      data.phone = helper.returnOnlyNumbers(data.phone);
      data.cnpj = helper.returnOnlyNumbers(data.cnpj);

      await validateCompany(data);

      data.address = {
        ...companyInfo.address,
        additional: data.address.additional,
        number: data.address.number,
      };

      if (attachmentId) data.documents = [attachmentId];

      await api.put(`/api/v1/company/${companyInfo._id}`, {
        ...data,
      });

      dispatch(setCompany(data.fantasyName, companyLogo.fileLink));

      toast.success('Empresa Atualizada.');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};

        error.inner.forEach(err => {
          errorMessages[err.path] = err.message;
        });

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  const handleCepSearch = async () => {
    const data = formRef.current.getData();
    if (!data.address.cep) return;
    setSearching(true);
    try {
      const result = await api.post(`/api/v1/getAddress/${data.address.cep}`);
      if (result.data.sucess) {
        setCompanyInfo({ ...companyInfo, address: result.data.data });
        setSearching(false);
      }
    } catch (err) {
      setSearching(false);
      return toast.error(err.response.data.data.message);
    }
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
          <Form ref={formRef} onSubmit={handleSubmit}>
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
                <SearchButton onClick={handleCepSearch}>
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
                onChange={e => handleUpload(e)}
              />
              {!companyLogo.fileLink ? (
                <UploadImage type="button" onClick={handleClickToUpload}>
                  Adicionar Imagem
                </UploadImage>
              ) : null}
              {companyLogo.fileLink ? (
                <CompanyImage>
                  <img src={companyLogo.fileLink} alt="Company Logo" />
                  <RemoveButton type="button">
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
    </>
  );
}

export default connect()(MyCompany);
