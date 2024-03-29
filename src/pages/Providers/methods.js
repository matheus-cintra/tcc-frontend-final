import moment from 'moment';
import { mdiFactory, mdiAccount } from '@mdi/js';
import api from '../../services/api';

async function getRegisters(limit = undefined, skip = undefined) {
  let uri;

  if (limit && skip) {
    uri = `/api/v1/providers?limit=${limit}&skip=${skip}`;
  } else if (limit && !skip) {
    uri = `/api/v1/providers?limit=${limit}`;
  } else if (!limit && skip) {
    uri = `/api/v1/providers?skip=${skip}`;
  } else {
    uri = `/api/v1/providers`;
  }

  const result = await api.get(uri);

  let docs = result.data.success ? result.data.data.providers : [];
  const docCount = result.data.success ? result.data.data.qty : 0;

  docs = docs.map(provider => {
    return {
      ...provider,
      registerSince: moment(provider.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: provider.cnpj ? mdiFactory : mdiAccount,
      subtitle: provider.cnpj ? 'Jurídica' : 'Física',
    };
  });

  return { docs, docCount };
}

async function getRegistersBySearch(search) {
  const result = await api.get(`/api/v1/get-provider-by-search/${search}`);

  let docs = result.data.success ? result.data.providers : [];
  const docCount =
    result.data.success && result.data.qty > 0 ? result.data.qty : 0;

  docs = docs.map(provider => {
    return {
      ...provider,
      registerSince: moment(provider.createdAt, 'YYYY-MM-DD').format(
        'DD/MM/YYYY'
      ),
      icon: provider.cnpj ? mdiFactory : mdiAccount,
      subtitle: provider.cnpj ? 'Jurídica' : 'Física',
    };
  });

  return { docs, docCount };
}

export default {
  getRegisters,
  getRegistersBySearch,
};
