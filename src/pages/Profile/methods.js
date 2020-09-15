import { toast } from 'react-toastify';
import api from '../../services/api';

async function handleUpload(e, setProfileLogo, setAttachmentId) {
  const $el = document.getElementById('uploadElementButton');
  const files = e.target.files[0];
  const result = await api.post('/api/v1/tools/get-signed-url', {
    fileName: files.name,
    fileSize: files.size,
  });
  fetch(result.data.doc.url, { method: 'PUT', body: files })
    .then(() => {
      setProfileLogo(result.data.doc);
      setAttachmentId(result.data.doc.attachmentId);
      $el.value = '';
    })
    .catch(() => {
      toast.error('Falha ao anexar arquivo. Tente novamente.');
      $el.value = '';
    });
}

async function handleSubmit(
  data,
  formRef,
  profile,
  attachmentId,
  dispatch,
  setProfile,
  profileLogo,
  retrieveAttachments
) {
  try {
    formRef.current.setErrors({});

    if (attachmentId) data.logo = attachmentId;

    const userData = await api.put(`/api/v1/update-account/${profile._id}`, {
      ...data,
    });

    const profileInfo = {
      user: userData.data.data.result,
      imageLink: profileLogo.fileLink,
    };

    if (attachmentId) retrieveAttachments();

    if (data.oldPassword) formRef.current.setFieldValue('oldPassword', '');
    if (data.newPassword) formRef.current.setFieldValue('newPassword', '');

    dispatch(setProfile(profileInfo));
    toast.success('Perfil Atualizado.');
  } catch (error) {
    toast.error(error.response.data.data.message);
  }
}

export { handleUpload, handleSubmit };
