import api from '../../services/api';

async function getCompanyInfo() {
  const storage = JSON.parse(localStorage.getItem('persist:sismei'));
  const user = JSON.parse(storage.user);

  const result = await api.get(`api/v1/company/${user.profile._id}`);

  return result.data.data.company;
}

export { getCompanyInfo };
