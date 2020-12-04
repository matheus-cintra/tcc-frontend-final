import React, { useEffect, useState, useRef } from 'react';
import Icon from '@mdi/react';
import { connect, useDispatch } from 'react-redux';
import { mdiDelete, mdiDatabase, mdiMapMarker } from '@mdi/js';
import { toast } from 'react-toastify';
import DefaultInput from '../../components/DefaultInput/Input';
import { logoutUser } from '../../store/modules/auth/actions';
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
  LoadingScreen,
  DeleteAccount,
} from './styles';

import Modal from '../../components/Modals';
import Asks from './Dialogs/Asks';
import AsksDeleteAccount from './Dialogs/AsksDeleteAccount';

import { handleUpload, handleSubmit } from './methods';
import { setProfile } from '../../store/modules/user/actions';
import { store } from '../../store';

function Profile() {
  const formRef = useRef(null);
  const [attachments, setAttachments] = useState({});
  const [profileLogo, setProfileLogo] = useState({});
  const [attachmentId, setAttachmentId] = useState(undefined);
  const [searchingAttachments, setSearchingAttachments] = useState(false);
  const [searchingProfileImage, setSearchingProfileImage] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [askDeleteAccountOpen, setAskDeleteAccountOpen] = useState(false);
  const [, setOpen] = useState(false);

  const dispatch = useDispatch();

  const storedInfo = store.getState();
  const accountInfo = storedInfo.user.profile;

  async function retrieveAttachments() {
    try {
      setSearchingAttachments(true);
      const result = await api.get('/api/v1/get-attachments-count');
      setAttachments(result.data.attachments);
      setSearchingAttachments(false);
    } catch (error) {
      setSearchingAttachments(false);
      const attachmentsFallback = {
        count: 0,
        totalSize: '0Kb',
      };
      setAttachments(attachmentsFallback);
      return toast.error('Falha ao buscar sua imagem');
      // todo setar imagem padrão
    }
  }

  async function getProfileImage() {
    try {
      setSearchingProfileImage(true);
      if (accountInfo.logo) {
        const result = await api.get(`/api/v1/attachments/${accountInfo.logo}`);
        if (result.data.success) {
          setProfileLogo(result.data.data);
          setSearchingProfileImage(false);
        }
      } else {
        return setSearchingProfileImage(false);
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
      profileLogo,
      retrieveAttachments
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

  const handleOpenAskDialog = () => setAskOpen(asking => !asking);

  const handleOpenDeleteAccountDialog = () =>
    setAskDeleteAccountOpen(asking => !asking);

  function handleCloseReturn(userUpdate) {
    const profileInfo = { user: userUpdate.data.data.result };
    dispatch(setProfile(profileInfo));
    setProfileLogo({});
    // dispatch(setProfile(profile));
    // setCompanyLogo({});
  }

  const handleAskDialog = () => {
    return (
      <Asks
        setAskOpen={handleOpenAskDialog}
        attachmentId={
          profileLogo && profileLogo._id ? profileLogo._id : attachmentId
        }
        accountId={accountInfo._id}
        closeReturn={handleCloseReturn}
      />
    );
  };

  function closeUpdate() {
    dispatch(logoutUser());
    window.location.reload();
  }

  const handleAskDeleteAccountDialog = () => {
    return (
      <AsksDeleteAccount
        setAskOpen={handleOpenDeleteAccountDialog}
        accountId={accountInfo._id}
        closeUpdate={closeUpdate}
      />
    );
  };

  return (
    <>
      <Container>
        <ProfileContainer>
          <ProfileImage>
            <input
              id="uploadElementButton"
              hidden
              type="file"
              onChange={e => handleUploadMethod(e)}
            />
            {searchingProfileImage ? (
              <LoadingScreen padding="8" totalPadding="80" />
            ) : !profileLogo.fileLink ? (
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
                name="oldPassword"
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
              <DeleteAccount
                type="button"
                onClick={handleOpenDeleteAccountDialog}
              >
                Encerrar Conta
              </DeleteAccount>
            </Row>
          </FormContainer>
        </ProfileContainer>
        <ProfileInfoContainer>
          <DBSize>
            <TitleContainer>
              <DBUsageTitle>Uso de Armazenamento</DBUsageTitle>
            </TitleContainer>
            <ContentContainer>
              {searchingAttachments ? (
                <LoadingScreen padding="8" totalPadding="80" />
              ) : (
                <>
                  <Icon path={mdiDatabase} size="100px" color="#fff" />
                  <QtyTitle>Nº de Anexos</QtyTitle>
                  <QtyAttachedValue>{attachments.count}</QtyAttachedValue>
                  <QtyTitle>Espaço Utilizado</QtyTitle>
                  <SizeAttached>{attachments.totalSize}</SizeAttached>
                </>
              )}
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
              <StateTitle>ISP</StateTitle>
              <LastLoginISP>{accountInfo._metadata.ipInfo.isp}</LastLoginISP>
            </ContentContainer>
          </LastLoginPosition>
        </ProfileInfoContainer>
      </Container>

      <Modal open={askOpen} setOpen={setOpen}>
        <div>{handleAskDialog()}</div>
      </Modal>
      <Modal open={askDeleteAccountOpen} setOpen={setOpen}>
        <div>{handleAskDeleteAccountDialog()}</div>
      </Modal>
    </>
  );
}

export default connect()(Profile);
