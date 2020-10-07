import { toast } from 'react-toastify';
import * as Yup from 'yup';
import api from '../../services/api';
import helper from '../../helpers/helper';

function handleInitialFlotaingLabels(formRef) {
  setTimeout(() => {
    const eventFocus = new Event('focus');
    const eventBlur = new Event('blur');
    const _info = formRef.current.getData();

    const companyNameEl = document.getElementById('companyName');
    companyNameEl.dispatchEvent(eventFocus);

    const cnpjEl = document.getElementById('cnpj');
    cnpjEl.dispatchEvent(eventFocus);

    const fantasyNameEl = document.getElementById('fantasyName');
    fantasyNameEl.dispatchEvent(eventFocus);

    if (_info.email && _info.email !== '') {
      const emailEl = document.getElementById('email');
      emailEl.dispatchEvent(eventFocus);
    } else {
      const emailEl = document.getElementById('email');
      emailEl.dispatchEvent(eventBlur);
    }

    if (_info.phone && _info.phone !== '') {
      const phoneEl = document.getElementById('phone');
      phoneEl.dispatchEvent(eventFocus);
    } else {
      const phoneEl = document.getElementById('phone');
      phoneEl.dispatchEvent(eventBlur);
    }

    if (_info.address && _info.address.cep !== '') {
      const cepEl = document.getElementById('cep');
      cepEl.dispatchEvent(eventFocus);
    } else {
      const cepEl = document.getElementById('cep');
      cepEl.dispatchEvent(eventBlur);
    }

    if (_info.address && _info.address.address !== '') {
      const addressEl = document.getElementById('address');
      addressEl.dispatchEvent(eventFocus);
    } else {
      const addressEl = document.getElementById('address');
      addressEl.dispatchEvent(eventBlur);
    }

    if (_info.address && _info.address.neighborhood !== '') {
      const neighborhoodEl = document.getElementById('neighborhood');
      neighborhoodEl.dispatchEvent(eventFocus);
    } else {
      const neighborhoodEl = document.getElementById('neighborhood');
      neighborhoodEl.dispatchEvent(eventBlur);
    }

    if (_info.address && _info.address.number !== '') {
      const numberEl = document.getElementById('number');
      numberEl.dispatchEvent(eventFocus);
    } else {
      const numberEl = document.getElementById('number');
      numberEl.dispatchEvent(eventBlur);
    }

    if (_info.address && _info.address.additional !== '') {
      const additionalEl = document.getElementById('additional');
      additionalEl.dispatchEvent(eventFocus);
    } else {
      const additionalEl = document.getElementById('additional');
      additionalEl.dispatchEvent(eventBlur);
    }
    if (_info.address && _info.address.city !== '') {
      const cityEl = document.getElementById('city');
      cityEl.dispatchEvent(eventFocus);
    } else {
      const cityEl = document.getElementById('city');
      cityEl.dispatchEvent(eventBlur);
    }
    if (_info.address && _info.address.state !== '') {
      const stateEl = document.getElementById('state');
      stateEl.dispatchEvent(eventFocus);
    } else {
      const stateEl = document.getElementById('state');
      stateEl.dispatchEvent(eventBlur);
    }
  }, 50);
}

async function getCompanyInfo() {
  const storage = JSON.parse(localStorage.getItem('persist:sismei'));
  const user = JSON.parse(storage.user);

  const result = await api.get(`api/v1/company/${user.profile._id}`);
  let companyImage;

  if (result.data.data.company.logo) {
    companyImage = await api.get(
      `api/v1/attachments/${result.data.data.company.logo}`
    );
  }

  result.data.data.company._cnpj = result.data.data.company.cnpj.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    '$1.$2.$3/$4-$5'
  );

  const { phone } = result.data.data.company;
  if (phone) {
    const phone1 = phone.slice(0, 2);
    const phone2 = phone.length === 11 ? phone.slice(2, 7) : phone.slice(2, 6);
    const phone3 =
      phone.length === 11 ? phone.slice(7, 11) : phone.slice(6, 10);
    result.data.data.company._phone = `(${phone1}) ${phone2}-${phone3}`;
  }

  // const cep = result.data.data.company && result.data.data.company.address;
  // if (cep) {
  //   const cep1 = cep.cep.toString().slice(0, 5);
  //   const cep2 = cep.cep.toString().slice(5, 8);
  //   result.data.data.company.address.cep = `${cep1}-${cep2}`;
  // }

  return {
    company: result.data.data.company,
    companyImage:
      (companyImage && companyImage.data && companyImage.data.data) || {},
  };
}

async function handleUpload(e, setCompanyLogo, setAttachmentId) {
  const $el = document.getElementById('uploadElementButton');
  const files = e.target.files[0];
  const result = await api.post('/api/v1/tools/get-signed-url', {
    fileName: files.name,
    fileSize: files.size,
  });
  fetch(result.data.doc.url, { method: 'PUT', body: files })
    .then(() => {
      setCompanyLogo(result.data.doc);
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
  validateCompany,
  companyInfo,
  attachmentId,
  dispatch,
  setCompany,
  companyLogo,
  setCompanyInfo
) {
  try {
    formRef.current.setErrors({});

    data.phone = helper.returnOnlyNumbers(data.phone);
    data.cnpj = helper.returnOnlyNumbers(data.cnpj);

    await validateCompany(data);

    data.address = {
      ...companyInfo.address,
      additional: data.address.additional || undefined,
      number: data.address.number || undefined,
    };

    if (attachmentId) data.logo = attachmentId;

    await api.put(`/api/v1/company/${companyInfo._id}`, {
      ...data,
    });

    data._cnpj = data.cnpj.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      '$1.$2.$3/$4-$5'
    );

    if (data.phone) {
      const phone1 = data.phone.slice(0, 2);
      const phone2 =
        data.phone.length === 11
          ? data.phone.slice(2, 7)
          : data.phone.slice(2, 6);
      const phone3 =
        data.phone.length === 11
          ? data.phone.slice(7, 11)
          : data.phone.slice(6, 10);
      data._phone = `(${phone1}) ${phone2}-${phone3}`;

      // formRef.current.setFieldValue('phone', data._phone);
    }

    dispatch(setCompany(data.fantasyName, companyLogo.fileLink));

    setCompanyInfo(data);

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

async function handleCepSearch(
  formRef,
  setSearching,
  setCompanyInfo,
  companyInfo
) {
  const data = formRef.current.getData();
  if (!data.address.cep) return;
  setSearching(true);
  try {
    const result = await api.post(`/api/v1/getAddress/${data.address.cep}`);
    if (result.data.sucess) {
      setCompanyInfo({
        ...companyInfo,
        address: result.data.data,
        cnpj: data.cnpj,
        companyInfo: data.companyInfo,
        email: data.email,
        fantasyName: data.fantasyName,
        phone: data.phone,
      });

      handleInitialFlotaingLabels(formRef);
      setSearching(false);
    }
  } catch (err) {
    setSearching(false);
    return toast.error(err.response.data.data.message);
  }
}

export {
  getCompanyInfo,
  handleUpload,
  handleSubmit,
  handleCepSearch,
  handleInitialFlotaingLabels,
};
