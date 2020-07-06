import api from '../../services/api';

async function getCompanyInfo() {
  const storage = JSON.parse(localStorage.getItem('persist:sismei'));
  const user = JSON.parse(storage.user);

  const result = await api.get(`api/v1/company/${user.profile._id}`);

  result.data.data.company._cnpj = result.data.data.company.cnpj.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
    '$1.$2.$3/$4-$5'
  );

  return result.data.data.company;
}

export { getCompanyInfo };
