import api from '../../services/api';

async function getCompanyInfo() {
  const storage = JSON.parse(localStorage.getItem('persist:sismei'));
  const user = JSON.parse(storage.user);

  const result = await api.get(`api/v1/company/${user.profile._id}`);
  let companyImage;
  if (result.data.data.company.documents.length > 0) {
    companyImage = await api.get(
      `api/v1/attachments/${result.data.data.company.documents[0]}`
    );
  }
  console.warn('companyImage > ', companyImage);
  result.data.data.company._cnpj = result.data.data.company.cnpj.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    '$1.$2.$3/$4-$5'
  );

  const { phone } = result.data.data.company;
  if (phone) {
    const phone1 = phone.slice(0, 2);
    const phone2 = phone.slice(2, 7);
    const phone3 = phone.slice(7, 11);
    result.data.data.company._phone = `(${phone1}) ${phone2}-${phone3}`;
  }

  return {
    company: result.data.data.company,
    companyImage:
      (companyImage && companyImage.data && companyImage.data.data) || {},
  };
}

export { getCompanyInfo };
