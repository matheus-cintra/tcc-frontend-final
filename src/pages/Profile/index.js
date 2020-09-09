import React, { useEffect, useState, useRef } from 'react';
import Icon from '@mdi/react';
import { connect, useDispatch } from 'react-redux';
import { mdiDelete, mdiDatabase, mdiMapMarker } from '@mdi/js';
import { toast } from 'react-toastify';
import DefaultInput from '../../components/DefaultInput/Input';
import api from '../../services/api';
import {
  Container,
  ProfileContainer,
  ProfileImage,
  UploadImage,
  Row,
  ProfileInfoContainer,
  DBSize,
  QtyAttachedValue,
  SizeAttached,
  LastLoginPosition,
  LastLoginLat,
  LastLoginLong,
  LastLoginCity,
  LastLoginISP,
  Image,
  RemoveButton,
  FormContainer,
  DBUsageTitle,
  LastLoginTitle,
  QtyTitle,
  TitleContainer,
  ContentContainer,
  LatTitle,
  LongTitle,
  CityTytle,
  StateTitle,
  SubmitButton,
} from './styles';

import { handleUpload, handleSubmit } from './methods';
import { setProfile } from '../../store/modules/user/actions';
import { store } from '../../store';

function Profile() {
  const formRef = useRef(null);
  const [attachments, setAttachments] = useState({});
  const [profileLogo, setProfileLogo] = useState({});
  const [attachmentId, setAttachmentId] = useState(undefined);

  const dispatch = useDispatch();

  const storedInfo = store.getState();
  const accountInfo = storedInfo.user.profile;

  async function retrieveAttachments() {
    try {
      const result = await api.get('/api/v1/get-attachments-count');
      setAttachments(result.data.attachments);
    } catch (error) {
      return toast.error('Falha ao buscar sua imagem');
      // todo setar imagem padrão
    }
  }

  async function getProfileImage() {
    try {
      const result = await api.get(`/api/v1/attachments/${accountInfo.logo}`);
      if (result.data.success) {
        setProfileLogo(result.data.data);
      }
    } catch (error) {
      return toast.error('Falha ao buscar sua imagem');
    }
  }

  const handleSubmitMethod = data =>
    handleSubmit(
      data,
      formRef,
      accountInfo,
      attachmentId,
      dispatch,
      setProfile,
      profileLogo
    );

  useEffect(() => {
    setProfile(accountInfo);
    retrieveAttachments();
    getProfileImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountInfo]);

  const handleUploadMethod = e =>
    handleUpload(e, setProfileLogo, setAttachmentId);

  const handleClickToUpload = () => {
    const $el = document.getElementById('uploadElementButton');
    $el.click();
  };

  const handleOpenAskDialog = () => console.warn('ask Dialog');

  return (
    <Container>
      <ProfileContainer>
        <ProfileImage>
          <input
            id="uploadElementButton"
            hidden
            type="file"
            onChange={e => handleUploadMethod(e)}
          />
          {!profileLogo.fileLink ? (
            <UploadImage type="button" onClick={handleClickToUpload}>
              Adicionar Imagem
            </UploadImage>
          ) : (
            <Image>
              <img src={profileLogo.fileLink} alt="Profile Logo" />
              <RemoveButton type="button" onClick={handleOpenAskDialog}>
                <Icon
                  path={mdiDelete}
                  title="Buscar Cep"
                  size="20px"
                  color="#333"
                />
              </RemoveButton>
            </Image>
          )}
        </ProfileImage>
        <FormContainer ref={formRef} onSubmit={handleSubmitMethod}>
          <Row>
            <DefaultInput
              name="name"
              type="text"
              placeholder="Nome de Exibição"
              defaultValue={accountInfo.name}
            />
          </Row>
          <Row>
            <DefaultInput
              name="email"
              type="email"
              placeholder="E-mail do Usuário"
              defaultValue={accountInfo.email}
              disabled
            />
          </Row>
          <Row>
            <DefaultInput
              name="oldPassord"
              type="password"
              placeholder="Senha Atual"
            />
          </Row>
          <Row>
            <DefaultInput
              name="newPassword"
              type="password"
              placeholder="Nova Senha"
            />
          </Row>
          <Row>
            <p />
            <SubmitButton>Salvar</SubmitButton>
          </Row>
        </FormContainer>
      </ProfileContainer>
      <ProfileInfoContainer>
        <DBSize>
          <TitleContainer>
            <DBUsageTitle>Uso de Armazenamento</DBUsageTitle>
          </TitleContainer>
          <ContentContainer>
            <Icon path={mdiDatabase} size="100px" color="#fff" />
            <QtyTitle>Nº de Anexos</QtyTitle>
            <QtyAttachedValue>{attachments.count}</QtyAttachedValue>
            <QtyTitle>Espaço Utilizado</QtyTitle>
            <SizeAttached>{attachments.totalSize}</SizeAttached>
          </ContentContainer>
        </DBSize>
        <LastLoginPosition>
          <TitleContainer>
            <LastLoginTitle>Última Informação de Login</LastLoginTitle>
          </TitleContainer>
          <ContentContainer>
            <Icon path={mdiMapMarker} size="100px" color="#fff" />
            <LatTitle>Latitude</LatTitle>
            <LastLoginLat>{accountInfo._metadata.ipInfo.lat}</LastLoginLat>
            <LongTitle>Longitude</LongTitle>
            <LastLoginLong>{accountInfo._metadata.ipInfo.lon}</LastLoginLong>
            <CityTytle>Cidade</CityTytle>
            <LastLoginCity>{accountInfo._metadata.ipInfo.city}</LastLoginCity>
            <StateTitle>Estado</StateTitle>
            <LastLoginISP>{accountInfo._metadata.ipInfo.isp}</LastLoginISP>
          </ContentContainer>
        </LastLoginPosition>
      </ProfileInfoContainer>
    </Container>
  );
}

export default connect()(Profile);
